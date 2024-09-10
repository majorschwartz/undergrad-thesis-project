import os
from dotenv import load_dotenv

load_dotenv()

ORIGIN_ENDPOINT = os.getenv("ORIGIN_ENDPOINT")
SECRET_KEY = os.getenv("APP_SECRET_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

MONGO_URI = os.getenv("MONGO_URI")
MONGO_DB = os.getenv("MONGO_DB")
MONGO_URI_LOCAL = os.getenv("MONGO_URI_LOCAL")
MONGO_DB_LOCAL = os.getenv("MONGO_DB_LOCAL")

LOCAL = False