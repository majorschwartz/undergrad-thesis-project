from fastapi import APIRouter
from fastapi.responses import JSONResponse
from database.dbupdate import db_set_run_name
from database.dbpost import db_delete_all_runs
from pydantic import BaseModel

router = APIRouter()

class EditRunNameRequest(BaseModel):
    run_id: str
    new_name: str

@router.put("/edit-run-name")
async def edit_run_name(request: EditRunNameRequest):
    await db_set_run_name(request.run_id, request.new_name)
    return JSONResponse(content={"message": "Run name updated"}, status_code=200)

@router.delete("/delete-all-runs")
async def delete_all_runs():
    await db_delete_all_runs()
    return JSONResponse(content={"message": "All runs deleted"}, status_code=200)