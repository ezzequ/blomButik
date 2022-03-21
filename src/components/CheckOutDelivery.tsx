import {
  Box,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React, { useContext} from "react";
import { Link } from "react-router-dom";
import BgCheckOut from "../Assets/backgroundCheckOut.jpg";
import { Context } from "../Context";
import CheckOutBagOverview from "./CheckOutBagOverview";
import { deliveryAlternatives, DeliveryOption } from "../mockedDelivery";

function CheckOutDelivery() {
  const { deliveryOption, setDeliveryOption, deliveryDate, setDeliveryDate } =
    useContext(Context);

  const handleOnChange = (
    event: React.MouseEvent<HTMLElement>,
    newSelected: DeliveryOption
  ) => {
    setDeliveryOption(newSelected);
    calcDeliveryDate(newSelected.deliveryTime);
  };

  const calcDeliveryDate = (newDeliveryVal: number) => {
    const date = new Date();
    const result = new Date(date);
    result.setDate(result.getDate() + newDeliveryVal);
    setDeliveryDate(result.toLocaleDateString());
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        backgroundImage: `url(${BgCheckOut})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        display: "flex",
      }}
    >
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{ ml: 3, width: "60%" }}
      >
        <Typography sx={{ mb: 3, mt: 8 }} variant="h6">
          Hur vill du få dina varor levererade?
        </Typography>
        <ToggleButtonGroup
          exclusive
          onChange={handleOnChange}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          {deliveryAlternatives.map((item, idx) => (
            <ToggleButton
              key={item.label}
              value={deliveryAlternatives[idx]}
              sx={{
                width: "100%",
                color: "black",
                border: "none",
                backgroundColor: "#F4EAC6",
                mb: 1,
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: 12,
                  ml: 1,
                  textTransform: "capitalize",
                }}
              >
                {item.company}
              </Typography>
              <Typography
                sx={{ fontSize: 10, ml: 1, textTransform: "capitalize" }}
              >
                {item.label}
              </Typography>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <div>
          <Link to={"/kunduppgifter"}>
            <Button
              size="small"
              variant="outlined"
              sx={{
                borderColor: "#F4EAC6",
                boxShadow: "none",
                color: "black",
                mr: 2,
                mt: 3,
              }}
            >
              Tillbaka
            </Button>
          </Link>
          <Link to={"/betalning"}>
            <Button
              size="small"
              variant="contained"
              sx={{
                backgroundColor: "#F4EAC6",
                boxShadow: "none",
                color: "black",
                mt: 3,
              }}
            >
              Gå vidare
            </Button>
          </Link>
        </div>
      </Box>
      <CheckOutBagOverview />
    </Box>
  );
}

export default CheckOutDelivery;
