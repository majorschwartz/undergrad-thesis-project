import { useState, useEffect, useRef } from "react";
import { getRun } from "utils/api";

const useRun = (run_tag) => {
	const socketEndpoint = process.env.REACT_APP_SOCKET_ENDPOINT;
	const [run, setRun] = useState(null);
	const socketRef = useRef(null);

	useEffect(() => {
		const fetchRun = async () => {
			const data = await getRun(run_tag);
			setRun(data);
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
	}, [run_tag, socketEndpoint]);

	return { run };
};

export default useRun;