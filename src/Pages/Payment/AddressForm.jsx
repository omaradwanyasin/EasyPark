import * as React from "react";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/system";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export default function AddressForm() {
  return (
    <div
      style={{ backgroundColor: "white", paddingTop: "20px", borderRadius: 10 }}
    >
      <Grid container spacing={3}>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="first-name" required>
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
          <FormLabel htmlFor="last-name" required>
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
          <FormLabel htmlFor="address1" required>
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
          <FormLabel htmlFor="address2">Address line 2</FormLabel>
          <OutlinedInput
            id="address2"
            name="address2"
            type="address2"
            placeholder="Apartment, suite, unit, etc. (optional)"
            autoComplete="shipping address-line2"
            required
          />
        </FormGrid>
        <FormGrid item xs={6}>
          <FormLabel htmlFor="city" required>
            City
          </FormLabel>
          <OutlinedInput
            id="city"
            name="city"
            type="city"
            placeholder="Jenin"
            autoComplete="City"
            required
          />
        </FormGrid>

        <FormGrid item xs={6}>
          <FormLabel htmlFor="country" required>
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
        <FormGrid item xs={12}>
          <FormControlLabel
            style={{ color: "black" }}
            control={<Checkbox name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </FormGrid>
      </Grid>
    </div>
  );
}
