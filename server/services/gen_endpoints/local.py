import httpx
from config import PROMPT_FORMAT, CONTEXT_PROMPT_FORMAT


class LlamaThreadClient:
    async def do_chat_completion(self, prompt: str, context: str | None = None):
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "http://127.0.0.1:8080/generate",
                json={
                    "prompt": (
                        PROMPT_FORMAT.format(question=prompt)
                        if context is None
                        else CONTEXT_PROMPT_FORMAT.format(
                            question=prompt, context=context
                        )
                    )
                },
            )
        return response.json()["content"]


llama_thread_client = LlamaThreadClient()
