from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel

router = APIRouter()

class CreateRunRequest(BaseModel):
	models: list[str]
	prompts: list[str]
	eval_answers: list[str]

@router.post("/create-run")
async def create_run(request: CreateRunRequest):
	print(request.models)
	print(request.prompts)
	print(request.eval_answers)
	return JSONResponse(status_code=200, content={"message": "Run created successfully"})