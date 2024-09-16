from services.gen_endpoints.oai import openai_thread_client
from services.gen_endpoints.claude import claude_thread_client
from services.gen_endpoints.local import llama_thread_client
from services.evaluate import eval_client
from websocket.socketpost import (
    ws_set_result_response,
    ws_set_result_evaluation,
    ws_set_run_finished,
    ws_set_result_status,
)
from database.dbupdate import (
    db_set_result_response,
    db_set_result_evaluation,
    db_set_run_finished,
    db_set_result_status,
)
from starlette.concurrency import run_in_threadpool
import asyncio
import time


async def prompt_models(run_tag, prompts, models, eval_answers):
    await asyncio.sleep(1)
    for q_index in range(len(prompts)):
        tasks = []
        for m_index in range(len(models)):
            question = prompts[q_index]
            model = models[m_index]
            eval_answer = eval_answers[q_index]
            task = asyncio.create_task(
                prompt_and_post(model, question, eval_answer, q_index, m_index, run_tag)
            )
            tasks.append(task)
        await asyncio.gather(*tasks)
        print(
            f"\nAll tasks completed for question {q_index+1} of {len(prompts)} questions in run {run_tag}\n"
        )
    print(f"All questions completed for run {run_tag}\n")
    await ws_set_run_finished(run_tag, int(time.time() * 1000))
    await db_set_run_finished(run_tag, int(time.time() * 1000))


async def prompt_and_post(model, question, eval_answer, q_index, m_index, run_tag):
    await ws_set_result_status(run_tag, q_index, m_index, "in_progress")
    await db_set_result_status(run_tag, q_index, m_index, "in_progress")

    elapsed = int(time.time() * 1000)
    if model == "claude-3-sonnet-20240229":
        response = await run_in_threadpool(
            claude_thread_client.do_chat_completion, question
        )
    elif model == "gpt-4o":
        response = await run_in_threadpool(
            openai_thread_client.do_chat_completion, question
        )
    # TODO: Implement Llama 3.1 and Knowledge Graph
    elif model == "llama-3-1-8b":
        response = await llama_thread_client.do_chat_completion(question)
    elif model == "knowledge-graph":
        # response = await run_in_threadpool(knowledge_graph_client.do_chat_completion, question)
        print("\nKnowledge Graph not implemented yet\n")
        response = "Not implemented yet"
    else:
        raise ValueError(f"Invalid model: {model}")

    elapsed = int(time.time() * 1000) - elapsed

    await ws_set_result_response(run_tag, q_index, m_index, response, elapsed)
    await db_set_result_response(run_tag, q_index, m_index, response, elapsed)

    if eval_answer is not None:
        evaluation = await run_in_threadpool(
            eval_client.do_eval, question, eval_answer, response
        )
        await ws_set_result_evaluation(run_tag, q_index, m_index, evaluation)
        await db_set_result_evaluation(run_tag, q_index, m_index, evaluation)
