from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
import anthropic
import httpx
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()
app.add_middleware(
    CORSMiddleware, 
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
	return {"message": "Hello World"}

async def generate_openai(prompt: str):
	client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

	response = await client.chat.completions.create(
		model="gpt-4o",
		messages=[
			{
				"role": "user",
				"content": prompt
			}
		]
	)
	return response.choices[0].message.content

async def generate_claude(prompt: str):
	client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
	
	response = await client.messages.create(
		model="claude-3-sonnet-20240229",
		max_tokens=100,
		temperature=0,
		messages=[
			{
				"role": "user",
				"content": prompt
			}
		]
	)
	return response.content[0].text

async def generate_local(prompt: str):
	async with httpx.AsyncClient() as client:
		response = await client.post(
			"http://127.0.0.1:8080/generate",
			json={"prompt": prompt}
		)
		return response.json()["generated_text"]