<script lang="ts">
  import { Plus, Filter, MoreVertical, Search, CircleDot, CircleEllipsis, CheckCircle2 } from 'lucide-svelte';
  import * as Sheet from "$lib/components/ui/sheet";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Separator } from "$lib/components/ui/separator";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import { ScrollArea } from "$lib/components/ui/scroll-area";

  let sidebarOpen = true;

  const columns = [
    { id: 'todo', title: 'Todo', count: 6, icon: CircleDot },
    { id: 'in-progress', title: 'In Progress', count: 2, icon: CircleEllipsis },
    { id: 'in-review', title: 'In Review', count: 1, icon: CircleEllipsis },
    { id: 'done', title: 'Done', count: 3, icon: CheckCircle2 }
  ];

  const cards = [
    {
      id: 'KRI-19',
      title: 'Article scraper',
      team: 'Indiana',
      column: 'todo'
    },
    {
      id: 'KRI-20',
      title: 'API Integration',
      team: 'Platform',
      column: 'todo'
    },
    {
      id: 'KRI-21',
      title: 'User Authentication',
      team: 'Security',
      column: 'todo'
    },
    {
      id: 'KRI-22',
      title: 'Dashboard Analytics',
      team: 'Analytics',
      column: 'todo'
    },
    {
      id: 'KRI-23',
      title: 'Mobile Responsiveness',
      team: 'Frontend',
      column: 'todo'
    },
    {
      id: 'KRI-24',
      title: 'Database Optimization',
      team: 'Backend',
      column: 'todo'
    },
    {
      id: 'KRI-25',
      title: 'Payment Integration',
      team: 'Platform',
      column: 'in-progress'
    },
    {
      id: 'KRI-26',
      title: 'Search Functionality',
      team: 'Frontend',
      column: 'in-progress'
    },
    {
      id: 'KRI-27',
      title: 'Email Service',
      team: 'Backend',
      column: 'in-review'
    },
    {
      id: 'KRI-28',
      title: 'User Onboarding',
      team: 'Product',
      column: 'done'
    },
    {
      id: 'KRI-29',
      title: 'Performance Testing',
      team: 'QA',
      column: 'done'
    },
    {
      id: 'KRI-30',
      title: 'Security Audit',
      team: 'Security',
      column: 'done'
    }
  ];
</script>

<div class="h-screen flex flex-col bg-background text-foreground">
  <!-- Header -->
  <header class="border-b px-4 h-14 flex items-center justify-between">
    <div class="flex items-center gap-2">
      <Button variant="ghost" size="icon">
        <Search class="h-4 w-4" />
      </Button>
      <span class="text-sm">linear.app</span>
    </div>
    <div class="flex items-center gap-2">
      <!-- Add header actions -->
    </div>
  </header>

  <div class="flex flex-1 overflow-hidden">
    <!-- Sidebar -->
    <aside class={`w-60 border-r flex flex-col ${sidebarOpen ? '' : 'hidden'}`}>
      <ScrollArea class="flex-1">
        <div class="p-2 space-y-4">
          <!-- Sidebar content -->
          <div class="space-y-1">
            <Button variant="ghost" class="w-full justify-start">
              <CircleDot class="mr-2 h-4 w-4" />
              Inbox
            </Button>
            <!-- Add more sidebar items -->
          </div>
        </div>
      </ScrollArea>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 overflow-hidden">
      <!-- Board Header -->
      <div class="p-4 border-b flex items-center justify-between">
        <div class="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter class="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <!-- Board -->
      <ScrollArea class="h-[calc(100vh-8.5rem)]">
        <div class="p-4 flex gap-4">
          {#each columns as column}
            <div class="w-80 shrink-0">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-2">
                  <svelte:component this={column.icon} class="h-4 w-4" />
                  <span class="font-medium">{column.title}</span>
                  <span class="text-muted-foreground text-sm">{column.count}</span>
                </div>
                <div class="flex items-center gap-1">
                  <Button variant="ghost" size="icon" class="h-6 w-6">
                    <Plus class="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" class="h-6 w-6">
                    <MoreVertical class="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <!-- Cards -->
              <div class="space-y-2">
                {#each cards.filter(card => card.column === column.id) as card}
                  <div class="bg-card p-3 rounded-lg border shadow-sm">
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-xs text-muted-foreground">{card.id}</span>
                    </div>
                    <h3 class="text-sm font-medium">{card.title}</h3>
                    <div class="mt-2 flex items-center gap-2">
                      <span class="text-xs bg-secondary px-2 py-1 rounded">
                        {card.team}
                      </span>
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          {/each}
        </div>
      </ScrollArea>
    </main>
  </div>
</div>

<style>
  :global(body) {
    @apply bg-background text-foreground;
  }
</style>