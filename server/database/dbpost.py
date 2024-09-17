from database.database import runs_collection

async def db_post_run(run):
	inserted_run = await runs_collection.insert_one(run)
	return str(inserted_run.inserted_id)