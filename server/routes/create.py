import asyncio
import datetime
from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from database.database import runs_collection
from services.runner import prompt_models

router = APIRouter()

class CreateRunRequest(BaseModel):
	models: list[str]
	prompts: list[str]
	eval_answers: list[str | None]

@router.post("/create-run")
async def create_run(request: CreateRunRequest):
	new_run = {
		"running": True,
		"started_at": datetime.datetime.now(datetime.UTC),
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
	
	for question in new_run["questions"]:
		new_run["results"].append({
			"responses": [],
		})
	
	for model in request.models:
		for result in new_run["results"]:
			result["responses"].append({
				"model": model,
				"response": "",
				"evaluation": None,
				"time_elapsed": 0,
			})

	run_count = await runs_collection.count_documents({})
	new_run["run_name"] = f"Run #{run_count + 1}"
	new_run["run_tag"] = run_count + 1

	await runs_collection.insert_one(new_run)

	asyncio.create_task(prompt_models(new_run["run_tag"], request.prompts, request.models, request.eval_answers))

	return JSONResponse(content={"run_tag": new_run["run_tag"]}, status_code=200)