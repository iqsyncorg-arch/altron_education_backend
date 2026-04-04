const { GoogleGenerativeAI } = require("@google/generative-ai");

// Import models for context
const Course = require('../models/Course.model');
const Center = require('../models/Center.model');
const Testimonial = require('../models/Testimonial.model');
const SuccessStory = require('../models/SuccessStory.model');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

exports.handleChat = async (req, res) => {
    try {
        const { message, history } = req.body;

        if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
            return res.status(200).json({
                response: "I'm the Altron Assistant! Please ask your administrator to configure my Google Gemini API Key so I can help you with your queries."
            });
        }

        // 1. Gather Context from MongoDB
        const [courses, centers, testimonials, stories] = await Promise.all([
            Course.find({}),
            Center.find({}),
            Testimonial.find({}),
            SuccessStory.find({})
        ]);

        const context = `
            You are the Altron Education Assistant, a highly professional, helpful, and friendly AI representative for Altron Education.
            Your goal is to assist students, parents, and partners with information about our courses, centers, and services.

            Our Details:
            - Head Office: Chennai (Arumbakkam), Phone: +91 99624 56533, Email: info@altroneducation.com
            - Website: www.altroneducation.com
            
            Our Courses:
            ${JSON.stringify(courses)}

            Our Training Centers:
            ${JSON.stringify(centers)}

            Success Stories:
            ${JSON.stringify(stories)}

            Customer Testimonials:
            ${JSON.stringify(testimonials)}

            Guidelines:
            - ALWAYS be polite and encouraging.
            - If you don't know the answer based on the provided data, politely guide them to contact our Head Office at +91 99624 56533 or visit centers.
            - Keep responses concise but informative.
            - Format your response in clear markdown if needed (bullets, bolding).
            - Do not mention that you are an AI model or that you have been provided with JSON data. Just be the "Altron Assistant".
        `;

        // 2. Initialize Model
        const modelNames = ["gemini-2.0-flash", "gemini-2.5-flash", "gemini-2.0-flash-lite", "gemini-1.5-flash"];

        let responseText = "";
        let success = false;

        for (const modelName of modelNames) {
            try {
                console.log(`--- Trying model: ${modelName} on v1 API ---`);
                const model = genAI.getGenerativeModel({ model: modelName }, { apiVersion: 'v1' });

                const chat = model.startChat({
                    history: [
                        { role: "user", parts: [{ text: "Hello, who are you?" }] },
                        { role: "model", parts: [{ text: "Hello! I am the Altron Education Assistant. How can I help you today?" }] },
                        ...history.map(msg => ({
                            role: msg.role === 'user' ? 'user' : 'model',
                            parts: [{ text: msg.text }]
                        }))
                    ],
                    generationConfig: { maxOutputTokens: 1000, temperature: 0.7 },
                });

                const result = await chat.sendMessage(`Context: ${context}\n\nUser Question: ${message}`);
                const response = await result.response;
                responseText = response.text();
                success = true;
                console.log(`--- Success with model: ${modelName} ---`);
                break;
            } catch (error) {
                console.error(`Error with model ${modelName}:`, error.message);
                if (error.status !== 404 && !error.message.includes("404")) {
                    throw error;
                }
                continue;
            }
        }

        if (success) {
            res.status(200).json({ response: responseText });
        } else {
            console.log("--- All SDK models failed. Attempting direct fetch to v1 API ---");
            const apiKey = process.env.GEMINI_API_KEY;
            const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            const fetchRes = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [
                        { role: "user", parts: [{ text: `Context: ${context}\n\nUser Question: ${message}` }] }
                    ]
                })
            });

            if (fetchRes.ok) {
                const data = await fetchRes.json();
                responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't generate a response.";
                res.status(200).json({ response: responseText });
            } else {
                const errData = await fetchRes.json().catch(() => ({}));
                console.error("Direct fetch failed:", errData);
                throw new Error("Direct fetch failed");
            }
        }

    } catch (error) {
        console.error('Chat Controller Final Error:', error);
        if (error.status === 404 || error.message.includes("404")) {
            return res.status(200).json({
                response: "I'm having trouble finding a compatible AI model. Please check your API key permissions and ensuring it supports Gemini 1.5 Flash."
            });
        }
        res.status(500).json({ message: 'Error processing chat request', error: error.message });
    }
};



