<script lang="ts">
  import { ChevronDown, Plus, MoreHorizontal } from "lucide-svelte";
  import * as Card from "$lib/components/ui/card";
  import * as ScrollArea from "$lib/components/ui/scroll-area";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";

  type Task = {
    id: string;
    title: string;
    project: string;
    assignee: string;
    status: 'todo' | 'in-progress' | 'in-review' | 'done'
  };

  const tasks: Task[] = [
    {
      id: "KRI-19",
      title: "Article scraper",
      project: "Indiana",
      assignee: "Indiana",
      status: "todo"
    },
    {
      id: "KRI-21", 
      title: "Youtube transcript + summarizer",
      project: "Indiana",
      assignee: "Indiana",
      status: "in-progress"
    },
    {
      id: "KRI-23",
      title: "API Integration",
      project: "Nexus",
      assignee: "Sarah",
      status: "todo"
    },
    {
      id: "KRI-24",
      title: "User Authentication Flow",
      project: "Nexus",
      assignee: "Michael",
      status: "in-review"
    },
    {
      id: "KRI-25",
      title: "Dashboard Analytics",
      project: "Crystal",
      assignee: "Emma",
      status: "done"
    },
    {
      id: "KRI-26",
      title: "Mobile Responsiveness",
      project: "Crystal",
      assignee: "John",
      status: "todo"
    },
    {
      id: "KRI-27",
      title: "Payment Gateway Integration",
      project: "Nexus",
      assignee: "David",
      status: "in-progress"
    },
    {
      id: "KRI-28",
      title: "Email Notification System",
      project: "Indiana",
      assignee: "Lisa",
      status: "done"
    },
    {
      id: "KRI-29",
      title: "Search Optimization",
      project: "Crystal",
      assignee: "Alex",
      status: "todo"
    },
    {
      id: "KRI-30",
      title: "Database Migration",
      project: "Nexus",
      assignee: "James",
      status: "done"
    },
    {
      id: "KRI-31",
      title: "Security Audit",
      project: "Indiana",
      assignee: "Robert",
      status: "todo"
    },
    {
      id: "KRI-32",
      title: "Performance Testing",
      project: "Crystal",
      assignee: "Emily",
      status: "todo"
    }
  ];

  const columns = [
    { id: 'todo', title: 'Todo', count: 6 },
    { id: 'in-progress', title: 'In Progress', count: 2 },
    { id: 'in-review', title: 'In Review', count: 1 },
    { id: 'done', title: 'Done', count: 3 }
  ];
</script>

<div class="flex h-screen bg-background">
  <!-- Sidebar -->
  <div class="w-60 border-r border-border p-4 flex flex-col gap-2">
    <div class="flex items-center justify-between p-2">
      <div class="flex items-center gap-2">
        <div class="w-6 h-6 bg-primary rounded-md"></div>
        <span class="font-medium">Krish</span>
      </div>
      <ChevronDown class="w-4 h-4" />
    </div>

    <div class="space-y-1">
      <Button variant="ghost" class="w-full justify-start">
        <span>Inbox</span>
      </Button>
      <Button variant="ghost" class="w-full justify-start">
        <span>My Issues</span>
      </Button>
      <Button variant="ghost" class="w-full justify-start">
        <span>Views</span>
      </Button>
    </div>
  </div>

  <!-- Main Content -->
  <div class="flex-1 flex flex-col">
    <!-- Header -->
    <div class="border-b border-border p-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <Input placeholder="Search..." class="w-64" />
          <Button variant="outline">Filter</Button>
        </div>
      </div>
    </div>

    <!-- Kanban Board -->
    <ScrollArea.Root class="flex-1">
      <div class="flex gap-4 p-4">
        {#each columns as column}
          <div class="w-80 flex flex-col gap-2">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="font-medium">{column.title}</span>
                <span class="text-muted-foreground">{column.count}</span>
              </div>
              <div class="flex items-center gap-1">
                <Button variant="ghost" size="icon">
                  <MoreHorizontal class="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Plus class="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div class="space-y-2">
              {#each tasks.filter(t => t.status === column.id) as task}
                <Card.Root class="p-3">
                  <div class="flex items-center justify-between">
                    <span class="text-xs text-muted-foreground">{task.id}</span>
                    <Button variant="ghost" size="icon" class="h-6 w-6">
                      <MoreHorizontal class="w-4 h-4" />
                    </Button>
                  </div>
                  <h3 class="font-medium mt-1">{task.title}</h3>
                  <div class="flex items-center gap-2 mt-2">
                    <div class="w-4 h-4 rounded-full bg-primary"></div>
                    <span class="text-sm text-muted-foreground">{task.project}</span>
                  </div>
                </Card.Root>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </ScrollArea.Root>
  </div>
</div>

<style>
  :global(.dark) {
    --background: 0 0% 3.9%;
    --foreground: 0 0% 98%;
    --card: 0 0% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 0 0% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 0 0% 9%;
    --secondary: 0 0% 14.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 0 0% 14.9%;
    --muted-foreground: 0 0% 63.9%;
    --accent: 0 0% 14.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 14.9%;
    --input: 0 0% 14.9%;
    --ring: 0 0% 83.1%;
  }
</style>