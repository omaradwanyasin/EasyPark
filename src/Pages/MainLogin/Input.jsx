import React from "react";
import "../MainLogin/Signup.css";
function Input() {
  return (
    <div class="input-container">
      <input type="text" id="input" required="" />
      <label for="input" class="label">
        Email
      </label>
      <div class="underline"></div>
    </div>
  );
}

export default Input;

