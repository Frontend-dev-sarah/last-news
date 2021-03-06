export type NewsList = {
    title: string,
    author: string,
    description: string,
    url: string,
    urlToImage: string,
    publishedAt: string,
    content: string,
    source: { id: string | null, name: string }
}