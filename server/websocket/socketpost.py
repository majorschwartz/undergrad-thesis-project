from websocket.connection_manager import ws

async def ws_set_result_response(run_id, q_index, m_index, response, elapsed):
	data = {
		"run_id": run_id,
		"q_index": q_index,
		"m_index": m_index,
		"response": response,
		"elapsed": elapsed
	}
	await ws.broadcast(data=data, type="set_result_response")

async def ws_set_result_evaluation(run_id, q_index, m_index, evaluation):
	data = {
		"run_id": run_id,
		"q_index": q_index,
		"m_index": m_index,
		"evaluation": evaluation
	}
	await ws.broadcast(data=data, type="set_result_evaluation")

async def ws_set_result_status(run_id, q_index, m_index, status):
	data = {
		"run_id": run_id,
		"q_index": q_index,
		"m_index": m_index,
		"status": status
	}
	await ws.broadcast(data=data, type="set_result_status")

async def ws_set_run_finished(run_id, finished_time):
	data = {
		"run_id": run_id,
		"finished_time": finished_time
	}
	await ws.broadcast(data=data, type="set_run_finished")