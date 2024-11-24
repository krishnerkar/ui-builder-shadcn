<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";
  import PlusIcon from "lucide-svelte/icons/plus";
  import MinusIcon from "lucide-svelte/icons/minus";
  import RotateCcwIcon from "lucide-svelte/icons/rotate-ccw";

  let count = 0;

  function increment() {
    count += 1;
  }

  function decrement() {
    count -= 1;
  }

  function reset() {
    count = 0;
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-background p-4">
  <Card.Root class="w-full max-w-sm">
    <Card.Header>
      <Card.Title class="text-center">Counter App</Card.Title>
      <Card.Description class="text-center">
        Click the buttons to change the count
      </Card.Description>
    </Card.Header>
    
    <Card.Content>
      <div class="flex flex-col items-center gap-8">
        <!-- Count Display -->
        <div class="text-6xl font-bold tabular-nums">
          {count}
        </div>

        <!-- Control Buttons -->
        <div class="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            on:click={decrement}
            aria-label="Decrease count"
          >
            <MinusIcon class="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            on:click={reset}
            aria-label="Reset count"
          >
            <RotateCcwIcon class="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            on:click={increment}
            aria-label="Increase count"
          >
            <PlusIcon class="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card.Content>

    <Card.Footer class="flex justify-center">
      <p class="text-sm text-muted-foreground">
        Current value: {count}
      </p>
    </Card.Footer>
  </Card.Root>
</div>