import asyncio
import time
from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from services.runner import prompt_models
from database.dbpost import db_post_run
from database.dbget import db_get_run_count
from utils.helpers import convertObjectIds

router = APIRouter()

class CreateRunRequest(BaseModel):
	models: list[str]
	prompts: list[str]
	eval_answers: list[str | None]

@router.post("/create-run")
async def create_run(request: CreateRunRequest):
	new_run = {
		"running": True,
		"run_name": None,
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

	run_count = await db_get_run_count()
	new_run["run_name"] = f"Run #{run_count + 1}"

	run_id = await db_post_run(new_run)

	asyncio.create_task(prompt_models(run_id, request.prompts, request.models, request.eval_answers))

	return JSONResponse(content={"run_id": run_id}, status_code=200)