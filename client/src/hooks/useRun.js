import { useState, useEffect, useRef } from "react";
import { getRun, editRunName } from "utils/api";
import { useNavigate } from "react-router-dom";

const useRun = (run_id) => {
	const socketEndpoint = process.env.REACT_APP_SOCKET_ENDPOINT;
	const [run, setRun] = useState(null);
	const socketRef = useRef(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchRun = async () => {
			try {
				const data = await getRun(run_id);
				if (data.detail === "Run not found") {
					throw new Error("Run not found");
				}
				setRun(data);
			} catch (error) {
				console.error("Failed to fetch run:", error);
				navigate("/");
			}
		};

		fetchRun();

		const socket = new WebSocket(`${socketEndpoint}/ws`);
		socketRef.current = socket;

		socket.onopen = () => {
			console.log("WebSocket connection opened");
		};

		socket.onmessage = (event) => {
			const message = JSON.parse(event.data);
			switch (message.type) {
				case "connection":
					console.log("Connection message received:", message.data);
					break;
				case "set_result_response":
					setRun((prevRun) => {
						if (!prevRun) return prevRun;
						const { q_index, m_index, response, elapsed } =
							message.data;
						const updatedResults = prevRun.results.map(
							(result, qIdx) => {
								if (qIdx !== q_index) return result;
								const updatedResponses = result.responses.map(
									(resp, mIdx) => {
										if (mIdx !== m_index) return resp;
										return {
											...resp,
											status: "complete",
											response,
											time_elapsed: elapsed,
										};
									}
								);
								return {
									...result,
									responses: updatedResponses,
								};
							}
						);
						return { ...prevRun, results: updatedResults };
					});
					break;
				case "set_result_evaluation":
					setRun((prevRun) => {
						if (!prevRun) return prevRun;
						const { q_index, m_index, evaluation } = message.data;
						const updatedResults = prevRun.results.map(
							(result, qIdx) => {
								if (qIdx !== q_index) return result;
								const updatedResponses = result.responses.map(
									(resp, mIdx) => {
										if (mIdx !== m_index) return resp;
										return {
											...resp,
											evaluation,
										};
									}
								);
								return {
									...result,
									responses: updatedResponses,
								};
							}
						);
						return { ...prevRun, results: updatedResults };
					});
					break;
				case "set_result_status":
					setRun((prevRun) => {
						if (!prevRun) return prevRun;
						const { q_index, m_index, status } = message.data;
						const updatedResults = prevRun.results.map(
							(result, qIdx) => {
								if (qIdx !== q_index) return result;
								const updatedResponses = result.responses.map(
									(resp, mIdx) => {
										if (mIdx !== m_index) return resp;
										return {
											...resp,
											status,
										};
									}
								);
								return {
									...result,
									responses: updatedResponses,
								};
							}
						);
						return { ...prevRun, results: updatedResults };
					});
					break;
				case "set_run_finished":
					setRun((prevRun) => {
						if (!prevRun) return prevRun;
						return {
							...prevRun,
							running: false,
							finished_at: message.data.finished_time,
						};
					});
					break;
				default:
					console.log("Unknown message type:", message.type);
					break;
			}
		};

		socket.onclose = () => {
			console.log("WebSocket connection closed");
			socketRef.current = null;
		};

		socket.onerror = (error) => {
			console.error("WebSocket error:", error);
		};

		return () => {
			if (socketRef.current) {
				socketRef.current.close();
				socketRef.current = null;
			}
		};
	}, [run_id, socketEndpoint, navigate]);

	const setRunName = async (new_name) => {
		if (run) {
			try {
				await editRunName(run._id, new_name);
				setRun((prevRun) => ({ ...prevRun, run_name: new_name }));
			} catch (error) {
				console.error("Failed to update run name:", error);
			}
		}
	};

	return { run, setRunName };
};

export default useRun;
