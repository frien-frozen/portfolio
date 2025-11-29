import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Ismatulloh Bakhtiyorov - Portfolio',
        short_name: 'Bakhtiyorov',
        description: 'Personal portfolio and blog of Ismatulloh Bakhtiyorov - Software Engineer & Digital Artist',
        start_url: '/',
        display: 'standalone',
        background_color: '#030014',
        theme_color: '#763AF5',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    };
}
