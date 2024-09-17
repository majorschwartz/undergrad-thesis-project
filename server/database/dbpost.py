from database.database import runs_collection

async def db_post_run(run):
	inserted_run = await runs_collection.insert_one(run)
	return str(inserted_run.inserted_id)

async def db_delete_all_runs():
	result = await runs_collection.delete_many({})
	return result.deleted_count