import "./main.css";
import React, { useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import Topbar from "./topbar/Topbar";
import { useParams } from "react-router-dom";
import useRun from "../hooks/useRun";
import Feed from "./feed/Feed";

const ShowRun = () => {
    const { run_id } = useParams();
    const [triggerRefetch, setTriggerRefetch] = useState(0);
    const { run, setRunName } = useRun(run_id);

    const handleSetRunName = async (newName) => {
        await setRunName(newName);
        handleTriggerRefetch();
    };

    const handleTriggerRefetch = () => {
        setTriggerRefetch(prev => prev + 1);
    };

    return (
        <div className="main">
            <Sidebar triggerRefetch={triggerRefetch} handleTriggerRefetch={handleTriggerRefetch} />
            <div className="run-display">
                {run && (
                    <>
                        <Topbar
                            run_name={run.run_name}
                            setRunName={handleSetRunName}
                            run_id={run_id}
                            start_time={run.started_at}
                            end_time={run.finished_at}
                            running={run.running}
                            selectedModels={run.models || []}
                        />
                        <Feed run={run} />
                    </>
                )}
            </div>
        </div>
    );
};

export default ShowRun;
