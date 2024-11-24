 <script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { Textarea } from "$lib/components/ui/textarea";
	import { MoveUp, Loader2 } from "lucide-svelte";
	import { marked } from 'marked';
	import Thinking from "$lib/components/thinking/thinking.svelte";
	import { writable } from 'svelte/store';
  
	const messages = writable<Array<{ role: string; content: string }>>([]);
	const isLoading = writable(false);
	const input = writable('');
	const images = writable<Array<{ data: string; mediaType: string }>>([]);
  const refinedCode = writable<string>('');
  const isRefining = writable(false);
  const showInput = writable(true);
  
	marked.setOptions({
		breaks: true,
		gfm: true,
	});

	function parseThinkingContent(content: string) {
		const thinkingRegex = /<antThinking>([\s\S]*?)<\/antThinking>/g;
		const codeBlockRegex = /```svelte[\s\S]*?```/g;
		const thinkingBlocks: { id: string; content: string }[] = [];
		const codeBlocks: string[] = [];
		
		const codeMatches = content.match(codeBlockRegex);
		if (codeMatches) {
			codeBlocks.push(...codeMatches.map(block => 
				block.replace(/```svelte\n?/, '').replace(/```$/, '').trim()
			));
		}
		
		const parsedContent = content.replace(thinkingRegex, (_match, thinkingContent, offset) => {
			const id = `thinking-${offset}`;
			thinkingBlocks.push({ id, content: thinkingContent.trim() });
			return `{{THINKING:${id}}}`;
		});
		
		return { parsedContent, thinkingBlocks, codeBlocks };
	}

	async function openRenderedCode(code: string) {
		const codeToSend = $refinedCode || code;
		const response = await fetch('/api/compile', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ code: codeToSend })
		});
		
		const result = await response.json();
		if (result.success) {
			window.open(result.url, '_blank');
		}
	}

	async function handleImagePaste(event: ClipboardEvent) {
		const items = event.clipboardData?.items;
		if (!items) return;

		for (const item of items) {
			if (item.type.indexOf('image') === 0) {
				const file = item.getAsFile();
				if (!file) continue;

				const reader = new FileReader();
				reader.onload = (e) => {
					const dataUrl = e.target?.result as string;
					images.update(imgs => [...imgs, {
						data: dataUrl,
						mediaType: file.type
					}]);
				};
				reader.readAsDataURL(file);
			}
		}
	}

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		isLoading.set(true);
		showInput.set(false);
		
		const currentInput = $input;
		const currentImages = $images;
		
		input.set('');
		images.set([]);

		messages.update(msgs => [...msgs, { 
			role: 'user', 
			content: currentInput + (currentImages.length ? ' <image>' : '') 
		}]);

		try {
			const response = await fetch('/api/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ 
					messages: $messages,
					images: currentImages
				})
			});

			const reader = response.body?.getReader();
			const decoder = new TextDecoder();
			let assistantMessage = '';

			if (reader) {
				while (true) {
					const { done, value } = await reader.read();
					if (done) break;

					const chunk = decoder.decode(value);
					const lines = chunk.split('\n');

					for (const line of lines) {
						if (line.trim() === '') continue;
						try {
							const data = JSON.parse(line);
							assistantMessage += data.text;
							messages.update(msgs => {
								const newMsgs = [...msgs];
								if (newMsgs[newMsgs.length - 1]?.role === 'assistant') {
									newMsgs[newMsgs.length - 1].content = assistantMessage;
								} else {
									newMsgs.push({ role: 'assistant', content: assistantMessage });
								}
								return newMsgs;
							});
						} catch (e) {
							console.error('Error parsing chunk:', e);
						}
					}
				}
			}
		} catch (error) {
			console.error('Error:', error);
		} finally {
			isLoading.set(false);
		}
	}

	async function refineCode(code: string) {
		isRefining.set(true);
		refinedCode.set('');
		
		try {
			const response = await fetch('/api/refine', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ code })
			});

			if (!response.ok) {
				throw new Error('Failed to refine code');
			}

			const reader = response.body?.getReader();
			const decoder = new TextDecoder();
			let accumulatedCode = '';

			if (reader) {
				while (true) {
					const { done, value } = await reader.read();
					if (done) break;

					const chunk = decoder.decode(value);
					const lines = chunk.split('\n');

					for (const line of lines) {
						if (line.trim() === '') continue;
						try {
							const data = JSON.parse(line);
							accumulatedCode += data.text;
							refinedCode.set(accumulatedCode);
						} catch (e) {
							console.error('Error parsing chunk:', e);
						}
					}
				}
			}
		} catch (error) {
			console.error('Error refining code:', error);
		} finally {
			isRefining.set(false);
		}
	}
</script>

