import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const { url } = await req.json()

        if (!url) {
            return NextResponse.json({ error: 'URL is required' }, { status: 400 })
        }

        let metadata: any = {
            title: '',
            description: '',
            image: '',
            author: '',
            authorHandle: '',
            date: ''
        }

        // Specific handling for X/Twitter - PRIORITIZE OEmbed
        if (url.includes('x.com') || url.includes('twitter.com')) {
            try {
                const oembedRes = await fetch(`https://publish.twitter.com/oembed?url=${encodeURIComponent(url)}`)
                if (oembedRes.ok) {
                    const oembedData = await oembedRes.json()
                    metadata.title = oembedData.author_name
                    metadata.author = oembedData.author_name
                    metadata.description = oembedData.html.replace(/<[^>]*>?/gm, '').slice(0, 200)
                    // Return early for X if we got oembed
                    return NextResponse.json(metadata)
                }
            } catch (e) {
                console.error('OEmbed fetch failed', e)
            }
        }

        // Fallback or general URL scraping
        try {
            const response = await fetch(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
                },
                next: { revalidate: 3600 },
                signal: AbortSignal.timeout(8000) // 8 second timeout
            })

            if (response.ok) {
                const html = await response.text()
                const getMetaTag = (property: string) => {
                    const regex = new RegExp(`<meta[^>]+(?:property|name)=["']${property}["'][^>]+content=["']([^"']+)["']`, 'i')
                    const match = html.match(regex)
                    if (match) return match[1]
                    const regexAlt = new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${property}["']`, 'i')
                    const matchAlt = html.match(regexAlt)
                    return matchAlt ? matchAlt[1] : null
                }

                metadata = {
                    title: getMetaTag('og:title') || getMetaTag('twitter:title') || metadata.title,
                    description: getMetaTag('og:description') || getMetaTag('twitter:description') || getMetaTag('description') || metadata.description,
                    image: getMetaTag('og:image') || getMetaTag('twitter:image') || '',
                    author: getMetaTag('og:site_name') || getMetaTag('twitter:site') || metadata.author,
                    authorHandle: getMetaTag('twitter:creator') || '',
                    date: getMetaTag('article:published_time') || getMetaTag('og:updated_time') || ''
                }
            }
        } catch (e) {
            console.error('Direct fetch failed:', e)
            // If we have some metadata (e.g. from OEmbed), proceed
            if (!metadata.title && !metadata.author) {
                return NextResponse.json({ error: 'Link is unreachable or private' }, { status: 500 })
            }
        }

        return NextResponse.json(metadata)

    } catch (error: any) {
        console.error('Scraper error:', error)
        return NextResponse.json({ error: 'Failed to extract link data' }, { status: 500 })
    }
}
