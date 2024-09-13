import "./main.css";
import React from "react";
import Sidebar from "./sidebar/Sidebar";
import Topbar from "./topbar/Topbar";
import { useParams } from "react-router-dom";
import useRun from "../hooks/useRun";
import Feed from "./feed/Feed";

const ShowRun = () => {
    const { run_tag } = useParams();
    const { run } = useRun(run_tag);

    return (
        <div className="main">
            <Sidebar />
            <div className="run-display">
                {run && (
                    <>
                        <Topbar 
                            run_name={run.run_name} 
                            start_time={run.started_at} 
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
