import asyncio
import datetime
from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel

router = APIRouter()

class CreateRunRequest(BaseModel):
	models: list[str]
	prompts: list[str]
	eval_answers: list[str | None]

@router.post("/create-run")
async def create_run(request: CreateRunRequest):
	print(request.models)
	print(request.prompts)
	print(request.eval_answers)

	new_run = {
		"running": True,
		"ran_at": datetime.datetime.now(datetime.UTC),
		"models": request.models,
		"job_name": "Run #...",
		"questions": [],
		"results": [],
	}

	for i, question in enumerate(request.prompts):
		new_run["questions"].append({
			"question": question,
			"answer": request.eval_answers[i],
		})
	
	print(new_run)

	# Simulate a long running process
	await asyncio.sleep(5)
	return JSONResponse(status_code=200, content={"message": "Run created successfully"})