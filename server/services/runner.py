from services.gen_endpoints.oai import openai_thread_client
from services.gen_endpoints.claude import claude_thread_client
from services.evaluate import eval_client
from starlette.concurrency import run_in_threadpool
import asyncio


async def prompt_models(run_tag, prompts, models, eval_answers):
	combined = [(question, model, answer) for (question, answer) in zip(prompts, eval_answers) for model in models]

	combined = combined[:2]

	print(combined)
	
	tasks = []
	for question, model, eval_answer in combined:
		task = asyncio.create_task(prompt_and_post(model, question, eval_answer))
		tasks.append(task)
	
	await asyncio.gather(*tasks)

	print("All tasks completed")


async def prompt_and_post(model, question, eval_answer):
	if model == "claude-3-sonnet-20240229":
		response = await run_in_threadpool(claude_thread_client.do_chat_completion, question)
	elif model == "gpt-4o":
		response = await run_in_threadpool(openai_thread_client.do_chat_completion, question)
	else:
		raise ValueError(f"Invalid model: {model}")

	if eval_answer is not None:
		evaluation = await run_in_threadpool(eval_client.do_eval, question, eval_answer, response)
		print("evaluation:", evaluation)
	