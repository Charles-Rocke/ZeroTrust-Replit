import FormFieldset from "./FormFieldset";

function Pillar({
  traditional,
  advanced,
  optimal,
  functionType,
  tierDescriptions,
  onTotalPointsUpdate,
	typeIcon,
}) {
  return (
    <FormFieldset
      traditional={traditional}
      advanced={advanced}
      optimal={optimal}
      functionType={functionType}
			typeIcon={typeIcon}
      tierDescriptions={tierDescriptions}
      onTotalPointsUpdate={onTotalPointsUpdate}
    />
  );
}

export default Pillar;
