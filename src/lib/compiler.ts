import { compile } from 'svelte/compiler';

export async function compileComponent(code: string) {
    const result = await compile(code, {
        css: "injected",
        generate: 'client',
        dev: true,
        filename: 'component.svelte'
    });
    
    return `
        import { SvelteComponent, tick } from 'svelte';
        
        ${result.js.code.replace(
            /from ["']svelte\/internal["']/g,
            'from "svelte"'
        )}
        
        // Export the component directly
        export default component;
    `;
}
