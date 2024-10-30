from openai import OpenAI
from config import OPENAI_API_KEY, PROMPT_FORMAT, CONTEXT_PROMPT_FORMAT

client = OpenAI(api_key=OPENAI_API_KEY)


class OpenAIThreadClient:
    def do_chat_completion(self, prompt: str, context: str | None = None):
        response = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": (
                        PROMPT_FORMAT.format(question=prompt)
                        if context is None
                        else CONTEXT_PROMPT_FORMAT.format(
                            question=prompt, context=context
                        )
                    ),
                }
            ],
            model="gpt-4o-mini",
            max_tokens=100,
        )
        return response.choices[0].message.content


openai_thread_client = OpenAIThreadClient()
