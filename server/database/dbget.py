from database.database import runs_collection

async def db_get_run(run_tag):
	return await runs_collection.find_one({"run_tag": run_tag})

async def db_get_runs():
	return await runs_collection.find({}).to_list(length=100)

async def db_get_run_count():
	return await runs_collection.count_documents({})