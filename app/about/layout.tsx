import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Ismatulloh | Bakhtiyorov',
    description: 'Learn more about Ismatulloh Bakhtiyorov (Bakhtiyorov) - Software Engineer & Digital Artist from Uzbekistan. Discover skills, experience, and passion for creating exceptional digital experiences.',
    keywords: ['Ismatulloh', 'Bakhtiyorov', 'About Ismatulloh', 'About Bakhtiyorov', 'Software Engineer Uzbekistan'],
    openGraph: {
        title: 'About Ismatulloh Bakhtiyorov | Bakhtiyorov',
        description: 'Software Engineer & Digital Artist from Uzbekistan. Learn more about Ismatulloh.',
        url: 'https://baxtiyorov.uz/about',
        type: 'profile',
    },
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
