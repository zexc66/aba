import * as contentful from "contentful";
import { COPY } from "../data";

export type Locale = "en" | "ar" | "fr";

interface CMSConfig {
  space: string;
  accessToken: string;
  environment: string;
}

interface ContentfulSiteSettings {
  contentData: (typeof COPY)["en"];
}

function isSiteSettings(fields: unknown): fields is ContentfulSiteSettings {
  return (
    typeof fields === "object" &&
    fields !== null &&
    "contentData" in fields &&
    typeof (fields as ContentfulSiteSettings).contentData === "object"
  );
}

class CMSService {
  private client: contentful.ContentfulClientApi<undefined> | null = null;
  private isConfigured = false;

  constructor() {
    this.initClient();
  }

  get configured(): boolean {
    return this.isConfigured;
  }
  private initClient() {
    const space = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
    const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;
    const environment = import.meta.env.VITE_CONTENTFUL_ENVIRONMENT || "master";

    if (space && accessToken) {
      this.client = contentful.createClient({
        space,
        accessToken,
        environment,
      });
      this.isConfigured = true;
    } else {
      if (import.meta.env.DEV) {
        console.warn(
          "CMS: Contentful keys not detected in environment. Falling back to local/mock data."
        );
      }
    }
  }

  async getWebsiteContent(locale: Locale = "en"): Promise<(typeof COPY)["en"]> {
    if (!this.isConfigured || !this.client) {
      return COPY[locale];
    }

    try {
      const contentfulLocale =
        locale === "en" ? "en-US" : locale === "ar" ? "ar-SA" : "fr-FR";

      const response = await this.client.getEntries({
        content_type: "siteSettings",
        locale: contentfulLocale,
        limit: 1,
      });

      if (response.items && response.items.length > 0) {
        const fields = response.items[0].fields;

        if (isSiteSettings(fields)) {
          return fields.contentData;
        }

        console.error(
          "CMS: 'siteSettings' entry is missing expected 'contentData' field. Using local data."
        );
      }

      throw new Error("Contentful entries empty or malformed");
    } catch (error) {
      console.error(
        "Failed to fetch from Contentful. Falling back to static data.",
        error
      );
      return COPY[locale];
    }
  }

  async getCollection(contentTypeId: string, locale: Locale = "en") {
    if (!this.isConfigured || !this.client) {
      return [];
    }
    const contentfulLocale =
      locale === "en" ? "en-US" : locale === "ar" ? "ar-SA" : "fr-FR";
    try {
      const response = await this.client.getEntries({
        content_type: contentTypeId,
        locale: contentfulLocale,
      });
      return response.items;
    } catch (err) {
      console.error(`Failed to fetch collection ${contentTypeId}:`, err);
      return [];
    }
  }
}

export const cms = new CMSService();
