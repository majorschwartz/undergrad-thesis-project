import os
from dotenv import load_dotenv

load_dotenv()

ORIGIN_ENDPOINT = os.getenv("ORIGIN_ENDPOINT")
SECRET_KEY = os.getenv("APP_SECRET_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")

MONGO_URI = os.getenv("MONGO_URI")
MONGO_DB = os.getenv("MONGO_DB")
MONGO_URI_LOCAL = os.getenv("MONGO_URI_LOCAL")
MONGO_DB_LOCAL = os.getenv("MONGO_DB_LOCAL")

LOCAL = True

# PROMPTS

PROMPT_FORMAT = """
Answer the following question concisely.

Examples:

Question: What is the capital of France?
Answer: Paris

Question: What is 15 * 15?
Answer: 225

---

Question: {question}
Your Answer:
"""

CONTEXT_PROMPT_FORMAT = """
*CONTEXT:*

{context}

---

*TASK:*

Answer the following question concisely.

*Examples:*

Question: What is the capital of France?
Answer: Paris

Question: What is 15 * 15?
Answer: 225

---

Question: {question}
Your Answer:
"""

EVAL_PROMPT = """
You are an evaluation bot. You determine if the person's response to a question is correct.
You will be given the question, the true answer, and the person's response.
Capitalization does not matter. Punctuation does not matter. Allow for simple misspellings.
If the person's response is correct, you will return 'correct'.
If the person's response is incorrect, you will return 'incorrect'.
Also, it can be slightly off. For example, if the person's response is "New York" and the true answer is "New York City", you will return 'correct'. Or if the radius of the sun is 696,340 km and the person's response is 696,000 km (only off by 0.001%), you will return 'correct'.

Return your response in a JSON format as shown below.
{{
	'eval': 'correct' | 'incorrect'
}}

**Question:** {question}\n
**True Answer:** {true_answer}\n
**Person's Response:** {person_response}
"""