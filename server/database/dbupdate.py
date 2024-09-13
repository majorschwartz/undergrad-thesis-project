from database.database import runs_collection

# Result Updates

async def db_set_result_status(run_tag: int, q_index: int, m_index: int, status: str):
	await runs_collection.update_one(
		{"run_tag": run_tag},
		{
			"$set": {
				f"results.{q_index}.responses.{m_index}.status": status,
			}
		}
	)

async def db_set_result_response(run_tag: int, q_index: int, m_index: int, response: str, elapsed: int):
	await runs_collection.update_one(
		{"run_tag": run_tag},
		{
			"$set": {
				f"results.{q_index}.responses.{m_index}.status": "complete",
				f"results.{q_index}.responses.{m_index}.response": response,
				f"results.{q_index}.responses.{m_index}.time_elapsed": elapsed,
			}
		}
	)

async def db_set_result_evaluation(run_tag: int, q_index: int, m_index: int, evaluation: str):
	await runs_collection.update_one(
		{"run_tag": run_tag},
		{
			"$set": {
				f"results.{q_index}.responses.{m_index}.evaluation": evaluation,
			}
		}
	)

# Main Run Updates

async def db_set_run_finished(run_tag: int, finished_time: int):
	await runs_collection.update_one(
		{"run_tag": run_tag},
		{
			"$set": {
				"running": False,
				"finished_at": finished_time,
			}
		}
	)