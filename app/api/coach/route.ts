import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { z } from 'zod'

const schema = z.object({
  question: z.string().min(1),
  context: z.string().min(1)
})

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }
  const { question, context } = parsed.data

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey || apiKey === 'your-api-key-here' || apiKey.trim() === '') {
    const idx = context.toLowerCase().indexOf(question.toLowerCase())
    const snippet = idx >= 0 ? context.slice(Math.max(0, idx - 200), idx + 200) : context.slice(0, 400)
    return NextResponse.json({
      answer: "AI Coach offline mode: add OPENAI_API_KEY to enable generative answers. Here's a relevant snippet from the current lesson:\n\n" + snippet
    })
  }

  try {
    const client = new OpenAI({ apiKey })
    const resp = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.2,
      messages: [
        { role: 'system', content: "You are a calm, accessible learning coach. Answer questions using ONLY the provided lesson context. When you find relevant information, quote the exact text you're using. If the question asks about something not explicitly in the context, acknowledge what IS in the context that might be related, or say you don't see that specific information. Always be helpful and reference the lesson content when possible."},
        { role: 'user', content: `Lesson Context:\n\n${context}\n\nQuestion: ${question}` }
      ]
    })

    const answer = resp.choices[0]?.message?.content ?? 'No answer'
    return NextResponse.json({ answer })
  } catch (error: any) {
    console.error('OpenAI API error:', error)
    if (error?.status === 401 || error?.message?.includes('api key')) {
      return NextResponse.json({ 
        answer: 'Invalid API key. Please check your OPENAI_API_KEY in .env.local' 
      }, { status: 500 })
    }
    return NextResponse.json({ 
      answer: `Error: ${error?.message || 'Failed to get AI response'}. Please check your API key and try again.` 
    }, { status: 500 })
  }
}
