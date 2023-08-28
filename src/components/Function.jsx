function Function() {
	return (
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
				{descriptionVisible &&
					<p id="traditional-description" className="text-gray-500">
						{tierDescriptions[0]}
					</p>
				}
			</div>
		</div>
	)
}

export default Function;