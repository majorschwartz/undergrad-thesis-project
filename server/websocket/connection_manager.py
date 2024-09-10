from fastapi import WebSocket

class ConnectionManager:
    def __init__(self):
        self.active_connections: dict[str, WebSocket] = {}

    async def connect(self, websocket: WebSocket, user_id: str):
        await self.disconnect(user_id)
        await websocket.accept()
        self.active_connections[user_id] = websocket
        await websocket.send_json({"data": "Connected", "type": "connection"})

    async def disconnect(self, user_id: str):
        if user_id in self.active_connections:
            try:
                await self.active_connections[user_id].close()
            except:
                pass
            del self.active_connections[user_id]

    async def send(self, user_id: str, data: dict, type: str):
        if user_id in self.active_connections:
            message = {"data": data, "type": type}
            await self.active_connections[user_id].send_json(message)

ws = ConnectionManager()