from database.database import runs_collection
from bson import ObjectId

async def db_get_run(run_id):
	return await runs_collection.find_one({"_id": ObjectId(run_id)})

async def db_get_runs():
	return await runs_collection.find({}, {"_id": 1, "run_name": 1}).to_list(length=100)

async def db_get_run_count():
	return await runs_collection.count_documents({})