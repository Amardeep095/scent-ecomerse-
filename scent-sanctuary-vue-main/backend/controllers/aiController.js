import { GoogleGenerativeAI } from '@google/generative-ai';
import asyncHandler from '../utils/asyncHandler.js';
import Product from '../models/productModel.js';

// @desc    Get AI Perfume Recommendations
// @route   POST /api/v1/ai/recommend
// @access  Public
const getRecommendations = asyncHandler(async (req, res) => {
    const { message, preferences } = req.body;

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key') {
        res.status(500);
        throw new Error('Gemini API key is not configured');
    }

    // Fetch all products to give to AI as context
    const products = await Product.find({}).select('name brand category gender description notes price size');

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
        You are an expert luxury perfume consultant. 
        A user has asked: "${message}"
        User preferences: ${JSON.stringify(preferences)}
        
        Available perfumes from our store:
        ${JSON.stringify(products, null, 2)}
        
        Analyze the user's request and match it with our available perfumes. 
        Respond in a friendly, luxurious tone and recommend 1 to 3 perfumes from the catalog that best fit the prompt. Provide reasoning for why each was chosen based on their notes.
        Format your response as a JSON object containing "text" (your conversation response) and "recommendedProductIds" (array of product IDs you recommended).
        Return ONLY valid JSON. Keep the text engaging and short.
    `;

    try {
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        // Extract JSON from response (handling potential markdown wrappers)
        let jsonStr = responseText.trim();
        if (jsonStr.startsWith('\`\`\`json')) {
            jsonStr = jsonStr.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '').trim();
        } else if (jsonStr.startsWith('\`\`\`')) {
            jsonStr = jsonStr.replace(/\`\`\`/g, '').trim();
        }

        const parsedResponse = JSON.parse(jsonStr);

        res.json({
            text: parsedResponse.text,
            recommendedProductIds: parsedResponse.recommendedProductIds,
        });

    } catch (error) {
        console.error("AI Error:", error);
        res.status(500);
        throw new Error('Failed to fetch recommendations from AI');
    }
});

export { getRecommendations };
