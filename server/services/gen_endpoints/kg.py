import httpx

class KgThreadClient:
    async def do_chat_completion(self, prompt: str):
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "http://127.0.0.1:8010/run-forensiq",
                json={"question": prompt},
                timeout=120.0,
            )
        print(response.json())
        return response.json()["answer"]


kg_thread_client = KgThreadClient()