import React from "react";
import { useNavigate } from "react-router-dom";

const StartNew = () => {
    const navigate = useNavigate();

    const handleNewRun = () => {
        navigate("/");
    };
    return (
        <div className="sidebar-header">
            <button onClick={handleNewRun} className="sidebar-btn new-run-btn">
                + New Run
            </button>
        </div>
    );
};

export default StartNew;
