from fastapi import APIRouter, HTTPException
from fastapi.responses import Response
from database.dbget import db_get_run
import csv
from io import StringIO

router = APIRouter()

@router.get("/download/{run_id}")
async def download_results(run_id: str):
    run = await db_get_run(run_id)
    if run is None:
        raise HTTPException(status_code=404, detail="Run not found")

    csv_buffer = StringIO()
    csv_writer = csv.writer(csv_buffer)

    # Write header
    header = ["Question", "Model", "Response", "Time (s)", "Evaluation"]
    csv_writer.writerow(header)

    # Write data
    for question, result in zip(run["questions"], run["results"]):
        for model_index, response in enumerate(result["responses"]):
            row = [
                question["question"],
                run["models"][model_index],
                response["response"],
                response["time_elapsed"] / 1000,  # Convert to seconds
                response["evaluation"]
            ]
            csv_writer.writerow(row)

    return Response(
        content=csv_buffer.getvalue(),
        media_type="text/csv",
        headers={
            "Content-Disposition": f"attachment; filename=run_results.csv"
        }
    )
