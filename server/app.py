import random
from fastapi import (
    FastAPI,
    WebSocket,
    WebSocketDisconnect,
)
from fastapi.middleware.cors import CORSMiddleware
from routes import create
from routes import query
from routes import edit
from routes import download
from websocket.connection_manager import ws
from config import ORIGIN_ENDPOINT

app = FastAPI()

app.add_middleware(
    CORSMiddleware, 
    allow_origins=[ORIGIN_ENDPOINT],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(create.router)
app.include_router(query.router)
app.include_router(edit.router)
app.include_router(download.router)

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
	await ws.connect(websocket)
	try:
		while True:
			data = await websocket.receive_json()
			print("Received data:", data)
	except WebSocketDisconnect:
		pass
	finally:
		print("Disconnecting websocket")
		await ws.disconnect(websocket)

@app.get("/hello")
async def hello():
	return {"message": f"Hello World {random.randint(1, 1000)}"}

if __name__ == "__main__":
	import uvicorn
	uvicorn.run(app, host="0.0.0.0", port=5000)