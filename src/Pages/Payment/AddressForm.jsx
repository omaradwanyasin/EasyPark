import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export default function AddressForm({ onNextStep }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onNextStep(); // Move to the next step
  };

  return (
    <div
      style={{color:"black", backgroundColor: "white", padding: "30px", borderRadius: 15 }}
    >
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3} >
          <FormGrid item xs={12} md={6}>
            <FormLabel htmlFor="first-name"  style={{color:"black"}} required>
              First name
            </FormLabel>
            <OutlinedInput
              id="first-name"
              name="first-name"
              type="name"
              placeholder="first-name"
              autoComplete="first name"
              required
            />
          </FormGrid>
          <FormGrid item xs={12} md={6}>
            <FormLabel htmlFor="last-name" style={{color:"black"}} required>
              Last name
            </FormLabel>
            <OutlinedInput
              id="last-name"
              name="last-name"
              type="last-name"
              placeholder="last-name"
              autoComplete="last name"
              required
            />
          </FormGrid>
          <FormGrid item xs={12}>
            <FormLabel htmlFor="address1" style={{color:"black"}} required>
              Address line 1
            </FormLabel>
            <OutlinedInput
              id="address1"
              name="address1"
              type="address1"
              placeholder="Street name and number"
              autoComplete="shipping address-line1"
              required
            />
          </FormGrid>
          <FormGrid item xs={12}>
            <FormLabel htmlFor="address2" style={{color:"black"}} >Address line 2</FormLabel>
            <OutlinedInput
              id="address2"
              name="address2"
              type="address2"
              placeholder="Apartment, suite, unit, etc. (optional)"
              autoComplete="shipping address-line2"
              
            />
          </FormGrid>
          <FormGrid item xs={6}>
            <FormLabel htmlFor="city" style={{color:"black"}}  required>
              City
            </FormLabel>
            <OutlinedInput
              id="city"
              name="city"
              type="city"
              placeholder="Jenin.."
              autoComplete="City"
              required
            />
          </FormGrid>

          <FormGrid item xs={6}>
            <FormLabel htmlFor="country" style={{color:"black"}}  required>
              Country
            </FormLabel>
            <OutlinedInput
              id="country"
              name="country"
              type="country"
              placeholder="Palestine"
              autoComplete="shipping country"
              required
            />
          </FormGrid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ marginTop: "20px", width:"100%" }}
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
