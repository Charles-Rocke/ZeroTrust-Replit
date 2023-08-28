import React, { useState, useEffect, useCallback } from "react";

function FormFieldset({
	traditional,
	advanced,
	optimal,
	functionType,
	tierDescriptions,
	onTotalPointsUpdate,
	typeIcon,
}) {
	// traditional select state
	const [traditionalSelected, setTraditionalSelected] = useState(false);
	// advanced select state
	const [advancedSelected, setAdvancedSelected] = useState(false);
	// optimal select state
	const [optimalSelected, setOptimalSelected] = useState(false);
	// track total points state
	const [totalPoints, setTotalPoints] = useState(0);

	// Create a memoized version of the onTotalPointsUpdate function using useCallback
	const memoizedOnTotalPointsUpdate = useCallback(onTotalPointsUpdate, []);

	// toggle description visibility
	const [descriptionVisible, setDescriptionVisible] = useState(false);

	// function to handle description visiblity
	function handleDescriptionVisibility() {
		setDescriptionVisible(!descriptionVisible)
	}


	// Function to handle selection of tiers
	function handleTierSelection(tierName) {
		// If traditional tier is chosen
		if (tierName === "traditional") {
			setTraditionalSelected(!traditionalSelected);

			// If Advanced is selected, also select Traditional
			if (advancedSelected) {
				setAdvancedSelected(false);
			}
		}
		// If advanced tier is chosen
		else if (tierName === "advanced") {
			// If Traditional is not selected, select both Advanced and Traditional
			if (!traditionalSelected) {
				setAdvancedSelected(true);
				setTraditionalSelected(true);
			} else {
				// If Traditional is already selected, toggle Advanced only
				setAdvancedSelected(!advancedSelected);
			}

			// If Optimal is selected, also select Traditional and Advanced
			if (optimalSelected) {
				setOptimalSelected(false);
				setTraditionalSelected(true);
				setAdvancedSelected(true);
			}
		}
		// If optimal tier is chosen
		else if (tierName === "optimal") {
			setOptimalSelected(!optimalSelected);

			// Select all three options
			setTraditionalSelected(true);
			setAdvancedSelected(true);
		}
	}

	// Set up an effect to run after the component renders
	useEffect(() => {
		// Calculate the total points based on selected options
		const calculatedTotalPoints =
			(traditionalSelected ? 1 : 0) +
			(advancedSelected ? 2 : 0) +
			(optimalSelected ? 3 : 0);

		// Update the state with the calculated total points
		setTotalPoints(calculatedTotalPoints);

		// Call the memoized version of onTotalPointsUpdate with the calculated total points
		memoizedOnTotalPointsUpdate(calculatedTotalPoints);
	}, [
		traditionalSelected,
		advancedSelected,
		optimalSelected,
		memoizedOnTotalPointsUpdate,
	]);

	return (
		<fieldset className="mt-4 border-b border-gray-200">
			{/* Function Type */}
			<div className="flex justify-start">
				<div className="flex">
					{/* Function type label */}
					<legend className="text-base font-semibold leading-6 text-gray-900">
						{functionType}
					</legend>
				</div>
				<div>
					<span>
						<button onClick={() => setDescriptionVisible(!descriptionVisible)}>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-3 w-6 h-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
							</svg>
						</button>
					</span>
				</div>
			</div>
			{/* Checkbox form Start */}
			<div className="space-y-5">
				<div className="relative flex items-start">
					<div className="flex h-6 items-center">
						{/* Traditional select */}
						<input
							id="traditional"
							aria-describedby="traditional-description"
							name="traditional"
							type="checkbox"
							className="h-4 w-4 checked:bg-indigo-600 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
							checked={traditionalSelected}
							onChange={() => handleTierSelection("traditional")}
						/>
					</div>
					{/* Label */}
					<div className="ml-3 text-sm leading-6">
						<label htmlFor="traditional" className="font-medium text-gray-900">
							{traditional}
						</label>
						{/* Traditional description */}
						{/* if user selects to display description */}
						<p id="traditional-description" className="text-gray-500">
							{tierDescriptions[0]}
						</p>
					</div>
				</div>
				<div className="relative flex items-start">
					<div className="flex h-6 items-center">
						{/* Advanced select */}
						<input
							id="advanced"
							aria-describedby="advanced-description"
							name="advanced"
							type="checkbox"
							className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
							checked={advancedSelected}
							onChange={() => handleTierSelection("advanced")}
						/>
					</div>
					{/* label */}
					<div className="ml-3 text-sm leading-6">
						<label htmlFor="advanced" className="font-medium text-gray-900">
							{advanced}
						</label>

						{/* Advanced description */}
						{/* if user selects to display description */}
						<p id="advanced-description" className="text-gray-500">
							{tierDescriptions[1]}
						</p>
					</div>
				</div>
				<div className="relative flex items-start">
					<div className="flex h-6 items-center">
						{/* Optimal select */}
						<input
							id="optimal"
							aria-describedby="optimal-description"
							name="optimal"
							type="checkbox"
							className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
							checked={optimalSelected}
							onChange={() => handleTierSelection("optimal")}
						/>
					</div>
					{/* Label */}
					<div className="ml-3 text-sm leading-6">
						<label htmlFor="optimal" className="font-medium text-gray-900">
							{optimal}
						</label>

						{/* Optimal description */}
						{/* if user selects to display description */}
						<p id="optimal-description" className="text-gray-500">
							{tierDescriptions[2]}
						</p>
					</div>
				</div>
			</div>
			<p className="hidden">Total Points: {totalPoints}</p>
		</fieldset >
	);
}

export default FormFieldset;