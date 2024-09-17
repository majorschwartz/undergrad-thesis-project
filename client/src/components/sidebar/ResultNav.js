import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRuns } from "utils/api";

const ResultNav = ({ triggerRefetch }) => {
    const { run_id } = useParams();
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
    }, [triggerRefetch]);

    if (isLoading) return <div className="run-list"></div>;
    if (error) return <div className="run-list">{error}</div>;

    return (
        <div className="run-list">
            {runs.length > 0 ? (
                runs.map((run) => (
                    <button
                        key={run._id}
                        onClick={() => {
                            navigate(`/run/${run._id}`);
                        }}
                        className={`sidebar-btn run-nav-button${
                            run._id.toString() === run_id ? ' active' : ' not-active'
                        }`}
                        title={run.run_name}
                    >
                        <span className="run-name">{run.run_name}</span>
                    </button>
                ))
            ) : (
                <div>No runs available</div>
            )}
        </div>
    );
};

export default ResultNav;
