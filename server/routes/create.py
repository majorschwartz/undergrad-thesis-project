import asyncio
import time
from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from services.runner import prompt_models
from database.dbpost import db_post_run
from database.dbget import db_get_run_count

router = APIRouter()

def get_run_name(models: list[str]) -> str:
	model_map = {
		"gpt-4o-mini": "GPT",
		"claude-3-sonnet-20240229": "Claude",
		"llama-3-1-8b": "Llama",
		"knowledge-graph": "KG",
	}
	return f"{'+'.join([model_map[model] for model in models])} Run"

class CreateRunRequest(BaseModel):
	models: list[str]
	prompts: list[str]
	eval_answers: list[str | None]
	context: str | None = None

@router.post("/create-run")
async def create_run(request: CreateRunRequest):
	new_run = {
		"running": True,
		"run_name": get_run_name(request.models),
		"context": request.context,
		"models": request.models,
		"started_at": int(time.time() * 1000),
		"finished_at": None,
		"questions": [],
		"results": [],
	}

	for i, question in enumerate(request.prompts):
		new_run["questions"].append({
			"question": question,
			"eval_answer": request.eval_answers[i],
		})
	
	for i, question in enumerate(new_run["questions"]):
		new_run["results"].append({
			"responses": [],
		})
	
		for _ in request.models:
			new_run["results"][i]["responses"].append({
				"status": "idle",
				"response": "",
				"evaluation": "pending" if question["eval_answer"] is not None else None,
				"time_elapsed": 0,
			})

	run_id = await db_post_run(new_run)

	asyncio.create_task(prompt_models(run_id, request.prompts, request.models, request.eval_answers, request.context))

	return JSONResponse(content={"run_id": run_id}, status_code=200)