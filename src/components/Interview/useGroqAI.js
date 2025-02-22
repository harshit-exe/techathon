import { useState } from 'react';

const GROQ_API_KEY = "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"; // Replace this with your actual Groq API key
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export function useGroqAI() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const callGroqAPI = async (messages) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'mixtral-8x7b-32768',
          messages: messages,
          max_tokens: 150,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to call Groq API: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices[0].message.content.trim();
    } catch (error) {
      console.error('Error calling Groq API:', error);
      setError(error.message);
      return 'Failed to process request. Please try again.';
    } finally {
      setIsLoading(false);
    }
  };

  const generateQuestion = async (interviewType) => {
    const messages = [
      { role: 'system', content: 'You are an AI assistant that generates concise interview questions for software developers.' },
      { role: 'user', content: `Generate a short 4-5 line, challenging interview question for a ${interviewType} developer position. Keep it under 20 words.` }
    ];
    return callGroqAPI(messages);
  };

  const evaluateAnswer = async (question, answer) => {
    const messages = [
      { role: 'system', content: 'You are an AI assistant that evaluates interview answers.' },
      { role: 'user', content: `Question: ${question}\nAnswer: ${answer}\n\nEvaluate the answer and provide short, constructive feedback in 2-3 sentences.` }
    ];
    return callGroqAPI(messages);
  };

  return { generateQuestion, evaluateAnswer, isLoading, error };
}

