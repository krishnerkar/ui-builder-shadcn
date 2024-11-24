<script lang="ts">
	import * as Collapsible from "$lib/components/ui/collapsible";
	import { ChevronDown } from "lucide-svelte";

	export let id: string;
	export let content: string;
	let open = true;
</script>

<Collapsible.Root open={open} on:open={() => open = true} class="my-2 overflow-hidden rounded-md border">
	<Collapsible.Trigger class="flex w-full items-center justify-between bg-app-background p-2 transition-colors">
		<div class="flex items-center gap-2">
			<span>Thought Process</span>
		</div>
		<ChevronDown class="ui-open:rotate-180 h-4 w-4 transition-transform" />
	</Collapsible.Trigger>
	<Collapsible.Content>
		<div class="bg-app-container p-2">
			{content}
		</div>
	</Collapsible.Content>
</Collapsible.Root>
