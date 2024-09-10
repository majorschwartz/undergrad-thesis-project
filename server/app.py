import random
from fastapi import (
    FastAPI,
    WebSocket,
    WebSocketDisconnect,
)
from fastapi.middleware.cors import CORSMiddleware
from routes import runner
from websocket.connection_manager import ws

app = FastAPI()

app.add_middleware(
    CORSMiddleware, 
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(runner.router)

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
	await ws.connect(websocket)

	try:
		while True:
			data = await websocket.receive_json()
			print("Received data:", data)
	except WebSocketDisconnect:
		ws.disconnect(websocket)

@app.get("/hello")
async def hello():
	return {"message": f"Hello World {random.randint(1, 1000)}"}