<script lang="ts">
    import { Menu, Search, Video, Bell, User, Home, Compass, PlaySquare, Clock, ThumbsUp, ChevronDown, Menu as MenuIcon } from 'lucide-svelte';
    import * as Sheet from "$lib/components/ui/sheet";
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { cn } from "$lib/utils";

    // State
    let isSidebarOpen = true;
    let isSheetOpen = false;

    // Mock video data
    const videos = Array(12).fill(null).map((_, i) => ({
        id: i,
        title: `Video Title ${i + 1} - Amazing Content That Will Blow Your Mind`,
        channel: `Channel ${i + 1}`,
        views: `${Math.floor(Math.random() * 1000)}K views`,
        timestamp: `${Math.floor(Math.random() * 12)} months ago`,
        thumbnail: `bg-zinc-800` // Using background color instead of images
    }));

    const sidebarItems = [
        { icon: Home, label: 'Home' },
        { icon: Compass, label: 'Explore' },
        { icon: PlaySquare, label: 'Subscriptions' },
        { icon: Clock, label: 'History' },
        { icon: ThumbsUp, label: 'Liked Videos' },
    ];
</script>

<div class="h-screen bg-background">
    <!-- Header -->
    <header class="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div class="flex h-14 items-center px-4">
            <div class="flex items-center gap-4">
                <Button variant="ghost" size="icon" class="md:hidden" on:click={() => isSheetOpen = true}>
                    <MenuIcon class="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" class="hidden md:flex" on:click={() => isSidebarOpen = !isSidebarOpen}>
                    <MenuIcon class="h-5 w-5" />
                </Button>
                <div class="flex items-center gap-2">
                    <Video class="h-5 w-5 text-red-600" />
                    <span class="font-semibold">YouTube</span>
                </div>
            </div>
            
            <div class="flex flex-1 items-center justify-center px-4">
                <div class="flex w-full max-w-[600px] items-center gap-2">
                    <Input type="search" placeholder="Search" class="w-full" />
                    <Button variant="ghost" size="icon">
                        <Search class="h-5 w-5" />
                    </Button>
                </div>
            </div>

            <div class="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                    <Bell class="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                    <User class="h-5 w-5" />
                </Button>
            </div>
        </div>
    </header>

    <!-- Mobile Sidebar -->
    <Sheet.Root bind:open={isSheetOpen}>
        <Sheet.Content side="left" class="w-[280px]">
            <div class="grid gap-4 py-4">
                {#each sidebarItems as item}
                    <Button variant="ghost" class="justify-start gap-4">
                        <svelte:component this={item.icon} class="h-5 w-5" />
                        {item.label}
                    </Button>
                {/each}
            </div>
        </Sheet.Content>
    </Sheet.Root>

    <!-- Desktop Layout -->
    <div class="flex pt-14">
        <!-- Sidebar -->
        <aside class={cn(
            "hidden md:block fixed left-0 h-[calc(100vh-3.5rem)] w-[240px] border-r transition-all duration-300",
            !isSidebarOpen && "w-[70px]"
        )}>
            <div class="py-4">
                {#each sidebarItems as item}
                    <Button variant="ghost" class="w-full justify-start gap-4">
                        <svelte:component this={item.icon} class="h-5 w-5" />
                        {#if isSidebarOpen}
                            <span>{item.label}</span>
                        {/if}
                    </Button>
                {/each}
            </div>
        </aside>

        <!-- Main Content -->
        <main class={cn(
            "flex-1 p-4 transition-all duration-300",
            isSidebarOpen ? "md:ml-[240px]" : "md:ml-[70px]"
        )}>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {#each videos as video}
                    <div class="group relative flex flex-col gap-2">
                        <div class="aspect-video w-full overflow-hidden rounded-lg {video.thumbnail}"></div>
                        <div class="flex gap-2">
                            <div class="h-8 w-8 rounded-full bg-zinc-700"></div>
                            <div class="flex flex-col">
                                <p class="line-clamp-2 text-sm font-medium">{video.title}</p>
                                <p class="text-sm text-muted-foreground">{video.channel}</p>
                                <div class="flex items-center gap-1 text-sm text-muted-foreground">
                                    <span>{video.views}</span>
                                    <span>•</span>
                                    <span>{video.timestamp}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        </main>
    </div>
</div>

<style>
    /* Custom scrollbar styles */
    :global(::-webkit-scrollbar) {
        width: 8px;
    }

    :global(::-webkit-scrollbar-track) {
        background: transparent;
    }

    :global(::-webkit-scrollbar-thumb) {
        background: #666;
        border-radius: 4px;
    }

    :global(::-webkit-scrollbar-thumb:hover) {
        background: #555;
    }
</style>