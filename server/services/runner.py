from services.gen_endpoints.oai import openai_thread_client
from services.gen_endpoints.claude import claude_thread_client
from services.evaluate import eval_client
from utils.socketpost import ws_gen_completion, ws_eval_completion
from database.dbupdate import db_set_result_status, db_set_result_response, db_set_result_evaluation
from starlette.concurrency import run_in_threadpool
import asyncio
import time


async def prompt_models(run_tag, prompts, models, eval_answers):
	combined = [(question, model, answer) for (question, answer) in zip(prompts, eval_answers) for model in models]

	combined = combined[:2]

	print(combined)
	
	tasks = []
	for i in range(len(combined)):
		question, model, eval_answer = combined[i]
		task = asyncio.create_task(prompt_and_post(model, question, eval_answer, i // len(models), i % len(models), run_tag))
		tasks.append(task)
	
	await asyncio.gather(*tasks)

	print("All tasks completed")


async def prompt_and_post(model, question, eval_answer, q_index, m_index, run_tag):
	await db_set_result_status(run_tag, q_index, m_index, "in_progress")
	elapsed = time.time()
	if model == "claude-3-sonnet-20240229":
		response = await run_in_threadpool(claude_thread_client.do_chat_completion, question)
	elif model == "gpt-4o":
		response = await run_in_threadpool(openai_thread_client.do_chat_completion, question)
	else:
		raise ValueError(f"Invalid model: {model}")
	
	elapsed = time.time() - elapsed
	
	await ws_gen_completion(run_tag, q_index, m_index, response, elapsed)
	await db_set_result_response(run_tag, q_index, m_index, response, elapsed)

	if eval_answer is not None:
		evaluation = await run_in_threadpool(eval_client.do_eval, question, eval_answer, response)
		await ws_eval_completion(run_tag, q_index, m_index, evaluation)
		await db_set_result_evaluation(run_tag, q_index, m_index, evaluation)