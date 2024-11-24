import { Anthropic } from '@anthropic-ai/sdk';
import { env } from '$env/dynamic/private';
import { SYSTEM_PROMPT } from '$lib/constants';
import type { RequestHandler } from './$types';

const anthropic = new Anthropic({
  apiKey: env.ANTHROPIC_API_KEY
});

export const POST = (async ({ request }) => {
  const { messages, images } = await request.json();

  const stream = await anthropic.messages.create({
    max_tokens: 8192,
    system: SYSTEM_PROMPT,
    messages: [
    
      ...messages.map(msg => ({
        role: msg.role,
        content: msg.content.includes('<image>') ? 
          [
            ...msg.content.split('<image>')[0].trim() ? [{ type: 'text', text: msg.content.split('<image>')[0].trim() }] : [],
            { 
              type: 'image', 
              source: { 
                type: 'base64', 
                media_type: images[0].mediaType,
                data: images[0].data.split(',')[1]
              } 
            },
            ...msg.content.split('<image>')[1].trim() ? [{ type: 'text', text: msg.content.split('<image>')[1].trim() }] : []
          ] : 
          msg.content
      }))
    ],
    model: 'claude-3-5-sonnet-20241022',
    stream: true
  });

  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          if (chunk.type === 'content_block_delta') {
            controller.enqueue(JSON.stringify({ text: chunk.delta.text }) + '\n');
          }
        }
        controller.close();
      } catch (error) {
        controller.error(error);
      }
    }
  });

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/event-stream'
    }
  });
}) satisfies RequestHandler;