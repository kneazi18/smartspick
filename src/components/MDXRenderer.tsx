'use client';

import React from 'react';
import AffiliateProduct from './mdx/AffiliateProduct';
import Image from 'next/image';

// Simple parser to handle basic MDX content with React components
function parseSimpleMDX(content: string) {
    // Replace AffiliateProduct components
    content = content.replace(
        /<AffiliateProduct\s+([^>]+)\s*\/>/g,
        (_, attributes) => {
            // Parse attributes
            const props: any = {};
            const attrRegex = /(\w+)=(?:{([^}]+)}|"([^"]+)")/g;
            let attrMatch;
            
            while ((attrMatch = attrRegex.exec(attributes)) !== null) {
                const [, key, jsValue, stringValue] = attrMatch;
                if (!key) continue;
                if (jsValue) {
                    // Handle JavaScript values (numbers, arrays, etc.)
                    try {
                        // Safely parse JavaScript values without eval
                        if (jsValue.startsWith('[') && jsValue.endsWith(']')) {
                            props[key] = JSON.parse(jsValue);
                        } else if (!isNaN(Number(jsValue))) {
                            props[key] = Number(jsValue);
                        } else if (jsValue === 'true') {
                            props[key] = true;
                        } else if (jsValue === 'false') {
                            props[key] = false;
                        } else {
                            props[key] = jsValue;
                        }
                    } catch {
                        props[key] = jsValue;
                    }
                } else {
                    props[key] = stringValue;
                }
            }
            
            // Return a placeholder that we'll replace with actual components
            return `__AFFILIATE_PRODUCT_${JSON.stringify(props)}__`;
        }
    );
    
    return content;
}

interface MDXRendererProps {
    content: string;
}

export default function MDXRenderer({ content }: MDXRendererProps) {
    const [parsedContent, setParsedContent] = React.useState<React.ReactNode[]>([]);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        if (!content || content.length === 0) {
            setParsedContent([]);
            return;
        }

        try {
            
            // Parse the content and convert to React elements
            const processed = parseSimpleMDX(content);
            const lines = processed.split('\n');
            const elements: React.ReactNode[] = [];
            let currentListItems: React.ReactNode[] = [];
            let listKey = 0;
            
            const flushListItems = () => {
                if (currentListItems.length > 0) {
                    elements.push(
                        <ul key={`list-${listKey++}`} className="list-disc list-inside mb-4 space-y-2 text-gray-700">
                            {currentListItems}
                        </ul>
                    );
                    currentListItems = [];
                }
            };
            
            for (let i = 0; i < lines.length; i++) {
                const currentLine = lines[i];
                if (!currentLine) continue;
                const line = currentLine.trim();
                
                if (!line) {
                    flushListItems();
                    continue;
                }
                
                // Check for AffiliateProduct placeholders
                if (line.includes('__AFFILIATE_PRODUCT_')) {
                    const match = line.match(/__AFFILIATE_PRODUCT_(.+)__/);
                    if (match && match[1]) {
                        try {
                            const propsStr = match[1];
                            if (propsStr) {
                                const props = JSON.parse(propsStr);
                                elements.push(
                                    <AffiliateProduct key={i} {...props} />
                                );
                            }
                            continue;
                        } catch (e) {
                            console.error('Error parsing AffiliateProduct props:', e);
                        }
                    }
                }
                
                // Handle headers
                if (line.startsWith('# ')) {
                    elements.push(
                        <h1 key={i} className="text-3xl font-bold text-gray-900 mt-8 mb-4 first:mt-0">
                            {line.substring(2)}
                        </h1>
                    );
                } else if (line.startsWith('## ')) {
                    elements.push(
                        <h2 key={i} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                            {line.substring(3)}
                        </h2>
                    );
                } else if (line.startsWith('### ')) {
                    elements.push(
                        <h3 key={i} className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                            {line.substring(4)}
                        </h3>
                    );
                }
                // Handle images
                else if (line.startsWith('![')) {
                    const match = line.match(/!\[([^\]]*)]\(([^)]+)\)/);
                    if (match && match[2]) {
                        const alt = match[1] || '';
                        const src = match[2];
                        elements.push(
                            <Image
                                key={i}
                                src={src}
                                alt={alt}
                                width={800}
                                height={400}
                                className="rounded-lg my-6 w-full h-auto"
                            />
                        );
                    }
                }
                // Handle list items
                else if (line.startsWith('- ')) {
                    // Process bold text in list items
                    const listContent = line.substring(2);
                    const processedListContent = listContent.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>');
                    
                    currentListItems.push(
                        <li key={i} className="text-gray-700" dangerouslySetInnerHTML={{ __html: processedListContent }} />
                    );
                }
                // Handle paragraphs
                else {
                    flushListItems();
                    // Handle bold text
                    const processedLine = line.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>');
                    
                    elements.push(
                        <p key={i} className="text-gray-700 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: processedLine }} />
                    );
                }
            }
            
            // Flush any remaining list items
            flushListItems();
            
            console.log('Parsing successful, created', elements.length, 'elements');
            setParsedContent(elements);
            setError(null);
        } catch (err) {
            console.error('MDX parsing error:', err);
            setError('Failed to render content: ' + (err as Error).message);
        }
    }, [content]);

    if (error) {
        return (
            <div className="text-red-600 p-4 border border-red-200 rounded-lg">
                <p>Error rendering content: {error}</p>
                <details className="mt-2">
                    <summary className="cursor-pointer">Show raw content</summary>
                    <pre className="mt-2 text-sm bg-gray-100 p-2 rounded overflow-x-auto">
                        {content}
                    </pre>
                </details>
            </div>
        );
    }

    if (parsedContent.length === 0) {
        return (
            <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"/>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"/>
                <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"/>
            </div>
        );
    }

    return <div>{parsedContent}</div>;
}