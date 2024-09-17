from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from database.dbget import db_get_run, db_get_runs
from utils.helpers import convertObjectIds

router = APIRouter()

# Get a run by run_tag
@router.get("/run/{run_id}")
async def get_run(run_id: str):
	run = await db_get_run(run_id)
	if run is None:
		raise HTTPException(status_code=404, detail="Run not found")
	run = await convertObjectIds(run)
	return JSONResponse(content=run, status_code=200)

# Get all the runs tags and names
@router.get("/runs")
async def get_runs():
	runs = await db_get_runs()
	if runs is None:
		raise HTTPException(status_code=404, detail="No runs found")
	runs = await convertObjectIds(runs)
	return JSONResponse(content=runs, status_code=200)