import React from "react";
import "./feed.css";

const Feed = ({ modelState, fileData }) => {
	return (
		<pre className="feed">
			{/* {modelState.map((state, index) => (
				<Results key={index} state={state} />
			))} */}
			{fileData}
		</pre>
	);
}

export default Feed;