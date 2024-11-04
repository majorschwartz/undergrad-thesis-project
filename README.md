# Thesis Application

A real-time cybersecurity evaluation platform that leverages multiple Large Language Models (LLMs) for comparative analysis and assessment.

## Features

- **Multi-Model Support**: Simultaneous evaluation using GPT-4, Claude 3.5 Sonnet, Llama 3.1, and Knowledge Graph
- **Real-time Updates**: WebSocket integration for live result streaming
- **Context Integration**: Support for PDF, DOCX, and TXT context files
- **CSV Import**: Easy question and answer import via CSV files
- **Result Export**: Download results in CSV format for further analysis
- **Interactive UI**: Real-time progress tracking and result visualization

## Architecture

### Frontend (React)
- Component-based UI architecture
- Real-time WebSocket connection
- Responsive design with modular components
- State management using React hooks

### Backend (FastAPI)
- Asynchronous API endpoints
- WebSocket server for real-time updates
- Multiple LLM integrations
- MongoDB integration for data persistence

## Setup

### Prerequisites
- Python 3.8+
- Node.js 14+
- MongoDB
- API keys for OpenAI and Anthropic

### Backend Setup
```bash
cd server
pip install -r requirements.txt
```

Create a `.env` file in the server directory:

```bash
ORIGIN_ENDPOINT=http://localhost:3000
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
MONGO_URI=your_mongo_uri
MONGO_DB=your_db_name
```

### Frontend Setup
```bash
cd client
npm install
```


Create a `.env` file in the client directory:

```bash
REACT_APP_API_ENDPOINT=http://localhost:5000
REACT_APP_SOCKET_ENDPOINT=ws://localhost:5000
```

### Running the Application
```bash
cd server
python app.py
```
```bash
cd client
npm start
```

The application will be available at `http://localhost:3000`

## Usage

1. Upload a CSV file containing questions and answers
2. (Optional) Upload context files in PDF, DOCX, or TXT format
3. Select desired LLM models for evaluation
4. Create a new run and monitor results in real-time
5. Download results in CSV format when complete
