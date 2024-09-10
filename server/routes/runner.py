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
	pass