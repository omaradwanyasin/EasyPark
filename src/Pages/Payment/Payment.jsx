import React, { useState } from "react";
import ButtonStepper from "./ButtonStepper";
import "../Payment/Payment.css";
import CreditCardForm from "./CreditCardForm";
import AddressForm from "./AddressForm";
import Navbar from "../../Components/Navbar/Navbar";

function Payment() {
  const [state, setstate] = useState(0);
  const getdata = (param) => {
    setstate(param);
  };
  return (
    <div>
      <Navbar />
      <div className="paycont">
        <ButtonStepper GetdataValue={getdata} />
        {state == 1 ? (
          <div style={{ paddingTop: 30 }}>
            <CreditCardForm />
          </div>
        ) : (
          <div style={{ paddingTop: 30 }}>
            <AddressForm />
          </div>
        )}
      </div>
    </div>
  );
}

export default Payment;
