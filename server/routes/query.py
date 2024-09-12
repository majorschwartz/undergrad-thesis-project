from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from database.database import runs_collection
from utils.helpers import convertObjectIds

router = APIRouter()

# Get a run by run_tag
@router.get("/run/{run_tag}")
async def get_run(run_tag: int):
	run = await runs_collection.find_one({"run_tag": run_tag})
	if run is None:
		raise HTTPException(status_code=404, detail="Run not found")
	run = await convertObjectIds(run)
	return JSONResponse(content=run, status_code=200)

# Get all the runs tags and names
@router.get("/runs")
async def get_runs():
	runs = await runs_collection.find({}, {"run_tag": 1, "run_name": 1}).to_list(length=100)
	if runs is None:
		raise HTTPException(status_code=404, detail="No runs found")
	runs = await convertObjectIds(runs)
	return JSONResponse(content=runs, status_code=200)