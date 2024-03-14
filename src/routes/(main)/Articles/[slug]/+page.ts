import { error } from '@sveltejs/kit';
import { base } from "$app/paths";


/** @type {import('./$types').PageLoad} */
export function load({ params }) {
    return {
        title: params.slug.split('-').map(word => word[0].toUpperCase()+word.slice(1)).join(' '),
        url: `${base}/markdown/${params.slug}.md`,
    };

    throw error(404, 'Not found');
}

export const prerender = true;