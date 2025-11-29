// Structured Data (JSON-LD) helpers for SEO

export interface Person {
    name: string;
    jobTitle: string;
    url: string;
    sameAs: string[];
    image?: string;
    email?: string;
}

export interface Article {
    headline: string;
    description: string;
    author: Person;
    datePublished: string;
    dateModified: string;
    image?: string;
    url: string;
    keywords?: string[];
}

export function generatePersonSchema(person: Person) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: person.name,
        jobTitle: person.jobTitle,
        url: person.url,
        sameAs: person.sameAs,
        ...(person.image && { image: person.image }),
        ...(person.email && { email: person.email }),
    };
}

export function generateArticleSchema(article: Article) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.headline,
        description: article.description,
        author: {
            '@type': 'Person',
            name: article.author.name,
            url: article.author.url,
        },
        datePublished: article.datePublished,
        dateModified: article.dateModified,
        ...(article.image && { image: article.image }),
        url: article.url,
        ...(article.keywords && { keywords: article.keywords.join(', ') }),
    };
}

export function generateWebSiteSchema(url: string, name: string) {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name,
        url,
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${url}/blog?search={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
        },
    };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}
