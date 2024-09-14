from openai import OpenAI
from config import OPENAI_API_KEY, EVAL_PROMPT
import json

client = OpenAI(api_key=OPENAI_API_KEY)

class EvalClient:
    def do_eval(self, question: str, true_answer: str, person_response: str):
        prompt = EVAL_PROMPT.format(question=question, true_answer=true_answer, person_response=person_response)
        response = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            model="gpt-4o-mini",
            response_format={ "type": "json_object" }
        )
        return json.loads(response.choices[0].message.content)["eval"]

eval_client = EvalClient()
