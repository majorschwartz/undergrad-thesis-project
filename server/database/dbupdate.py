from database.database import runs_collection
from bson import ObjectId

# Result Updates

async def db_set_result_status(run_id: str, q_index: int, m_index: int, status: str):
	await runs_collection.update_one(
		{"_id": ObjectId(run_id)},
		{
			"$set": {
				f"results.{q_index}.responses.{m_index}.status": status,
			}
		}
	)

async def db_set_result_response(run_id: str, q_index: int, m_index: int, response: str, elapsed: int):
	await runs_collection.update_one(
		{"_id": ObjectId(run_id)},
		{
			"$set": {
				f"results.{q_index}.responses.{m_index}.status": "complete",
				f"results.{q_index}.responses.{m_index}.response": response,
				f"results.{q_index}.responses.{m_index}.time_elapsed": elapsed,
			}
		}
	)

async def db_set_result_evaluation(run_id: str, q_index: int, m_index: int, evaluation: str):
	await runs_collection.update_one(
		{"_id": ObjectId(run_id)},
		{
			"$set": {
				f"results.{q_index}.responses.{m_index}.evaluation": evaluation,
			}
		}
	)

# Main Run Updates

async def db_set_run_finished(run_id: str, finished_time: int):
	await runs_collection.update_one(
		{"_id": ObjectId(run_id)},
		{
			"$set": {
				"running": False,
				"finished_at": finished_time,
			}
		}
	)

# Run Name Updates

async def db_set_run_name(run_id: str, name: str):
	await runs_collection.update_one(
		{"_id": ObjectId(run_id)},
		{
			"$set": {"run_name": name}
		}
	)