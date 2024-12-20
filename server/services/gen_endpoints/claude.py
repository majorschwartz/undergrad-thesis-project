import anthropic
from config import ANTHROPIC_API_KEY, PROMPT_FORMAT, CONTEXT_PROMPT_FORMAT

client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)


class ClaudeThreadClient:
    def do_chat_completion(self, prompt: str, context: str | None = None):
        response = client.messages.create(
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
            model="claude-3-sonnet-20240229",
            max_tokens=100,
        )
        return response.content[0].text


claude_thread_client = ClaudeThreadClient()
