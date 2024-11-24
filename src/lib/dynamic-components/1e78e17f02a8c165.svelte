<script lang="ts">
  import { writable } from 'svelte/store';
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Card } from "$lib/components/ui/card";
  import { Checkbox } from "$lib/components/ui/checkbox";
  import TrashIcon from 'lucide-svelte/icons/trash-2';
  import { Alert } from "$lib/components/ui/alert";

  // Define Todo type
  interface Todo {
    id: number;
    text: string;
    completed: boolean;
  }

  // Create todos store
  const todos = writable<Todo[]>([]);
  let newTodoText = '';

  // Add todo
  function addTodo() {
    if (newTodoText.trim()) {
      todos.update(currentTodos => [
        ...currentTodos,
        {
          id: Date.now(),
          text: newTodoText.trim(),
          completed: false
        }
      ]);
      newTodoText = '';
    }
  }

  // Toggle todo completion
  function toggleTodo(id: number) {
    todos.update(currentTodos =>
      currentTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  // Delete todo
  function deleteTodo(id: number) {
    todos.update(currentTodos =>
      currentTodos.filter(todo => todo.id !== id)
    );
  }

  // Handle form submission
  function handleSubmit(e: Event) {
    e.preventDefault();
    addTodo();
  }
</script>

<div class="container mx-auto max-w-2xl p-4 space-y-6">
  <h1 class="text-3xl font-bold tracking-tight">Todo List</h1>

  <!-- Add Todo Form -->
  <form on:submit={handleSubmit} class="flex gap-2">
    <Input
      type="text"
      placeholder="Add a new todo..."
      bind:value={newTodoText}
      class="flex-1"
    />
    <Button type="submit">Add Todo</Button>
  </form>

  <!-- Todo List -->
  <div class="space-y-3">
    {#if $todos.length === 0}
      <Alert>
        <p class="text-sm text-muted-foreground">
          No todos yet. Add one above to get started!
        </p>
      </Alert>
    {/if}

    {#each $todos as todo (todo.id)}
      <Card class="p-4">
        <div class="flex items-center justify-between gap-4">
          <div class="flex items-center gap-3 flex-1">
            <Checkbox
              checked={todo.completed}
              on:click={() => toggleTodo(todo.id)}
            />
            <span class="flex-1" class:line-through={todo.completed}>
              {todo.text}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            class="text-destructive hover:text-destructive"
            on:click={() => deleteTodo(todo.id)}
          >
            <TrashIcon class="h-4 w-4" />
            <span class="sr-only">Delete todo</span>
          </Button>
        </div>
      </Card>
    {/each}
  </div>
</div>

<style>
  .line-through {
    text-decoration: line-through;
    opacity: 0.7;
  }
</style>