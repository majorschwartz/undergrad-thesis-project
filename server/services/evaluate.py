from openai import OpenAI
from config import OPENAI_API_KEY
import json

client = OpenAI(api_key=OPENAI_API_KEY)

class EvalClient:
    def __init__(self):
        self.eval_prompt = """
        You are an evaluation bot. You determine if the human response to a question is correct.
        You will be given the question, the true answer, and the human response.
        Capitalization does not matter. Punctuation does not matter. Allow for simple misspellings.
        If the human response is correct, you will return 'correct'.
        If the human response is incorrect, you will return 'incorrect'.
        Return your response in a JSON format as shown below.
        {{
			'eval': 'correct' | 'incorrect'
        }}
        
        **Question:** {question}\n
        **True Answer:** {true_answer}\n
        **Human Response:** {human_response}
        """

    def do_eval(self, question: str, true_answer: str, human_response: str):
        prompt = self.eval_prompt.format(question=question, true_answer=true_answer, human_response=human_response)
        response = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            model="gpt-4o",
            response_format={ "type": "json_object" }
        )
        return json.loads(response.choices[0].message.content)["eval"]

eval_client = EvalClient()
