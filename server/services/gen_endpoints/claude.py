import anthropic
import os

async def generate_claude(prompt: str):
	client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
	
	response = await client.messages.create(
		model="claude-3-sonnet-20240229",
		max_tokens=100,
		temperature=0,
		messages=[
			{
				"role": "user",
				"content": prompt
			}
		]
	)
	return response.content[0].text