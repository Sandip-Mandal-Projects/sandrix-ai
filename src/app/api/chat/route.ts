import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, history = [] } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Build messages array
    const messages = [
      {
        role: 'system',
        content:
          'You are ShadowSec AI, a powerful cybersecurity AI assistant specializing in ethical hacking, Linux, networking, malware analysis, cybersecurity education, penetration testing, digital forensics, and secure coding.',
      },

      ...history.map((msg: any) => ({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: msg.content,
      })),

      {
        role: 'user',
        content: message,
      },
    ];

    // Call OpenRouter AI
    const completion = await openai.chat.completions.create({
      model: 'openai/gpt-3.5-turbo',

      messages,

      temperature: 0.7,
      max_tokens: 2048,
    });

    return NextResponse.json({
      response: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error('OpenRouter Error:', error);

    return NextResponse.json(
      { error: 'An internal error occurred. Please try again.' },
      { status: 500 }
    );
  }
}