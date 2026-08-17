import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, "inquiries.json");

export interface Inquiry {
  id: string;
  type: string;
  email: string;
  name?: string;
  organization?: string;
  message?: string;
  timestamp: string;
}

export async function saveInquiry(inquiry: Omit<Inquiry, "id" | "timestamp">) {
  try {
    let inquiries: Inquiry[] = [];
    
    try {
      const data = await fs.readFile(DB_PATH, "utf-8");
      inquiries = JSON.parse(data);
    } catch (e) {
      // File doesn't exist yet, start with empty array
    }

    const newInquiry: Inquiry = {
      ...inquiry,
      id: Math.random().toString(36).substring(2, 11),
      timestamp: new Date().toISOString()
    };

    inquiries.push(newInquiry);
    
    await fs.writeFile(DB_PATH, JSON.stringify(inquiries, null, 2));
    
    // PRODUCTION AUDIT FIX: Structured logging without PII leakage in standard logs
    // We log that an inquiry was saved, but redirect full PII to the secure JSON store
    console.log(`[STORAGE][SECURE_ARCHIVE] Inquiry ${newInquiry.id} of type ${newInquiry.type} stored.`);
    
    return newInquiry;
  } catch (error) {
    console.error("Storage Error:", error);
    throw new Error("Critical storage failure: unable to persist institutional lead");
  }
}

export async function getInquiries() {
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(data) as Inquiry[];
  } catch (e) {
    return [];
  }
}
