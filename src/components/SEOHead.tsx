import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
    title: string;
    description: string;
    canonicalUrl?: string;
    image?: string;
    type?: string;
    schema?: object;
}

export const SEOHead = ({ 
    title, 
    description, 
    canonicalUrl, 
    image = 'https://artemisfit.online/og-default.png', // Fallback da sua imagem principal
    type = 'website',
    schema
}: SEOHeadProps) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            
            {/* Open Graph / Facebook / WhatsApp */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

            {/* Schema Markup (JSON-LD) */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Helmet>
    );
};
