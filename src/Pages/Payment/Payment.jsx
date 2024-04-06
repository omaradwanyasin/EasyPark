import React, { useState } from "react";
import Navgation from "../../Components/Navbar/Navgation";
import ButtonStepper from "./ButtonStepper";
import "../Payment/Payment.css";
import CreditCardForm from "./CreditCardForm";
import AddressForm from "./AddressForm";

function Payment() {
  const [state, setstate] = useState(0);
  const getdata = (param) => {
    setstate(param);
  };
  return (
    <div>
      <Navgation />
      <div className="paycont">
        <ButtonStepper GetdataValue={getdata} />
        {state == 1 ? (
          <CreditCardForm />
        ) : (
          <div>
            <AddressForm />
          </div>
        )}
      </div>
    </div>
  );
}

export default Payment;
