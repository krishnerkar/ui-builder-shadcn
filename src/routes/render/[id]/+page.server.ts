import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import fs from 'fs/promises';
import path from 'path';

export const load: PageServerLoad = async ({ params }) => {
    const componentId = params.id;
    const componentPath = path.join(process.cwd(), 'src/lib/dynamic-components', `${componentId}.svelte`);
    
    try {
        await fs.access(componentPath);
        return {
            componentId
        };
    } catch {
        throw error(404, 'Component not found');
    }
};
