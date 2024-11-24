<script lang="ts">
  import * as Card from "$lib/components/ui/card";
  import { Button } from "$lib/components/ui/button";
  import Reset from "lucide-svelte/icons/rotate-ccw";
  import Plus from "lucide-svelte/icons/plus";
  import Minus from "lucide-svelte/icons/minus";

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

<div class="min-h-screen flex items-center justify-center bg-background">
  <Card.Root class="w-[400px]">
    <Card.Content class="pt-6">
      <div class="flex flex-col items-center space-y-4">
        <h1 class="text-2xl font-semibold tracking-tight">Counter App</h1>
        
        <p class="text-muted-foreground text-center">
          Click the buttons to change the count
        </p>

        <div class="text-7xl font-bold my-8">
          {count}
        </div>

        <div class="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon"
            on:click={decrement}
            aria-label="Decrease count"
          >
            <Minus class="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            on:click={reset}
            aria-label="Reset count"
          >
            <Reset class="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            on:click={increment}
            aria-label="Increase count"
          >
            <Plus class="h-4 w-4" />
          </Button>
        </div>

        <p class="text-sm text-muted-foreground">
          Current value: {count}
        </p>
      </div>
    </Card.Content>
  </Card.Root>
</div>