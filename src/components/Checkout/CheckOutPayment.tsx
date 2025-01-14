import { Box, Button, Menu, TextField, Typography } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ConsumerContext } from "../../contexts/ConsumerContext";
import CheckOutBagOverview from "./CheckOutBagOverview";
import { createOrder } from "../../data/mockedOrderApi";
import { CartContext } from "../../contexts/CartContext";

function CheckOutPayment() {

  const { itemInCart} =
  useContext(CartContext);
  
  window.addEventListener('click', () => { 
    if (itemInCart.length <= 0){
      window.location.assign("/")
  }
  })

  const { setItemInCart } = useContext(CartContext);

  //empy cart after completed purchase
  const clearState = () => {
    setItemInCart([]);
  };

  let navigate = useNavigate();

  async function proceedOrder() {
    await createOrder();
    clearState();
    navigate("/orderbekraftelse");
  }

  const {
    firstname,
    lastname,
    phoneNumber,
    cardnumber,
    setCardnumber,
    validity,
    setValidity,
    cvc,
    setCvc,
    personalId,
    setPersonalId,
  } = useContext(ConsumerContext);

  const [anchorCardEl, setAnchorCardEl] = React.useState<null | HTMLElement>(
    null
  );
  const openCard = Boolean(anchorCardEl);
  const handleCardClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorCardEl(event.currentTarget);
  };
  const handleCardClose = () => {
    setAnchorCardEl(null);
  };

  const [anchorInvoiceEl, setAnchorInvoiceEl] =
    React.useState<null | HTMLElement>(null);
  const openInvoice = Boolean(anchorInvoiceEl);
  const handleInvoiceClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorInvoiceEl(event.currentTarget);
  };
  const handleInvoiceClose = () => {
    setAnchorInvoiceEl(null);
  };

  const [anchorSwishEl, setAnchorSwishEl] = React.useState<null | HTMLElement>(
    null
  );
  const openSwish = Boolean(anchorSwishEl);
  const handleSwishClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorSwishEl(event.currentTarget);
  };
  const handleSwishClose = () => {
    setAnchorSwishEl(null);
  };

  //disables button if fields misses values
  function SubmitButton() {
    if (cardnumber && validity && cvc) {
      return (
        <Button
          size="small"
          variant="contained"
          sx={{
            backgroundColor: "pink",
            boxShadow: "none",
            color: "black",
            mt: 3,
          }}
          onClick={proceedOrder}
        >
          Gå vidare
        </Button>
      );
    } else {
      return (
        <Button
          disabled
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
      );
    }
  }

  //disables button if field miss value
  function SubmitInvoiceButton() {
    if (personalId) {
      return (
        <Button
          size="small"
          variant="contained"
          sx={{
            backgroundColor: "pink",
            boxShadow: "none",
            color: "black",
            mt: 3,
          }}
          onClick={proceedOrder}
        >
          Gå vidare
        </Button>
      );
    } else {
      return (
        <Button
          disabled
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
      );
    }
  }

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
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
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Typography sx={{ mb: 3 }} variant="h6">
          Hur vill du betala?
        </Typography>
        <Button
          variant="outlined"
          id="basic-button"
          aria-controls={openCard ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openCard ? "true" : undefined}
          onClick={handleCardClick}
          sx={{
            width: "50%",
            color: "black",
            border: "solid black 2px",
            borderRadius: 1,
            backgroundColor: "white",
          }}
        >
          VISA/MasterCard
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorCardEl}
          open={openCard}
          onClose={handleCardClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
          }}
        >
          <Typography sx={{ m: 2 }}>
            Vänligen fyll i dina kortuppgifter.
          </Typography>
          <div>
            <TextField
              required
              onChange={(event) => {
                setCardnumber(event.target.value);
              }}
              id="outlined-required"
              value={cardnumber}
              label="Kortnummer"
              size="small"
              type="number"
              name="cardnumber"
              autoComplete="cc-number"
              sx={{ ml: 2, mb: 2, mr: 2, width: "90%" }}
            />
          </div>
          <div>
            <TextField
              required
              onChange={(event) => {
                setValidity(event.target.value);
              }}
              id="outlined-required"
              value={validity}
              label="Giltlighet"
              size="small"
              name="ccyear"
              autoComplete="cc-exp-year"
              sx={{ ml: 2, mb: 2, width: "50%" }}
            />
            <TextField
              required
              onChange={(event) => {
                setCvc(event.target.value);
              }}
              id="outlined-required"
              value={cvc}
              label="CVC"
              size="small"
              name="cvc"
              autoComplete="cc-csc"
              sx={{ ml: 2, mb: 2, mr: 2, width: "35%" }}
            />
          </div>
          <div>
            <TextField
              required
              id="outlined-required"
              label="Namn"
              size="small"
              name="ccname"
              autoComplete="cc-name"
              value={firstname + " " + lastname}
              sx={{ ml: 2, mb: 2, mr: 2, width: "50%" }}
            />
          </div>
          <CheckOutBagOverview />
          <div>
            <Button
              onClick={handleCardClose}
              size="small"
              variant="outlined"
              sx={{
                borderColor: "#F4EAC6",
                boxShadow: "none",
                color: "black",
                ml: 2,
                mr: 3,
                mt: 2,
              }}
            >
              Stäng
            </Button>
            <SubmitButton />
          </div>
        </Menu>
        <Button
          variant="outlined"
          id="swish-button"
          aria-controls={openSwish ? "swish-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openSwish ? "true" : undefined}
          onClick={handleSwishClick}
          sx={{
            width: "50%",
            mt: 2,
            color: "black",
            border: "solid black 2px",
            borderRadius: 1,
            backgroundColor: "white",
          }}
        >
          Swish
        </Button>
        <Menu
          id="swish-menu"
          anchorEl={anchorSwishEl}
          open={openSwish}
          onClose={handleSwishClose}
          MenuListProps={{
            "aria-labelledby": "swish-button",
          }}
          sx={{ width: "100%" }}
        >
          <Typography sx={{ m: 2 }}>Telefonnummer för Swish.</Typography>
          <div>
            <TextField
              required
              id="outlined-swish"
              label="Telefonnummer"
              size="small"
              value={phoneNumber}
              sx={{ ml: 2, mb: 2, mr: 2, width: "90%" }}
            />
          </div>
          <CheckOutBagOverview />
          <div>
            <Button
              onClick={handleSwishClose}
              size="small"
              variant="outlined"
              sx={{
                borderColor: "#F4EAC6",
                boxShadow: "none",
                color: "black",
                ml: 2,
                mr: 3,
                mt: 2,
              }}
            >
              Stäng
            </Button>
            <Button
              size="small"
              variant="contained"
              sx={{
                backgroundColor: "black",
                boxShadow: "none",
                color: "white",
                mt: 2,
              }}
              onClick={proceedOrder}
            >
              Slutför köp
            </Button>
          </div>
        </Menu>
        <Button
          variant="outlined"
          id="basic-button"
          aria-controls={openInvoice ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openInvoice ? "true" : undefined}
          onClick={handleInvoiceClick}
          sx={{
            width: "50%",
            mt: 2,
            color: "black",
            border: "solid black 2px",
            borderRadius: 1,
            backgroundColor: "white",
          }}
        >
          Privatfaktura
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorInvoiceEl}
          open={openInvoice}
          onClose={handleInvoiceClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          sx={{ width: "100%" }}
        >
          <Typography sx={{ m: 2 }}>
            Ange ditt personnummer så skickar vi fakturan per post.
          </Typography>
          <div>
            <TextField
              required
              onChange={(event) => {
                setPersonalId(event.target.value);
              }}
              value={personalId}
              id="outlined-required"
              label="Personnummer"
              size="small"
              sx={{ ml: 2, mb: 2, mr: 2, width: "90%" }}
            />
          </div>
          <CheckOutBagOverview />
          <div>
            <Button
              onClick={handleInvoiceClose}
              size="small"
              variant="outlined"
              sx={{
                borderColor: "#F4EAC6",
                boxShadow: "none",
                color: "black",
                ml: 2,
                mr: 3,
                mt: 2,
              }}
            >
              Stäng
            </Button>
            <SubmitInvoiceButton />
          </div>
        </Menu>
        <Link to={"/leverans"}>
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
      </Box>
    </Box>
  );
}

export default CheckOutPayment;
