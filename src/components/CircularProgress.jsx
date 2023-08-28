import React from 'react';
// import './CircularProgress.css'; // Make sure to include the appropriate CSS file

function getColor(progress) {
	const colors = [
		'red',
		'red-orange',
		'orange',
		'yellow-orange',
		'yellow',
		'yellow-green',
		'green',
	];

	const colorIndex = Math.floor(progress / 14.285771428571429);
	return colors[colorIndex];
}

function CircularProgress({ progress }) {
	const color = getColor(progress);

	// Calculate the circumference of the circle
	const circumference = 2 * Math.PI * 40;

	// Calculate the dash offset to start from the top (12 o'clock position)
	const dashOffset = 0; // Start from the top

	// Calculate the dash array based on progress
	const dashArray = `${(circumference * progress) / 100} ${circumference}`;

	const circleStyle = {
		stroke: color,
		strokeWidth: 8, // Adjust the border thickness here
		strokeDasharray: dashArray,
		strokeDashoffset: dashOffset,
		transform: 'rotate(-90deg)', // Rotate the circle to start from the top
		transformOrigin: 'center', // Set the rotation origin to the center
		 fill: 'white' // Set the circle background color to white
	};

	return (
		<svg className="circular-progress" width="100" height="100">
			<circle
				className="progress-circle"
				style={circleStyle}
				r="40"
				cx="50"
				cy="50"
			/>
			<text
				className="progress-text"
				x="50%"
				y="50%"
				textAnchor="middle"
				dy=".3em"
				fill="black"
				fontSize="14px"
				fontWeight="bold"
			>
				{Math.round(progress)}%
			</text>
		</svg>
	);
}

export default CircularProgress;
