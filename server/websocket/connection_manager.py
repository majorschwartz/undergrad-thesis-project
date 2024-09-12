from fastapi import WebSocket

class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
        await websocket.send_json({"data": "Connected", "type": "connection"})

    async def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            try:
                await websocket.close()
            except:
                pass
            self.active_connections.remove(websocket)

    async def send(self, websocket: WebSocket, data: dict, type: str):
        if websocket in self.active_connections:
            message = {"data": data, "type": type}
            await websocket.send_json(message)

ws = ConnectionManager()