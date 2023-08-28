import { useState, useEffect, useCallback } from "react";
import InputSlider from "react-input-slider";

function FormFieldset({
	traditional,
	advanced,
	optimal,
	functionType,
	tierDescriptions,
	onTotalPointsUpdate,
	typeIcon,
}) {
	const [sliderValue, setSliderValue] = useState(0);
	const [totalPoints, setTotalPoints] = useState(0);

	const memoizedOnTotalPointsUpdate = useCallback(onTotalPointsUpdate, []);

	useEffect(() => {
		const calculatedTotalPoints = Math.floor(sliderValue / 100 * 3) + 1;
		setTotalPoints(calculatedTotalPoints);
		memoizedOnTotalPointsUpdate(calculatedTotalPoints);
	}, [sliderValue, memoizedOnTotalPointsUpdate]);

	return (
		<fieldset className="mt-4 border-b border-gray-200">
			<div className="flex justify-start">
				<div className="flex">
					<legend className="text-base font-semibold leading-6 text-gray-900">
						{functionType}
					</legend>
				</div>
				<div>
					<span>
						<button onClick={() => setDescriptionVisible(!descriptionVisible)}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="ml-3 w-6 h-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
								/>
							</svg>
						</button>
					</span>
				</div>
			</div>
			<div className="space-y-5">
				<div className="relative">
					<InputSlider
						axis="x"
						x={sliderValue}
						xmax={100}
						xstep={14.285}
						onChange={({ x }) => setSliderValue(x)}
						styles={{
							track: {
								backgroundColor: "lightgray",
								height: "4px",
								width: "100%", // Stretch the slider to the full width
							},
							active: {
								backgroundColor: "lightblue",
							},
							thumb: {
								width: "20px",
								height: "20px",
								backgroundColor: "lightblue",
								border: "none",
							},
						}}
					/>
					<div className=" mt-3 flex justify-between">
						<div>{traditional}</div>
						<div>{advanced}</div>
						<div>{optimal}</div>
					</div>
				</div>
				{/* Description and other code here */}
			</div>
		</fieldset>
	);
}

export default FormFieldset;

