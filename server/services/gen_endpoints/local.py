import httpx
from config import PROMPT_FORMAT

class LlamaThreadClient:
    async def do_chat_completion(self, prompt: str):
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "http://127.0.0.1:8080/generate",
                json={"prompt": PROMPT_FORMAT.format(question=prompt)},
            )
        return response.json()["content"]


llama_thread_client = LlamaThreadClient()
