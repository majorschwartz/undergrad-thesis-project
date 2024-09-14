import React, { useState, useEffect, useRef, useCallback } from "react";

const NameEntry = ({ run_name }) => {
	const [name, setName] = useState(run_name || "");
	const inputRef = useRef(null);
	
	const getTextWidth = useCallback((text) => {
		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d');
		context.font = getComputedStyle(inputRef.current).font;
		return context.measureText(text).width;
	}, []);
	
	const adjustInputWidth = useCallback((text) => {
		if (inputRef.current) {
			const textWidth = getTextWidth(text);
			inputRef.current.style.width = `${Math.max(100, textWidth + 20)}px`;
		}
	}, [getTextWidth]);

	useEffect(() => {
		if (run_name !== undefined) {
			setName(run_name);
			adjustInputWidth(run_name);
		}
	}, [run_name, adjustInputWidth]);



	const handleChange = (e) => {
		setName(e.target.value);
		adjustInputWidth(e.target.value);
	};

	const handleSave = () => {
		console.log(name);
	}

	return (
		<div className="name-entry">
			<input
				ref={inputRef}
				type="text"
				value={name}
				onChange={handleChange}
			/>
			<button onClick={handleSave}>
				<svg
					role="img"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 15 15"
					width="30px"
					height="30px"
				>
					<path
						fill="#000000"
						fillRule="evenodd"
						d="M11.467 3.727c.289.189.37.576.181.865l-4.25 6.5a.625.625 0 0 1-.944.12l-2.75-2.5a.625.625 0 0 1 .841-.925l2.208 2.007l3.849-5.886a.625.625 0 0 1 .865-.181"
						clipRule="evenodd"
					/>
				</svg>
			</button>
		</div>
	);
};

export default NameEntry;
