import { ShopItem, shopItems } from "../data/ShopContent";
import { ThemeProvider } from "@emotion/react";
import { Box, Button, createTheme } from "@mui/material";
import { SortButton, sortButtonsData } from "../data/SortButtonsData";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PropsFor } from "@mui/system";


let themeButtonSort = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "white",
          border: "none",
          backgroundColor: "#ffd180",
          margin: "2px",
          borderRadius: "10px",
          "&:hover": {
            backgroundColor: "#ffe180",
          },
          palette: {
            primary: {
              main: "#ffd180",
            },
          },
        },
      },
    },
  },
});

themeButtonSort = createTheme(themeButtonSort, {
  palette: {
    info: {
      main: themeButtonSort.palette.primary.main,
    },
  },
});

// interface Props {
//   buttonItem: SortButton;
//   item: ShopItem;

// }

//  function Filtering(props: Props) {
//    const filtered = shopItems.filter(item => {
//      return item.tag === props.buttonItem.value
//     })
//      console.log(filtered)
//  }

//  const handleClick = (props:Props) => {
//    const filtered = shopItems.filter((item) => {
//      return item.tag === props.buttonItem.value;
//    });
//    console.log(filtered);
//  };

//   function handleFilterChange(props: Props) {
//     const filtered = shopItems.filter((item) => {
//       return item.tag == props.buttonItem.value;
      
//     });
//     console.log(filtered);
//   }

  // onClick={()=>{shopItems.filter(item => {
  //   let Filtered = item.tag === buttonItem.value;
  // });
  // }}
interface Props {
  settag: Dispatch<SetStateAction<string>>
}
export default function SortbuttonsDOM(props:Props) {




  return (
    <>
      <Box
        sx={{
          mt: "0.1%",
          mb: "0.1%",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          justifyItems: "space-between",
          display: "flex",
          flexShrink: "4",
          flexWrap: "wrap",
        }}
      >
        <ThemeProvider theme={themeButtonSort}>
          {sortButtonsData.map((buttonItem) => (
            <Button
              onClick={() => {props.settag(buttonItem.value)}}
              variant="contained"
              value={buttonItem.value}
              key={buttonItem.name}
            >
              {buttonItem.name}
            </Button>
          ))}
        </ThemeProvider>
      </Box>
    </>
  );
}