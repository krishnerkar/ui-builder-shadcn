import { Anthropic } from '@anthropic-ai/sdk';
import { env } from '$env/dynamic/private';
import { GENERATE_MOCK_DATA_PROMPT } from '$lib/constants';

const anthropic = new Anthropic({
  apiKey: env.ANTHROPIC_API_KEY
});

export const POST = (async ({ request }) => {
  const { code } = await request.json();
  
  const stream = await anthropic.messages.create({
    max_tokens: 8192,
    system: GENERATE_MOCK_DATA_PROMPT,
    messages: [
      { role: 'user', content: code }
    ],
    model: 'claude-3-5-sonnet-20241022',
    stream: true
  });

  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          if (chunk.type === 'content_block_delta') {
            // @ts-expect-error - TODO: fix this
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
}); 