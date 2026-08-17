import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { generateChatResponse } from "./services/chatService";
import { saveInquiry } from "./storage";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



async function startServer() {
  const app = express();
  const server = createServer(app);

  // Parse JSON bodies
  app.use(express.json());

  // Chat endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message } = req.body;

      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Invalid message" });
      }

      // Reject oversized payloads (H-07 fix)
      if (message.trim().length > 2000) {
        return res.status(400).json({ error: "Message too long. Maximum 2000 characters." });
      }

      // Custom chatbot logic
      const response = generateChatResponse(message.trim().toLowerCase());

      // Simulate thinking delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 500));

      res.json({ response });
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Inquiry endpoint (Contact/Newsletter/Investor Access)
  app.post("/api/inquiry", async (req, res) => {
    try {
      const { type, email, name, organization, message } = req.body;
      
      if (!email || typeof email !== "string") {
        return res.status(400).json({ error: "Valid email is required" });
      }

      // Production-grade persistence of institutional inquiries
      const entry = await saveInquiry({
        type: type || 'GENERAL',
        email,
        name: name || 'ANONYMOUS',
        organization,
        message
      });

      console.log(`[PROTOCOL][SUCCESS] Lead ${entry.id} captured via ${entry.type}`);

      // Simulate network verification delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      res.status(200).json({ 
        success: true, 
        message: "Institutional inquiry archived",
        reference: entry.id
      });
    } catch (error) {
      console.error("Inquiry error:", error);
      res.status(500).json({ error: "Protocol failure: unable to archive inquiry" });
    }
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 5000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
