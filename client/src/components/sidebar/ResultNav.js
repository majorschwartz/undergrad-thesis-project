import React, { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { getRuns } from "utils/api";

const ResultNav = () => {
    const { run_tag } = useParams();
    const [runs, setRuns] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRuns = async () => {
            try {
                setIsLoading(true);
                const fetchedRuns = await getRuns();
                setRuns(Array.isArray(fetchedRuns) ? fetchedRuns : []);
            } catch (err) {
                setError("Failed to fetch runs");
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchRuns();
    }, []);

    if (isLoading) return <div></div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="run-list">
            {runs.length > 0 ? (
                runs.map((run) => (
                    <button
                        key={run.run_tag}
                        onClick={() => {
                            navigate(`/run/${run.run_tag}`);
                        }}
                        className={`sidebar-btn run-nav-button${
                            parseInt(run.run_tag) === parseInt(run_tag) ? ' active' : ''
                        }`}
                    >
                        {run.run_name}
                    </button>
                ))
            ) : (
                <div>No runs available</div>
            )}
        </div>
    );
};

export default ResultNav;
