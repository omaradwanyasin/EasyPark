import React, { useState } from "react";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardContent from "@mui/joy/CardContent";
import Checkbox from "@mui/joy/Checkbox";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";

export default function CreditCardForm({ onNextStep }) {
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    cardHolderName: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.cardNumber) newErrors.cardNumber = "Card number is required";
    if (!formData.expiryDate) newErrors.expiryDate = "Expiry date is required";
    if (!formData.cvc) newErrors.cvc = "CVC/CVV is required";
    if (!formData.cardHolderName) newErrors.cardHolderName = "Card holder name is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddCard = () => {
    if (validateForm()) {
      onNextStep();
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{
        maxHeight: "max-content",
        maxWidth: "100%",
        mx: "auto",
        // to make the demo resizable
        overflow: "auto",
        resize: "horizontal",
      }}
    >
      <Typography level="title-lg" startDecorator={<InfoOutlined />}>
        Add new card
      </Typography>
      <Divider inset="none" />
      <CardContent
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(80px, 1fr))",
          gap: 1.5,
        }}
      >
        <FormControl sx={{ gridColumn: "1/-1" }} error={!!errors.cardNumber}>
          <FormLabel>Card number</FormLabel>
          <Input
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleInputChange}
            endDecorator={<CreditCardIcon />}
          />
          {errors.cardNumber && <Typography color="error">{errors.cardNumber}</Typography>}
        </FormControl>
        <FormControl error={!!errors.expiryDate}>
          <FormLabel>Expiry date</FormLabel>
          <Input
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleInputChange}
            endDecorator={<CreditCardIcon />}
          />
          {errors.expiryDate && <Typography color="error">{errors.expiryDate}</Typography>}
        </FormControl>
        <FormControl error={!!errors.cvc}>
          <FormLabel>CVC/CVV</FormLabel>
          <Input
            name="cvc"
            value={formData.cvc}
            onChange={handleInputChange}
            endDecorator={<InfoOutlined />}
          />
          {errors.cvc && <Typography color="error">{errors.cvc}</Typography>}
        </FormControl>
        <FormControl sx={{ gridColumn: "1/-1" }} error={!!errors.cardHolderName}>
          <FormLabel>Card holder name</FormLabel>
          <Input
            name="cardHolderName"
            value={formData.cardHolderName}
            onChange={handleInputChange}
            placeholder="Enter cardholder's full name"
          />
          {errors.cardHolderName && <Typography color="error">{errors.cardHolderName}</Typography>}
        </FormControl>
        <CardActions sx={{ gridColumn: "1/-1" }}>
          <Button variant="solid" color="primary" onClick={handleAddCard}>
            Add card
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}
