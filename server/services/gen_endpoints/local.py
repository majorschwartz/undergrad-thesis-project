import httpx

async def generate_local(prompt: str):
	async with httpx.AsyncClient() as client:
		response = await client.post(
			"http://127.0.0.1:8080/generate",
			json={"prompt": prompt}
		)
		return response.json()["generated_text"]