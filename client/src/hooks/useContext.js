import React, { useState } from "react";

const useContext = () => {
	const [models, setModels] = useState([])
	const [selectedModels, setSelectedModels] = useState([])

	useEffect(() => {
		fetchModels()
	}, [])

	const fetchModels = async () => {
		const response = await fetch('/api/models')
		const data = await response.json()
		setModels(data)
	}

	return { models, selectedModels, setSelectedModels }
}

export default useContext;