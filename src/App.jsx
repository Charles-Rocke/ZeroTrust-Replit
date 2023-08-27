import { useState, useEffect } from "react";
import Example from "./components/Example";
import Pillar from "./components/Pillar";
import { FingerPrintIcon, CircleStackIcon, ChartBarIcon, ArrowTrendingUpIcon, ArrowPathIcon, BuildingLibraryIcon } from '@heroicons/react/24/outline';

const ZeroTrust = [
	{
		// Define the pillar name
		pillar: "Identity",
		functions: {
			// Define tiers of function
			tiers: ["Traditional", "Advanced", "Optimal"],
			types: [
				// Define different identity-related types and their descriptions
				{
					typeName: "Authentication",
					typeIcon: FingerPrintIcon,
					tierDescriptions: [
						// Descriptions for different tiers
						"Agency authenticates identity using either passwords or multi-factor authentication(MFA)",
						"Agency authenticates identity using MFA",
						"Agency continuously validates identity, not just when access is initially granted",
					],
				},
				{
					typeName: "Identity Stores",
					typeIcon: CircleStackIcon,
					tierDescriptions: [
						"Agency only uses on-premises identity providers",
						"Agency federates some identity with cloud and on premises systems",
						"Agency has global identity awareness across cloud and on-premises environments.",
					],
				},
				{
					typeName: "Risk Assesment",
					typeIcon: ChartBarIcon,
					tierDescriptions: [
						"Agency makes limited determinations for identity risk.",
						"Agency determines identity risk based on simple analytics and static rules.",
						"Agency analyzes user behavior in real time with machine learing algorithms to determine risk and deliver ongoing protection.",
					],
				},
				{
					typeName: "Visibility and Analytics Capability",
					typeIcon: ArrowTrendingUpIcon,
					tierDescriptions: [
						"Agency segments user activity visibility with basic and static attributes.",
						"Agency aggregates user activity visibility with basic attributes and then analyzes and reports for manual refinement.",
						"Agency centralizes user visibility and with high fidelity attributes and user and entity behavior analytics (UEBA).",
					],
				},
				{
					typeName: "Automation and Orchestration Capability",
					typeIcon: ArrowPathIcon,
					tierDescriptions: [
						"Agency manually adminsters and orchestrates (replicates) identity and credentials",
						"Agency uses basic automated orchestration to federate identity and permit administration across identity stores",
						"Agency fully orchestrates the identity lifecycle. Dynamic user profiling, dynamic identity and group membership, just-in-time and just-enough access controls are implemented",
					],
				},
				{
					typeName: "Governance Capability",
					typeIcon: BuildingLibraryIcon,
					tierDescriptions: [
						"Agency manually audits identities and permissions after initial provisioning using static technical enforcement of credential policies (e.g., complexity, reuse, length, clipping, MFA, etc)",
						"Agency uses policy-based automated access revocation. There are no shared accounts",
						"Agency fully automates technical enforcement of policies. Agency updates policies to reflect new orchestration options.",
					],
				},
			],
		},
	},
];


// Define a function to get data for a specific type
function getTierData(typeName) {
	// Find the data for the given typeName in ZeroTrust data
	const typeData = ZeroTrust[0].functions.types.find(
		(type) => type.typeName === typeName
	);

	// Handle error or return default value if data not found
	if (!typeData) {
		return null;
	}

	// Extract relevant data for the type
	const traditional = ZeroTrust[0].functions.tiers[0];
	const advanced = ZeroTrust[0].functions.tiers[1];
	const optimal = ZeroTrust[0].functions.tiers[2];
	const functionType = typeData.typeName;
	const tierDescriptions = typeData.tierDescriptions;

	return {
		traditional,
		advanced,
		optimal,
		functionType,
		tierDescriptions,
	};
}

// Main App component
function App() {
	// Extract pillar data
	const pillar = ZeroTrust[0].pillar;

	// Extract tiers and types for improved readability
	const [traditional, advanced, optimal] = ZeroTrust[0].functions.tiers;
	const functionTypesData = ZeroTrust[0].functions.types;

	// Initialize functionTypes state with totalPoints property
	const initialFunctionTypes = functionTypesData.map(() => ({
		totalPoints: 0,
	}));

	// State to store function types and their points
	const [functionTypes, setFunctionTypes] = useState(initialFunctionTypes);
	const [finalTotalPoints, setFinalTotalPoints] = useState(0);

	// Calculate and update the final total points
	useEffect(() => {
		let totalPoints = 0;
		functionTypes.forEach((type) => {
			totalPoints += type.totalPoints || 0;
		});
		setFinalTotalPoints(totalPoints);
	}, [functionTypes]);

	console.log(functionTypesData[0].typeIcon)

	// JSX rendering
	return (
		<div className="outermost-div">
			<div className="bg-white ">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mx-auto max-w-2xl lg:text-center">
						{/* Display pillar information */}
						<p className="mt-2 text-3xl font-bold tracking-tight text-indigo-600 sm:text-4xl">
							Pillar 1: {pillar}
						</p>
					</div>
					{/* Render Pillar component for each function type */}
					{functionTypes.map((type, index) => (
						<div key={index}>
							<Pillar
								// Pass props to Pillar component
								traditional={traditional}
								advanced={advanced}
								optimal={optimal}
								functionType={functionTypesData[index].typeName}
								tierDescriptions={functionTypesData[index].tierDescriptions}
								typeIcon={functionTypesData[index].typeIcon}
								totalPoints={type.totalPoints}
								onTotalPointsUpdate={(points) => {
									const updatedFunctionTypes = [...functionTypes];
									updatedFunctionTypes[index].totalPoints = points;
									setFunctionTypes(updatedFunctionTypes);
								}}
							/>
						</div>
					))}
					{/* Display the final score */}
					<p className="mt-3 text-lg font-bold">
						Score for Identity Pillar: {((finalTotalPoints / 36) * 100).toFixed(0)}%
					</p>
					{/* Button for getting a report */}
					<button
						type="button"
						className="mt-3 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						Get Report
					</button>
				</div>
			</div>
		</div>
	);
}

export default App;
