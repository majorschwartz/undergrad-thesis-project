import React, { useState, useEffect } from "react";

const NameEntry = ({ run_name }) => {
	const [name, setName] = useState(run_name || "");

	useEffect(() => {
		if (run_name !== undefined) {
			setName(run_name);
		}
	}, [run_name]);

	const handleChange = (e) => {
		setName(e.target.value);
		// You might want to add logic here to update the run_name in the parent component or database
	};

	return (
		<div className="name-entry">
			<input
				type="text"
				value={name}
				onChange={handleChange}
				placeholder="Enter run name"
			/>
		</div>
	);
}

export default NameEntry;