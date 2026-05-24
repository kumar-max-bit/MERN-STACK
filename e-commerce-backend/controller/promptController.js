const Prompts = require("../model/promptModel");
const { GoogleGenAI } = require("@google/genai");

// Helper to provide helpful answers when Gemini is offline or API key is leaked
const getFallbackResponse = (query) => {
  const q = (query || "").toLowerCase();
  if (q.includes("ship") || q.includes("deliver")) {
    return "🚚 Shipping Info: We offer standard delivery within 3-5 business days across India. Free shipping is applicable on all orders above ₹499!";
  }
  if (q.includes("return") || q.includes("refund") || q.includes("replace")) {
    return "🔄 Returns & Refunds: We have a hassle-free 7-day return policy. Items must be unused and in their original packaging. Refunds are processed within 5-7 business days.";
  }
  if (q.includes("pay") || q.includes("price") || q.includes("cost") || q.includes("money")) {
    return "💳 Payments: We accept all major Indian Credit/Debit cards, UPI (GPay, PhonePe, Paytm), and Net Banking. All transactions are fully secured.";
  }
  if (q.includes("product") || q.includes("buy") || q.includes("sell") || q.includes("catalog")) {
    return "🛍️ Catalog: We offer a curated collection of premium products, including running shoes, polarized sunglasses, smartwatches, and canvas bags. Check our 'Shop Products' section!";
  }
  if (q.includes("contact") || q.includes("help") || q.includes("support") || q.includes("phone")) {
    return "📞 Customer Support: You can reach our helpdesk at support@alphamart.in or call us toll-free at 1800-123-4567 (9 AM - 6 PM).";
  }
  return "🤖 Demo Mode: The live AI API key is currently inactive/expired. However, I can help you with queries about Shipping, Returns, Payments, Support, or our Product Catalog!";
};

const sendPrompt = async (req, res) => {
  const promptText = req.body.prompt;
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: promptText,
    });

    await Prompts.create({
      question: promptText,
      promptData: response.text,
    });

    res.status(200).json({ AIResponse: response.text });
  } catch (error) {
    console.error("Gemini API call failed, running smart fallback...", error.message);
    const fallbackText = getFallbackResponse(promptText);
    
    // Save query with fallback data
    await Prompts.create({
      question: promptText,
      promptData: `[FALLBACK] ${fallbackText}`
    }).catch(e => console.error("Failed to save fallback to DB:", e.message));

    res.status(200).json({ AIResponse: fallbackText });
  }
};

module.exports = sendPrompt;
