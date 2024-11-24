<script lang="ts">
    import { onMount } from "svelte";
    import { writable } from "svelte/store";
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { Checkbox } from "$lib/components/ui/checkbox";
    import * as Card from "$lib/components/ui/card";
    import TrashIcon from "lucide-svelte/icons/trash-2";
    import { cn } from "$lib/utils";

    // Types
    interface Todo {
        id: string;
        text: string;
        completed: boolean;
    }

    // Store
    const todos = writable<Todo[]>([]);

    // State
    let newTodoText = "";

    // Load todos from localStorage
    onMount(() => {
        const savedTodos = localStorage.getItem("todos");
        if (savedTodos) {
            todos.set(JSON.parse(savedTodos));
        }
    });

    // Save todos to localStorage when updated
    todos.subscribe((value) => {
        if (typeof localStorage !== "undefined") {
            localStorage.setItem("todos", JSON.stringify(value));
        }
    });

    // Add new todo
    function addTodo(e: SubmitEvent) {
        e.preventDefault();
        if (!newTodoText.trim()) return;

        todos.update((currentTodos) => [
            ...currentTodos,
            {
                id: crypto.randomUUID(),
                text: newTodoText.trim(),
                completed: false
            }
        ]);
        newTodoText = "";
    }

    // Toggle todo completion
    function toggleTodo(id: string) {
        todos.update((currentTodos) =>
            currentTodos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    }

    // Delete todo
    function deleteTodo(id: string) {
        todos.update((currentTodos) =>
            currentTodos.filter((todo) => todo.id !== id)
        );
    }
</script>

<div class="container mx-auto max-w-2xl p-4 space-y-8">
    <Card.Root>
        <Card.Header>
            <Card.Title>Todo List</Card.Title>
            <Card.Description>
                Manage your tasks efficiently
            </Card.Description>
        </Card.Header>
        <Card.Content class="space-y-6">
            <!-- Add Todo Form -->
            <form on:submit={addTodo} class="flex gap-2">
                <Input
                    type="text"
                    placeholder="What needs to be done?"
                    bind:value={newTodoText}
                    class="flex-1"
                />
                <Button type="submit">Add Task</Button>
            </form>

            <!-- Todo List -->
            {#if $todos.length === 0}
                <div class="text-center py-8 text-muted-foreground">
                    No todos yet. Add one above!
                </div>
            {:else}
                <div class="space-y-3">
                    {#each $todos as todo (todo.id)}
                        <div class="flex items-center gap-3 group">
                            <Checkbox
                                checked={todo.completed}
                                onCheckedChange={() => toggleTodo(todo.id)}
                                id={todo.id}
                            />
                            <label
                                for={todo.id}
                                class={cn(
                                    "flex-1 cursor-pointer",
                                    todo.completed && "line-through text-muted-foreground"
                                )}
                            >
                                {todo.text}
                            </label>
                            <Button
                                variant="ghost"
                                size="icon"
                                class="opacity-0 group-hover:opacity-100 transition-opacity"
                                on:click={() => deleteTodo(todo.id)}
                            >
                                <TrashIcon class="h-4 w-4" />
                                <span class="sr-only">Delete todo</span>
                            </Button>
                        </div>
                    {/each}
                </div>
            {/if}
        </Card.Content>
    </Card.Root>
</div>