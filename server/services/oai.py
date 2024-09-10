from openai import OpenAI
from config import OPENAI_API_KEY, OPENAI_MODEL

openaiClient = OpenAI(api_key=OPENAI_API_KEY)


class OpenAIThreadClient:
    def do_chat_completion(self, content, json=True):
        return openaiClient.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": content,
                }
            ],
            model=OPENAI_MODEL,
            response_format={"type": "json_object" if json else "text"},
        )


openai_thread_client = OpenAIThreadClient()
