import React, { useState } from "react";
import ButtonStepper from "./ButtonStepper";
import "../Payment/Payment.css";
import CreditCardForm from "./CreditCardForm";
import Navbar from "../../Components/Navbar/Navbar";
import Approved from "./Approved";

function Payment() {
  const [state, setState] = useState(0);

  const getdata = (param) => {
    setState(param);
  };

  const handleNextStep = () => {
    setState((prevState) => prevState + 1);
  };

  return (
    <div>
      <Navbar />
      <div className="paycont">
        <ButtonStepper GetdataValue={getdata} activeStep={state} />
        {
         state === 0 ? ( // Corrected condition
          <div style={{ paddingTop: 30 }}>
            <CreditCardForm onNextStep={handleNextStep} />
          </div>
        ) : (
          <div style={{ paddingTop: 30 }}>
            <Approved />
          </div>
        )}
      </div>
    </div>
  );
}

export default Payment;