<div class="flex h-screen">
	<div class="w-1/2 p-4 overflow-y-auto">
		{#if $showInput}
			<form on:submit={handleSubmit} class="w-full">
				<div class="w-full flex flex-col">
					<div class="w-full relative">
						<Textarea
							bind:value={$input}
							rows={4}
							placeholder="Enter your prompt... (Paste images with Ctrl+V)"
							class="w-full rounded-xl shadow-none border border-gray-400 resize-none p-2.5 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
							disabled={$isLoading}
							on:paste={handleImagePaste}
						/>
						{#if $images.length > 0}
							<div class="absolute bottom-2 left-2 flex gap-2">
								{#each $images as image}
									<div class="relative group">
										<img 
											src={image.data}
											alt="Pasted content" 
											class="w-12 h-12 object-cover rounded border border-gray-400 hover:border-blue-500 transition-all cursor-pointer"
										/>
										
									</div>
								{/each}
							</div>
						{/if}
						<div class="absolute bottom-2 right-2">
							<Button
								type="submit"
								size="icon"
								class="h-8 w-8 rounded-lg"
								disabled={$isLoading}
							>
								{#if $isLoading}
									<Loader2 class="w-5 h-5 animate-spin"/>
								{:else}
									<MoveUp class="w-5 h-5"/>
								{/if}
							</Button>
						</div>
					</div>
				</div>
			</form>
		{/if}

		{#each $messages as message}
			<div class="mb-4">
				<div class="font-medium">{message.role}</div>
				<div class="mt-1 prose prose-sm max-w-none">
					{#if message.content.includes('<antThinking>')}
						{@const { parsedContent, thinkingBlocks } = parseThinkingContent(message.content)}
						{#each parsedContent.split(/(\{\{THINKING:[^}]+\}\})/) as part}
							{#if part.startsWith('{{THINKING:')}
								{@const id = part.slice(11, -2)}
								{@const thinkingContent = thinkingBlocks.find(block => block.id === id)?.content}
								<Thinking id={id} content={thinkingContent || ''} />
							{:else}
								{@html marked(part)}
							{/if}
						{/each}
					{:else}
						{@html marked(message.content)}
					{/if}
				</div>
			</div>
		{/each}
	</div>

	<div class="w-1/2 bg-gray-50 flex flex-col">
		<div class="sticky top-0 p-4 bg-gray-50 border-b flex justify-between items-center">
			<h2 class="text-xl font-bold">Code Generated</h2>
			<div class="flex gap-2">
				{#each $messages as message}
					{#if message.content.includes('```')}
						{@const { codeBlocks } = parseThinkingContent(message.content)}
						{#if codeBlocks.length > 0}
							<Button 
								on:click={() => openRenderedCode(codeBlocks[codeBlocks.length - 1])}
							>
								Open rendered code
							</Button>
							<Button
								variant="outline"
								on:click={() => refineCode(codeBlocks[codeBlocks.length - 1])}
								disabled={$isRefining}
							>
								{#if $isRefining}
									<Loader2 class="w-4 h-4 mr-2 animate-spin"/>
									Refining...
								{:else}
									Refine code
								{/if}
							</Button>
						{/if}
					{/if}
				{/each}
			</div>
		</div>
		
		<div class="p-4 overflow-y-auto">
			{#if $refinedCode}
				<div class="mb-6">
					<pre class="whitespace-pre-wrap bg-gray-100 p-4 rounded-lg">{$refinedCode}</pre>
				</div>
			{:else}
				{#each $messages as message}
					{#if message.content.includes('```')}
						{@const { codeBlocks } = parseThinkingContent(message.content)}
						{#each codeBlocks as codeBlock, i}
							<div class="mb-6">
								<pre class="whitespace-pre-wrap bg-gray-100 p-4 rounded-lg">{codeBlock}</pre>
							</div>
						{/each}
					{/if}
				{/each}
			{/if}
		</div>
	</div>
</div>

<style>
	:global(.prose) {
		color: inherit;
	}
	:global(.prose p) {
		margin: 0.5em 0;
	}
	:global(.prose code) {
		background-color: rgba(0, 0, 0, 0.1);
		padding: 0.2em 0.4em;
		border-radius: 3px;
		font-size: 0.9em;
	}
	:global(.prose pre) {
		background-color: rgba(0, 0, 0, 0.1);
		padding: 1em;
		border-radius: 4px;
		overflow-x: auto;
	}
	:global(.prose a) {
		color: #0066cc;
		text-decoration: underline;
	}
	:global(.prose ul, .prose ol) {
		padding-left: 1.5em;
		margin: 0.5em 0;
	}

	:global(.prose ul) {
		list-style-type: disc;
		margin-left: 1.5em;
	}
	
	:global(.prose ol) {
		list-style-type: decimal;
		margin-left: 1.5em;
	}
	
	:global(.prose ul ul) {
		list-style-type: circle;
		margin-top: 0.5em;
		margin-bottom: 0.5em;
	}
</style>
