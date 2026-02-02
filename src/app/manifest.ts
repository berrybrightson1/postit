import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Postit',
        short_name: 'Postit',
        description: 'Generate viral social media images instantly',
        start_url: '/',
        display: 'standalone',
        background_color: '#FDF8FF',
        theme_color: '#3A2D9C',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
        // Note: Share Target usually requires a service worker and potentially a POST route
        // for handling shared files. For a simple implementation, we stick to text.
        share_target: {
            action: '/',
            method: 'GET',
            params: {
                title: 'headline',
                text: 'body',
                url: 'footer',
            },
        },
    }
}
