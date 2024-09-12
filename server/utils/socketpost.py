from websocket.connection_manager import ws

async def ws_gen_completion(run_tag, q_index, m_index, response, elapsed):
	data = {
		"run_tag": run_tag,
		"q_index": q_index,
		"m_index": m_index,
		"response": response,
		"elapsed": elapsed
	}
	print("Broadcasting gen_completion:", data)
	await ws.broadcast(data=data, type="gen_completion")

async def ws_eval_completion(run_tag, q_index, m_index, evaluation):
	data = {
		"run_tag": run_tag,
		"q_index": q_index,
		"m_index": m_index,
		"evaluation": evaluation
	}
	print("Broadcasting eval_completion:", data)
	await ws.broadcast(data=data, type="eval_completion")