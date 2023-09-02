import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  CardMedia,
  Container,
  CssBaseline,
  Paper,
  List,
  ListItem,
} from "@mui/material";
import { Favorite, FavoriteBorder, Search } from "@mui/icons-material";

const GifGallery = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [gifs, setGifs] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [hotTopics, setHotTopics] = useState([]);
  const [showHotTopics, setShowHotTopics] = useState(false);

  useEffect(() => {
    const hotTopicsList = [
      "Cats",
      "Dogs",
      "Funny",
      "Movies",
      "Sports",
      "Nature",
    ];
    setHotTopics(hotTopicsList);
    fetchRandomGifs();
  }, []);
  const fetchRandomGifs = async () => {
    try {
      const apiKey = "GlVGYHkr3WSBnllca54iNt0yFbjz7L65";
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&limit=10`
      );
      const data = await response.json();

      const gifList = data.data.map((gif) => ({
        id: gif.id,
        title: gif.title,
        url: gif.images.downsized_medium.url,
      }));

      setGifs(gifList);
    } catch (error) {
      console.error("Error fetching random GIFs:", error);
    }
  };


  const handleSearch = async () => {
    try {
      const apiKey = "GlVGYHkr3WSBnllca54iNt0yFbjz7L65";
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${apiKey}&limit=10`
      );
      const data = await response.json();

      const gifList = data.data.map((gif) => ({
        id: gif.id,
        title: gif.title,
        url: gif.images.downsized_medium.url,
      }));

      setGifs(gifList);
    } catch (error) {
      console.error("Error searching for GIFs:", error);
    }
  };

  const toggleFavorite = (gif) => {
    const isFavorite = favorites.some((favorite) => favorite.id === gif.id);

    if (isFavorite) {
      const updatedFavorites = favorites.filter(
        (favorite) => favorite.id !== gif.id
      );
      setFavorites(updatedFavorites);
    } else {
      setFavorites([...favorites, gif]);
    }
  };

  useEffect(() => {
    const storedFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleToggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const handleTopicClick = (topic) => {
    setSearchTerm(topic);
    handleSearch();
    setShowHotTopics(false);
  };

  const searchBoxStyles = {
    borderRadius: "4em",
    height: "4em",
    display: "flex",
    alignItems: "center",
    transition: "0.3s",
    width: "100%",
    position: "relative",
  };
  const searchInputStyles = {
    width: "100%",
    fontSize: "1.2em",
    color: "#fff",
    borderRadius: "4em",
    paddingLeft: "1em",
    border: "none",
  };

  const buttonStyles = {
    borderRadius: "50%",
    width: "4em",
    height: "4em",
    backgroundColor: hovering ? "#f50057" : "black",
    transition: "0.3s",
    cursor: "pointer",
    position: "absolute",
    right: "1em",
  };

  const iconStyles = {
    margin: "auto",
    color: "#fff",
  };

  const suggestionBoxStyles = {
    position: "absolute",
    zIndex: 1,
    marginTop: "8px",
    width: "100%",
    background: "white",
    boxShadow: "0px 1px 5px rgba(0,0,0,0.1)",
  };

  const suggestionItemStyles = {
    listStyle: "none",
    padding: "8px 12px",
    display: "block",
    width: "100%",
    cursor: "pointer",
    borderRadius: "3px",
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Paper
        elevation={3}
        style={{
          background: "black",
          color: "white",
          padding: "16px",
          textAlign: "center",
        }}
      >
        <Typography variant="h4">Your GIF journey starts here!</Typography>
        <Typography variant="subtitle1">
          Get ready to explore and enjoy!
        </Typography>
      </Paper>
      <Box my={4}>
        <div style={{ position: "relative" }}>
          <div style={searchBoxStyles}>
            <TextField
              label=""
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setShowHotTopics(true)}
              onBlur={() => setShowHotTopics(false)}
              style={searchInputStyles}
              placeholder="Search for GIFs"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              style={buttonStyles}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              <Search style={iconStyles} />
            </Button>
          </div>
          {showHotTopics && (
            <div style={suggestionBoxStyles}>
              <List>
                {hotTopics.map((topic) => (
                  <ListItem
                    button
                    key={topic}
                    onClick={() => handleTopicClick(topic)}
                    style={suggestionItemStyles}
                  >
                    {topic}
                  </ListItem>
                ))}
              </List>
            </div>
          )}
        </div>
        
        <Button
  variant="outlined"
  color="primary"
  onClick={handleToggleFavorites}
  style={{
    marginTop: "16px",
    color: "black", 
    border: "1px solid black",
  }}
>
  {showFavorites ? "Hide Favorites" : "Show Favorites"}
</Button>

      </Box>
      {showFavorites ? (
        <Box mt={2}>
          <Typography variant="h4">Favorites</Typography>
          <Grid container spacing={2}>
            {favorites.map((favorite) => (
              <Grid item key={favorite.id} xs={12} sm={6} md={4} lg={3}>
                <Card style={{ height: "100%" }}>
                  <CardMedia
                    component="img"
                    alt={favorite.title}
                    height="200"
                    image={favorite.url}
                  />
                  <CardContent>
                    <Typography variant="subtitle1">
                      {favorite.title}
                    </Typography>
                    <IconButton
                      color="secondary"
                      onClick={() => toggleFavorite(favorite)}
                    >
                      <Favorite />
                    </IconButton>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {gifs.map((gif) => (
            <Grid item key={gif.id} xs={12} sm={6} md={4} lg={3}>
              <Card style={{ height: "100%" }}>
                <CardMedia
                  component="img"
                  alt={gif.title}
                  height="200"
                  image={gif.url}
                />
                <CardContent>
                  <Typography variant="subtitle1">{gif.title}</Typography>
                  <IconButton
                    color={
                      favorites.some((favorite) => favorite.id === gif.id)
                        ? "secondary"
                        : "default"
                    }
                    onClick={() => toggleFavorite(gif)}
                  >
                    {favorites.some((favorite) => favorite.id === gif.id) ? (
                      <Favorite />
                    ) : (
                      <FavoriteBorder />
                    )}
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default GifGallery;
