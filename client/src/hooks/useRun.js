import { useState, useEffect, useRef } from "react";
import { getRun } from "utils/api";
import { useNavigate } from "react-router-dom";

const useRun = (run_tag) => {
	const socketEndpoint = process.env.REACT_APP_SOCKET_ENDPOINT;
	const [run, setRun] = useState(null);
	const socketRef = useRef(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchRun = async () => {
			try {
				const data = await getRun(run_tag);
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
				case "completion":
					console.log("Completion message received:", message.data);
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
	}, [run_tag, socketEndpoint, navigate]);

	return { run };
};

export default useRun;