import { GoogleGenerativeAI } from '@google/generative-ai';
import * as schema from '@/lib/schema.json';
import * as example from '@/lib/example/e1.json';

export async function POST(req: Request): Promise<Response> {
  try {
    const { message }: { message: string } = await req.json();

    const context = `Break down the following japanese statement following the json schema ${JSON.stringify(schema)} output some valid json following the schema. The marker particle should be included in the constituent that they form (e.g. は should be part of the subject). Include all punctuation as word (e.g. comma, points...). All the words add together should correspond to the original text. You have to go as deep as possible e.g.: ${JSON.stringify(example, null, 2)}`;
    const promptWithContext = `Context: ${context}\nUser: "${message}"`;

    const genAI = new GoogleGenerativeAI("AIzaSyAJJATLqwrEUUVTfwWKC3KAfz0aAKsD1zI");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig: {
        responseMimeType: "application/json",
      },});

    const result = await model.generateContent(promptWithContext);

    return new Response(result.response.text(), { status: 200 });
  } catch (error) {
    console.error('Error communicating with Google Generative AI:', error);
    return new Response(JSON.stringify({ error: 'Something went wrong' }), { status: 500 });
  }
}