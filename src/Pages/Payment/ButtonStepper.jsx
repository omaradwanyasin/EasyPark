import * as React from "react";
import Stepper from "@mui/joy/Stepper";
import Step from "@mui/joy/Step";
import StepButton from "@mui/joy/StepButton";
import StepIndicator from "@mui/joy/StepIndicator";
import Check from "@mui/icons-material/Check";

const steps = ["Your Information", "Card Information", "Approved"];

export default function ButtonStepper({ GetdataValue, activeStep }) {
  React.useEffect(() => {
    GetdataValue(activeStep);
  }, [activeStep, GetdataValue]);

  return (
    <Stepper sx={{ width: "100%" }}>
      {steps.map((step, index) => (
        <Step
          key={step}
          indicator={
            <StepIndicator
              variant={activeStep <= index ? "soft" : "solid"}
              color={activeStep < index ? "neutral" : "primary"}
            >
              {activeStep <= index ? index + 1 : <Check />}
            </StepIndicator>
          }
          sx={{
            "&::after": {
              ...(activeStep > index &&
                index !== steps.length - 1 && { bgcolor: "primary.solidBg" }),
            },
          }}
        >
          <StepButton disabled> {/* Make the StepButton disabled */}
            <p style={{ color: "white" }}>{step}</p>
          </StepButton>
        </Step>
      ))}
    </Stepper>
  );
}
