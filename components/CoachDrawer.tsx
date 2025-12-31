'use client'

import { useState, useRef, useEffect } from 'react'
import autosize from 'autosize'

export default function CoachDrawer({ context }: { context: string }) {
  const [open, setOpen] = useState(true)
  const [input, setInput] = useState('What are the 3 key takeaways here?')
  const [messages, setMessages] = useState<{role:'user'|'coach', content:string}[]>([
    { role: 'coach', content: 'Hi! Ask me about this lesson and I will answer using only the content on the left.' }
  ])
  const taRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    if (taRef.current) autosize(taRef.current)
  }, [])

  async function ask() {
    const q = input.trim(); if (!q) return
    if (!context || context.trim().length === 0) {
      setMessages(m => [...m, { role: 'coach', content: 'Error: No lesson content available. Please refresh the page.' }])
      return
    }
    setMessages(m => [...m, { role: 'user', content: q }])
    setInput('')
    try {
      const res = await fetch('/api/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q, context: context.slice(0, 6000) })
      })
      const data = await res.json()
      if (!res.ok) {
        // API returns error messages in the 'answer' field
        setMessages(m => [...m, { role: 'coach', content: data.answer || data.error || 'Failed to get answer' }])
        return
      }
      setMessages(m => [...m, { role: 'coach', content: data.answer || 'No answer received' }])
    } catch (e: any) {
      setMessages(m => [...m, { role: 'coach', content: `Error: ${e?.message || 'Failed to connect to coach'}` }])
    }
  }

  return (
    <div className="p-4">
      <button
        className="w-full text-left font-semibold mb-2"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-controls="coach-panel"
      >
        🤖 AI Coach
      </button>
      {open && (
        <div id="coach-panel" className="grid gap-3">
          <div className="h-[360px] overflow-y-auto border rounded-md p-3 bg-gray-50">
            {messages.map((m, i) => (
              <div key={i} className={m.role === 'coach' ? 'text-gray-800' : 'text-gray-900 font-medium'}>
                {m.role === 'coach' ? 'Coach: ' : 'You: '}{m.content}
              </div>
            ))}
          </div>
          <label className="sr-only" htmlFor="coach-input">Ask the coach</label>
          <textarea
            id="coach-input"
            ref={taRef}
            className="border rounded-md p-2 min-h-[44px] max-h-40 resize-none"
            placeholder="Ask a question about this lesson…"
            value={input}
            onChange={(e)=>setInput(e.target.value)}
            onKeyDown={(e)=>{ if (e.key==='Enter' && !e.shiftKey) { e.preventDefault(); ask(); } }}
          />
          <button onClick={ask} className="rounded-md bg-black text-white px-3 py-2">Ask</button>
          <p className="text-xs text-gray-500">
            Answers are grounded in the current lesson. Add an <code>.env</code> OPENAI_API_KEY for full AI mode.
          </p>
        </div>
      )}
    </div>
  )
}
