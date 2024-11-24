import { json } from '@sveltejs/kit';
import fs from 'fs/promises';
import path from 'path';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
    const { code } = await request.json();

    try {
        const componentId = `${Date.now()}-${Math.random().toString(36).slice(2)}`;  
        
        const componentPath = path.join(process.cwd(), 'src/lib/dynamic-components');
        await fs.mkdir(componentPath, { recursive: true });
        
        await fs.writeFile(
            path.join(componentPath, `${componentId}.svelte`),
            code
        );
        
        return json({
            success: true,
            componentId,
            url: `/render/${componentId}`
        });
    } catch (error) {
        return json({
            success: false,
            error: (error as Error).message
        }, { status: 400 });
    }
}