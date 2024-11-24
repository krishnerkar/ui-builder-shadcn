<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";
  
  let count = 0;
</script>

<div class="min-h-screen flex items-center justify-center p-4">
  <Card.Root class="w-[300px]">
    <Card.Header>
      <Card.Title class="text-center">Hello, World!</Card.Title>
      <Card.Description class="text-center">
        The simplest app ever made
      </Card.Description>
    </Card.Header>
    <Card.Content class="flex flex-col items-center gap-4">
      <p class="text-4xl font-bold text-center">{count}</p>
      <Button on:click={() => count += 1}>
        Click me
      </Button>
    </Card.Content>
  </Card.Root>
</div>