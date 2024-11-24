<script lang="ts">
  import { Search, Settings, Plus, MoreVertical, Users } from "lucide-svelte";
  import * as Card from "$lib/components/ui/card";
  import { Button } from "$lib/components/ui/button";
  import { Badge } from "$lib/components/ui/badge";
  import { Input } from "$lib/components/ui/input";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";

  const lanes = [
    { id: 'todo', title: 'Todo', count: 6, issues: [
      { id: 'KRI-19', title: 'Article scraper', assignee: 'Indiana', priority: 'High' },
      { id: 'KRI-15', title: 'Get timeline items working', assignee: 'Grit PR-Reviewer', priority: 'Medium' },
      { id: 'KRI-14', title: 'Fix authentication flow', assignee: 'Sarah', priority: 'High' },
      { id: 'KRI-13', title: 'Update documentation', assignee: 'Michael', priority: 'Low' },
      { id: 'KRI-12', title: 'Mobile responsiveness', assignee: 'Jessica', priority: 'Medium' },
      { id: 'KRI-11', title: 'Performance optimization', assignee: 'Indiana', priority: 'High' }
    ]},
    { id: 'in-progress', title: 'In Progress', count: 2, issues: [
      { id: 'KRI-21', title: 'Youtube transcript + summarizer', assignee: 'Indiana', priority: 'High' },
      { id: 'KRI-20', title: 'Crunchbase scraper', assignee: 'Indiana', priority: 'Medium' }
    ]},
    { id: 'in-review', title: 'In Review', count: 1, issues: [
      { id: 'KRI-18', title: 'Wikipedia scraper', assignee: 'Indiana', priority: 'Medium' }
    ]},
    { id: 'done', title: 'Done', count: 3, issues: [
      { id: 'KRI-22', title: 'Display title, tag and body', assignee: 'Grit PR-Reviewer', priority: 'High' },
      { id: 'KRI-17', title: 'Website summarizer + socials scraper', assignee: 'Indiana', priority: 'High' },
      { id: 'KRI-16', title: 'LinkedIn Scraper', assignee: 'Indiana', priority: 'Medium' }
    ]}
  ];

  const sidebarItems = [
    { id: 'inbox', label: 'Inbox', count: 12 },
    { id: 'my-issues', label: 'My issues', count: 8 },
    { id: 'reported', label: 'Reported by me', count: 5 },
    { id: 'boards', label: 'Boards', count: 3 },
    { id: 'projects', label: 'Projects', count: 4 },
    { id: 'dashboards', label: 'Dashboards', count: 2 },
    { id: 'teams', label: 'Teams', count: 6 }
  ];
</script>

<div class="h-screen bg-background flex">
  <!-- Sidebar -->
  <div class="w-64 bg-muted/30 border-r p-4 flex flex-col gap-2">
    <div class="flex items-center gap-2 p-2">
      <div class="h-6 w-6 rounded bg-primary/20 flex items-center justify-center">KR</div>
      <span class="font-semibold">Krish</span>
    </div>
    
    <Input placeholder="Search..." class="mb-4" />
    
    {#each sidebarItems as item}
      <Button variant="ghost" class="w-full justify-start">
        {item.label}
        <span class="ml-auto text-xs text-muted-foreground">{item.count}</span>
      </Button>
    {/each}
  </div>

  <!-- Main Content -->
  <div class="flex-1 flex flex-col">
    <!-- Header -->
    <header class="border-b p-4 flex items-center justify-between">
      <div class="flex gap-4">
        <Button variant="ghost">All Issues</Button>
        <Button variant="ghost">Active</Button>
        <Button variant="ghost">Backlog</Button>
      </div>
      <div class="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Search class="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings class="h-4 w-4" />
        </Button>
      </div>
    </header>

    <!-- Kanban Board -->
    <div class="flex-1 p-4">
      <div class="flex gap-4 h-full">
        {#each lanes as lane}
          <div class="flex-1 flex flex-col gap-4 min-w-[300px]">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="font-semibold">{lane.title}</span>
                <Badge variant="outline">{lane.count}</Badge>
              </div>
              <div class="flex gap-1">
                <Button variant="ghost" size="icon" class="h-8 w-8">
                  <Plus class="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" class="h-8 w-8">
                  <MoreVertical class="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div class="flex flex-col gap-2">
              {#each lane.issues as issue}
                <Card.Root class="p-4">
                  <div class="flex items-start justify-between">
                    <div>
                      <div class="font-medium">{issue.title}</div>
                      <div class="text-sm text-muted-foreground">{issue.id}</div>
                    </div>
                    <Button variant="ghost" size="icon" class="h-8 w-8">
                      <Users class="h-4 w-4" />
                    </Button>
                  </div>
                  <div class="mt-2 flex gap-2">
                    <Badge variant="secondary">{issue.assignee}</Badge>
                    <Badge variant={issue.priority === 'High' ? 'destructive' : issue.priority === 'Medium' ? 'warning' : 'default'}>
                      {issue.priority}
                    </Badge>
                  </div>
                </Card.Root>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>