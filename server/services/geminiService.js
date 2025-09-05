// services/GeminiService.js
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { config } = require('../config/config');

class GeminiService {
  constructor() {
    this.apiKey = config.gemini.apiKey;
    this.model = config.gemini.model;
    this.maxTokens = config.gemini.maxTokens;
    this.temperature = config.gemini.temperature;

    if (this.isConfigured()) {
      this.genAI = new GoogleGenerativeAI(this.apiKey);
    }
  }

  isConfigured() {
    return !!this.apiKey;
  }

  async generateResponse(message, options = {}) {
    if (!this.isConfigured()) {
      throw new Error('Google Gemini service is not properly configured');
    }

    const {
      maxTokens = this.maxTokens,
      temperature = this.temperature,
    } = options;

    try {
      const model = this.genAI.getGenerativeModel({
        model: this.model,
        generationConfig: {
          maxOutputTokens: maxTokens,
          temperature: temperature,
        },
      });

      // Clean, conversational prompt
      const prompt = `
      You are a helpful and friendly assistant. 
      Always reply in clear, natural sentences like a normal conversation. 
      Do not use special formatting (headings, bullets, lists, or separators) 
      unless the user specifically asks for it.

      User: ${message}
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return {
        message: text,
        provider: 'gemini',
        model: this.model,
        usage: {
          promptTokens: result.response.usageMetadata?.promptTokenCount || 0,
          completionTokens: result.response.usageMetadata?.candidatesTokenCount || 0,
          totalTokens: result.response.usageMetadata?.totalTokenCount || 0,
        },
      };
    } catch (error) {
      throw new Error(`Google Gemini API error: ${error.message}`);
    }
  }
}

module.exports = new GeminiService();
