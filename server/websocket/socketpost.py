from websocket.connection_manager import ws

async def ws_set_result_response(run_tag, q_index, m_index, response, elapsed):
	data = {
		"run_tag": run_tag,
		"q_index": q_index,
		"m_index": m_index,
		"response": response,
		"elapsed": elapsed
	}
	print("Broadcasting ws_set_result_response:", data)
	await ws.broadcast(data=data, type="set_result_response")

async def ws_set_result_evaluation(run_tag, q_index, m_index, evaluation):
	data = {
		"run_tag": run_tag,
		"q_index": q_index,
		"m_index": m_index,
		"evaluation": evaluation
	}
	print("Broadcasting ws_set_result_evaluation:", data)
	await ws.broadcast(data=data, type="set_result_evaluation")

async def ws_set_result_status(run_tag, q_index, m_index, status):
	data = {
		"run_tag": run_tag,
		"q_index": q_index,
		"m_index": m_index,
		"status": status
	}
	print("Broadcasting ws_set_result_status:", data)
	await ws.broadcast(data=data, type="set_result_status")

async def ws_set_run_finished(run_tag, finished_time):
	data = {
		"run_tag": run_tag,
		"finished_time": finished_time
	}
	print("Broadcasting ws_set_run_finished:", data)
	await ws.broadcast(data=data, type="set_run_finished")