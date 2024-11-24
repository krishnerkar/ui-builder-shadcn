<script lang="ts">
  import { page } from "$app/stores";
  import HomeIcon from "lucide-svelte/icons/home";
  import SearchIcon from "lucide-svelte/icons/search";
  import CheckIcon from "lucide-svelte/icons/check";
  import CircleIcon from "lucide-svelte/icons/circle";
  import AlertCircleIcon from "lucide-svelte/icons/alert-circle";
  import CheckCircleIcon from "lucide-svelte/icons/check-circle";
  import MoreVerticalIcon from "lucide-svelte/icons/more-vertical";
  import PlusIcon from "lucide-svelte/icons/plus";
  import UserIcon from "lucide-svelte/icons/user";
  import * as ScrollArea from "$lib/components/ui/scroll-area";
  import * as Separator from "$lib/components/ui/separator";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { cn } from "$lib/utils";

  const tasks = {
    todo: [
      { id: 'KRI-19', title: 'Implement user authentication flow', assignee: 'Sarah Chen' },
      { id: 'KRI-15', title: 'Design system documentation', assignee: 'Mike Wilson' },
      { id: 'KRI-14', title: 'API endpoint optimization', assignee: 'John Smith' },
      { id: 'KRI-13', title: 'Mobile responsive fixes', assignee: 'Emma Davis' },
      { id: 'KRI-12', title: 'Payment integration testing', assignee: 'Alex Turner' },
      { id: 'KRI-11', title: 'Email template redesign', assignee: 'Lisa Wong' }
    ],
    inProgress: [
      { id: 'KRI-21', title: 'Dashboard analytics implementation', assignee: 'David Miller' },
      { id: 'KRI-20', title: 'Performance optimization', assignee: 'Rachel Green' },
      { id: 'KRI-08', title: 'User onboarding flow', assignee: 'Tom Anderson' }
    ],
    inReview: [
      { id: 'KRI-18', title: 'Search functionality upgrade', assignee: 'James Wilson' },
      { id: 'KRI-17', title: 'Error handling implementation', assignee: 'Kate Brown' },
      { id: 'KRI-16', title: 'Security audit fixes', assignee: 'Peter Parker' }
    ],
    done: [
      { id: 'KRI-22', title: 'Database migration script', assignee: 'Chris Evans' },
      { id: 'KRI-10', title: 'CI/CD pipeline setup', assignee: 'Maria Garcia' },
      { id: 'KRI-09', title: 'Landing page redesign', assignee: 'Steve Rogers' },
      { id: 'KRI-07', title: 'Push notification system', assignee: 'Tony Stark' }
    ]
  };
</script>

<div class="flex h-screen bg-background">
  <!-- Rest of the component remains exactly the same -->
  <div class="w-64 border-r bg-background-dark">
    <div class="p-4">
      <div class="flex items-center gap-2 mb-6">
        <div class="h-6 w-6 rounded bg-primary/20 text-primary flex items-center justify-center">
          KR
        </div>
        <span class="font-semibold">Krish</span>
      </div>
      
      <Input 
        placeholder="Search..." 
        class="mb-4"
      />

      <nav class="space-y-1">
        <Button variant="ghost" class="w-full justify-start">
          <HomeIcon class="mr-2 h-4 w-4" />
          Inbox
        </Button>
        <Button variant="ghost" class="w-full justify-start">
          <CircleIcon class="mr-2 h-4 w-4" />
          My Issues
        </Button>
      </nav>

      <Separator.Root class="my-4" />
    </div>
  </div>

  <div class="flex-1">
    <header class="border-b p-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <Button variant="ghost">All Issues</Button>
          <Button variant="ghost">Active</Button>
          <Button variant="ghost">Backlog</Button>
        </div>
        <div class="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <UserIcon class="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>

    <ScrollArea.Root class="h-[calc(100vh-9rem)]">
      <div class="flex gap-4 p-4">
        {#each Object.entries(tasks) as [status, items]}
          <div class="flex-1 min-w-[300px]">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-2">
                {#if status === 'todo'}
                  <CircleIcon class="h-4 w-4" />
                {:else if status === 'inProgress'}
                  <AlertCircleIcon class="h-4 w-4 text-yellow-500" />
                {:else if status === 'inReview'}
                  <CheckIcon class="h-4 w-4 text-blue-500" />
                {:else}
                  <CheckCircleIcon class="h-4 w-4 text-green-500" />
                {/if}
                <h2 class="font-semibold capitalize">
                  {status.replace(/([A-Z])/g, ' $1').trim()} 
                  <span class="text-muted-foreground ml-1">
                    {items.length}
                  </span>
                </h2>
              </div>
              <div class="flex gap-1">
                <Button variant="ghost" size="icon">
                  <MoreVerticalIcon class="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <PlusIcon class="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div class="space-y-2">
              {#each items as task}
                <div class="rounded-lg border bg-card p-3 shadow-sm">
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-muted-foreground">
                      {task.id}
                    </span>
                    <Button variant="ghost" size="icon">
                      <UserIcon class="h-4 w-4" />
                    </Button>
                  </div>
                  <h3 class="font-medium mt-1">{task.title}</h3>
                  <div class="mt-2 flex items-center text-sm text-muted-foreground">
                    {task.assignee}
                  </div>
                </div>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </ScrollArea.Root>
  </div>
</div>