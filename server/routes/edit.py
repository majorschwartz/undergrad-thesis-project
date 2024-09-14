from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from database.dbupdate import db_set_run_name
from pydantic import BaseModel

router = APIRouter()

class EditRunNameRequest(BaseModel):
    run_tag: int
    new_name: str

@router.put("/edit-run-name")
async def edit_run_name(request: EditRunNameRequest):
    await db_set_run_name(request.run_tag, request.new_name)
    return JSONResponse(content={"message": "Run name updated"}, status_code=200)
