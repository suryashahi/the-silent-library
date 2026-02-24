export interface RSSSource {
  name: string;
  url: string;
}

export const RSS_SOURCES: RSSSource[] = [
  { name: "BBC News", url: "http://feeds.bbci.co.uk/news/rss.xml" },
  { name: "CNN International", url: "http://rss.cnn.com/rss/edition.rss" },
  { name: "Reuters World", url: "https://www.reutersagency.com/feed/?best-topics=world&post_type=best" },
  { name: "The Guardian", url: "https://www.theguardian.com/world/rss" },
  { name: "Al Jazeera", url: "https://www.aljazeera.com/xml/rss/all.xml" },
];

export const fetchLatestArticle = async (feedUrl: string): Promise<{ title: string; content: string }> => {
  const response = await fetch(`/api/rss?url=${encodeURIComponent(feedUrl)}`);
  if (!response.ok) {
    throw new Error("Failed to fetch news from RSS feed");
  }

  const data = await response.json();
  
  if (!data.items || data.items.length === 0) {
    throw new Error("No articles found in this feed");
  }

  // Get the latest item
  const latestItem = data.items[0];
  
  // RSS feeds usually have 'content' or 'contentSnippet' or 'description'
  const content = latestItem.content || latestItem.contentSnippet || latestItem.description || "";
  
  return {
    title: latestItem.title || "Untitled",
    content: content
  };
};
