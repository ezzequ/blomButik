import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
//import startpageBackground from "../Assets/startPageBackground.jpg";
import temporary from "../Assets/temporaryBackground.jpg";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import { Link } from "react-router-dom";
import StartPageContent from "./StartPageContent";

function StartPage() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        //backgroundImage: `url(${startpageBackground})`,
        backgroundImage: `url(${temporary})`,
        backgroundSize: "cover",
        //backgroundColor: "lightGreen",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "50%",
            height: "35%",
            mt: "15%",
            // backgroundColor: "rgba(244, 234, 198, 0.4)",
            backgroundColor: "rgba(214, 186, 227, 0.4)",
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            justifyContent: "center",
            alignItems: "center",
            py: "1rem",
          }}
        >
          <Typography variant="h5">Välkommen till din blombutik!</Typography>
          <Link to={"/sortiment"} style={{ textDecoration: "none" }}>
            <Button
              size="small"
              variant="contained"
              endIcon={<LocalFloristIcon />}
              sx={{
                backgroundColor: "rgba(214, 186, 227)",
                boxShadow: "none",
                color: "black",
                position: "static",
              }}
            >
              Till butiken
            </Button>
          </Link>
        </Box>
      </Box>
      <StartPageContent />
    </Box>
  );
}

export default StartPage;
