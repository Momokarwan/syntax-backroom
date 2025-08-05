'use client'

import { useState } from 'react'

export default function Backroom() {
  const [messages, setMessages] = useState([{ role: 'ai', content: 'Benvenuto nella Backroom di SYNTAX. Di cosa vuoi parlare?' }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return

    const newMessages = [...messages, { role: 'user', content: input }]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newMessages })
    })

    const data = await res.json()
    setMessages([...newMessages, { role: 'ai', content: data.reply }])
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-black text-green-400 p-4 font-mono">
      <h1 className="text-2xl mb-4">SYNTAX // BACKROOM</h1>
      <div className="space-y-2 mb-4 max-h-[70vh] overflow-y-auto pr-2">
        {messages.map((msg, idx) => (
          <div key={idx} className={msg.role === 'user' ? 'text-right' : 'text-left'}>
            <span className="block whitespace-pre-wrap">{msg.content}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-grow p-2 bg-gray-900 text-green-400 border border-green-600 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Scrivi qui..."
        />
        <button
          className="px-4 py-2 bg-green-700 text-black rounded"
          onClick={sendMessage}
          disabled={loading}
        >
          Invia
        </button>
      </div>
    </div>
  )
}
