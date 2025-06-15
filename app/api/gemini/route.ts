import { NextRequest, NextResponse } from 'next/server'

const snehaDescription = `I'm Sneha Mandal, a passionate and driven undergraduate student specializing in frontend development. Currently, I'm expanding my expertise into backend technologies and exploring the evolving landscape of Web3. I believe that continuous learning is the key to staying ahead in tech, and I'm committed to honing my skills across the full stack. In parallel with my development journey, I'm delving into the fascinating domain of Quantum Computing—a field I believe holds the potential to unlock a new era of computation. To me, it's not just a subject of study, but a gateway to the future, a possible key to what I call the quantum world lock. Outside the realm of technology, I have a deep appreciation for physics, especially astronomy and quantum mechanics, which fuel my curiosity and inspire my thinking. When I'm not coding or reading about the cosmos, you'll find me immersed in books, playing the piano, or expressing creativity through sketching. These pursuits ground me and keep my imagination alive, adding balance to my analytical side.`

export async function POST(req: NextRequest) {
  const { message } = await req.json()
  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey) {
    return NextResponse.json({ reply: 'API key not set.' }, { status: 500 })
  }

  // Gemini API endpoint for text generation
  const url = 'https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=' + apiKey

  const geminiReq = {
    contents: [
      {
        role: "user",
        parts: [
          { text: `You are Sneha Mandal's AI Assistant. Your primary goal is to be helpful and engage in natural, human-like conversation. You should answer general questions conversationally. When asked about Sneha Mandal, you should use the following information as your knowledge base. If a question about Sneha cannot be fully answered by this text, you can indicate that your knowledge is based on the provided portfolio, and suggest checking Sneha's full website.\n\nSneha Mandal's Portfolio Information:\n${snehaDescription}` }
        ]
      },
      {
        role: "model",
        parts: [
          { text: "Hello! I'm ready to assist and chat about Sneha Mandal or anything else you'd like to discuss." }
        ]
      },
      {
        role: "user",
        parts: [
          { text: message }
        ]
      }
    ]
  }

  try {
    const geminiRes = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(geminiReq),
    })
    const data = await geminiRes.json()
    console.log('Gemini API response:', data)
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a reply.'
    return NextResponse.json({ reply })
  } catch (error) {
    return NextResponse.json({ reply: 'Sorry, there was an error contacting the AI service.' }, { status: 500 })
  }
} 