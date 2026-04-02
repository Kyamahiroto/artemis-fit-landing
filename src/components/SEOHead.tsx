import { useEffect } from 'react';

interface SEOHeadProps {
    title: string;
    description: string;
}

export const SEOHead = ({ title, description }: SEOHeadProps) => {
    useEffect(() => {
        document.title = title;

        // Update or create meta description
        let metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', description);
        } else {
            metaDesc = document.createElement('meta');
            metaDesc.setAttribute('name', 'description');
            metaDesc.setAttribute('content', description);
            document.head.appendChild(metaDesc);
        }

        // Update OG tags
        let ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute('content', title);

        let ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) ogDesc.setAttribute('content', description);

        return () => {
            document.title = 'Artemis Fit | Inteligência em Performance Feminina';
        };
    }, [title, description]);

    return null;
};
