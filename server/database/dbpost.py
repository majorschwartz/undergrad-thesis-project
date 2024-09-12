from database.database import runs_collection

async def db_post_run(run):
	await runs_collection.insert_one(run)