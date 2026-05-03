export async function generateRoadmap(goal, skills) {
  const prompt = `You are a learning path expert. Generate a structured learning roadmap.

User goal: ${goal}
Current skills: ${skills}

Return ONLY a valid JSON object in this exact format, nothing else:
{
  "goal": "...",
  "steps": [
    {
      "title": "...",
      "description": "...",  
      "duration": "...",
      "resources": ["...", "..."],
      "done": false
    }
  ]
}

Generate 5-8 steps. Be specific and practical.`

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7
    })
  })

  const data = await res.json()
  const text = data.choices[0].message.content
  const clean = text.replace(/```json|```/g, '').trim()
  return JSON.parse(clean)
}