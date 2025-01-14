import { Button, createTheme, Input, ThemeProvider } from "@mui/material";
import React from "react";
import { useContext, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { ShopItem } from "../../data/ShopContent";
import { ProductContext } from "../../contexts/productContext";

interface Props {
  hideShow: Boolean;
  item: ShopItem;
  handleUpdateProduct: Dispatch<SetStateAction<any>>;
}

let themeEditItem = createTheme({
  components: {
    MuiInput: {
      styleOverrides: {
        root: {
          color: "black",
          border: "none",
          backgroundColor: "white",
          margin: "2px",
          borderRadius: "10px",
          "&:hover": {
            backgroundColor: "#white",
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

themeEditItem = createTheme(themeEditItem, {
  palette: {
    info: {
      main: themeEditItem.palette.primary.main,
    },
  },
});

export default function EditButton(props: Props) {
  let [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(props.item.title);
  const [img, setImg] = useState(props.item.img);
  const [price, setPrice] = useState(props.item.price);
  const [tag, setTag] = useState(props.item.tag);
  const [id] = useState(props.item.id);
  const [description, setDescription] = useState(props.item.description);

  //handle the edits of a product from admin page
  function handleSubmit(e: any) {
    e.preventDefault();
    console.log("You clicked submit.");
  }

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    event.preventDefault();
  };

  const handleChangeTag = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTag(event.target.value as any);
    event.preventDefault();
  };

  const handleChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value as any);
    event.preventDefault();
  };

  const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImg(event.target.value);
    event.preventDefault();
  };

  const handleChangeDescription = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
    event.preventDefault();
  };

  const { updateProduct } = useContext(ProductContext);

  const handleUpdateProduct = () => {
    let ChangedItem: ShopItem = {
      id,
      title,
      img,
      price,
      tag,
      liked: false,
      description,
    };
    updateProduct(ChangedItem);
    setIsEditing(false)
  };

  if (props.hideShow === true) {
    {
      return (
        <>
          <ThemeProvider theme={themeEditItem}>
            {isEditing ? (
              <form
                onSubmit={handleSubmit}
                style={{
                  maxWidth: "70%",
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "white",

                  padding: "5px",
                  borderRadius: "5px",
                  justifySelf: "center",
                  alignSelf: "center",
                  margin: "auto",
                  color: "white",
                  fontFamily: "quicksand",
                  border: "solid black 2px",
                }}
              >
                <p>Titel:</p>
                <Input
                  type="text"
                  defaultValue={props.item.title}
                  onChange={handleChangeTitle}
                  value={title}
                />
                <p>Bild:</p>
                <Input
                  type="text"
                  defaultValue={props.item.img}
                  onChange={handleChangeImage}
                  value={img}
                />

                <p>Tag: </p>
                <Input
                  type="text"
                  defaultValue={props.item.tag}
                  onChange={handleChangeTag}
                  value={tag}
                />
                <p>Pris: </p>
                <Input
                  type="number"
                  defaultValue={props.item.price}
                  onChange={handleChangePrice}
                  value={price}
                />
                <p>Beskrivning: </p>
                <Input
                  type="text"
                  defaultValue={props.item.description}
                  onChange={handleChangeDescription}
                  value={description}
                />
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "black",
                    alignSelf: "center",
                    color: "white",
                    margin: 4,
                  }}
                  onClick={handleUpdateProduct}
                  //onClick={() => {setIsEditing(false)}}
                  type="submit"
                >
                  Klar
                </Button>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "white",
                    alignSelf: "center",
                    color: "black",
                    border: "solid black 2px",
                    margin: 4,
                  }}
                  onClick={() => {
                    setIsEditing(false);
                  }}
                >
                  Stäng
                </Button>
              </form>
            ) : (
              <Button
                variant="contained"
                style={{
                  backgroundColor: "green",
                  alignSelf: "center",
                  width: "6rem",
                  height: "2rem",
                  margin: 5,
                }}
                onClick={() => {
                  setIsEditing(true);
                }}
              >
                Ändra
              </Button>
            )}
          </ThemeProvider>
        </>
      );
    }
  }

  return <></>;
}
