import "./main.css";
import React, { useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import Topbar from "./topbar/Topbar";
import { useParams } from "react-router-dom";
import useRun from "../hooks/useRun";
import Feed from "./feed/Feed";

const ShowRun = () => {
    const { run_tag } = useParams();
    const [triggerRefetch, setTriggerRefetch] = useState(0);
    const { run, setRunName } = useRun(run_tag);

    const handleSetRunName = async (newName) => {
        await setRunName(newName);
        setTriggerRefetch(prev => prev + 1);
    };

    return (
        <div className="main">
            <Sidebar triggerRefetch={triggerRefetch} />
            <div className="run-display">
                {run && (
                    <>
                        <Topbar
                            run_name={run.run_name}
                            setRunName={handleSetRunName}
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
