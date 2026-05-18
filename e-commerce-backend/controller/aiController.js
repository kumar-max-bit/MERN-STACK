const ProductModel = require("../model/ProductModel");

// Dynamically call Gemini API via REST
exports.chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Check if API key is not configured or is the default placeholder
    if (!apiKey || apiKey === "your_google_ai_studio_gemini_api_key_here") {
      return res.json({
        reply: "Hi! I am the Alpha Mart AI Shopping Assistant. 🤖\n\nIt looks like the Google AI Studio API Key is not configured yet in the backend `.env` file! Please add your `GEMINI_API_KEY` to enable my full capabilities. For now, I can see we have items like Clothes, Laptops, Mobiles, and Shoes in our catalog! How can I help you?"
      });
    }

    // Fetch the live products catalog from MongoDB
    const products = await ProductModel.find({});
    
    // Format the products catalog for the AI
    const productCatalog = products
      .map(p => `- Title: ${p.title}\n  Description: ${p.description}`)
      .join("\n");

    const systemPrompt = `You are the friendly and helpful AI Shopping Assistant for "Alpha Mart" e-commerce store. 
Your task is to assist customers, answer their questions, and recommend products from our live catalog. 
You should be polite, concise, and professional. Only recommend products that are actually present in our catalog below.

Alpha Mart Catalog:
${productCatalog || "No products currently available in the catalog."}

If a user asks about products we don't have, politely explain we don't carry them and suggest something similar we do have.`;

    // Call Google AI Studio REST Endpoint (Gemini 1.5 Flash is fast and cheap/free)
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    // Use native fetch to make it lightweight and dependency-free
    const response = await fetch(geminiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: message }]
          }
        ],
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API Error:", errorText);
      return res.json({
        reply: "Sorry, I had trouble communicating with the AI service. Please make sure your GEMINI_API_KEY is valid and try again!"
      });
    }

    const data = await response.json();
    
    // Extract the text response from the Gemini JSON structure
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                      "I'm here to help, but I didn't get a response. Could you rephrase your question?";

    res.json({ reply: replyText });
  } catch (error) {
    console.error("AI Chat Controller Error:", error);
    res.status(500).json({ message: "Internal server error occurred while chatting with AI." });
  }
};
