from openai import OpenAI
from config import OPENAI_API_KEY, PROMPT_FORMAT

client = OpenAI(api_key=OPENAI_API_KEY)

class OpenAIThreadClient:
    def do_chat_completion(self, prompt: str):
        response = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": PROMPT_FORMAT.format(question=prompt),
                }
            ],
            model="gpt-4o",
            max_tokens=100
        )
        return response.choices[0].message.content

openai_thread_client = OpenAIThreadClient()
