import asyncio
import time
from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from services.runner import prompt_models
from database.dbpost import db_post_run
from database.dbget import db_get_run_count

router = APIRouter()

class CreateRunRequest(BaseModel):
	models: list[str]
	prompts: list[str]
	eval_answers: list[str | None]

@router.post("/create-run")
async def create_run(request: CreateRunRequest):
	new_run = {
		"running": True,
		"started_at": int(time.time() * 1000),
		"finished_at": None,
		"models": request.models,
		"run_name": None,
		"run_tag": None,
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

	run_count = await db_get_run_count()
	new_run["run_name"] = f"Run #{run_count + 1}"
	new_run["run_tag"] = run_count + 1

	await db_post_run(new_run)

	asyncio.create_task(prompt_models(new_run["run_tag"], request.prompts, request.models, request.eval_answers))

	return JSONResponse(content={"run_tag": new_run["run_tag"]}, status_code=200)