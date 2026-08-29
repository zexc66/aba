import express from "express";

const SITE_URL = "https://aiabasd.org";

interface RssItem {
  title: string;
  excerpt: string;
  date: string;
}

/** Fetch newsArticle entries from Contentful's CDA when server env is
 *  configured (same tokens the client uses). Never throws. */
async function fetchArticles(): Promise<RssItem[]> {
  const space = process.env.VITE_CONTENTFUL_SPACE_ID;
  const token = process.env.VITE_CONTENTFUL_ACCESS_TOKEN;
  const env = process.env.VITE_CONTENTFUL_ENVIRONMENT || "master";
  if (!space || !token) return [];

  try {
    const url = `https://cdn.contentful.com/spaces/${space}/environments/${env}/entries?content_type=newsArticle&order=-fields.date&limit=20`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) return [];
    const body = (await response.json()) as {
      items?: { fields?: { title?: unknown; excerpt?: unknown; date?: unknown } }[];
    };
    return (body.items ?? [])
      .map((item) => {
        const f = item.fields ?? {};
        return {
          title: typeof f.title === "string" ? f.title : "",
          excerpt: typeof f.excerpt === "string" ? f.excerpt : "",
          date: typeof f.date === "string" ? f.date : new Date().toISOString(),
        };
      })
      .filter((a) => a.title);
  } catch {
    return [];
  }
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function registerRssRoute(app: express.Express): void {
  app.get("/rss.xml", async (_req, res) => {
    res.setHeader("Content-Type", "application/rss+xml; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=900");

    const articles = await fetchArticles();
    const items = articles
      .map(
        (a) => `    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${SITE_URL}/#news</link>
      <guid isPermaLink="false">${SITE_URL}/#news#${escapeXml(a.date)}</guid>
      <pubDate>${new Date(a.date).toUTCString()}</pubDate>
      ${a.excerpt ? `<description>${escapeXml(a.excerpt)}</description>` : ""}
    </item>`
      )
      .join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>AIABASD — Newsroom</title>
    <link>${SITE_URL}</link>
    <description>Institutional updates from the African International Alliance for Business &amp; Sustainable Development.</description>
    <language>en</language>
${articles.length === 0 ? "    <!-- No articles published yet; this feed updates as announcements are released. -->\n" : ""}
${items}
  </channel>
</rss>`;
    res.status(200).send(xml);
  });
}
