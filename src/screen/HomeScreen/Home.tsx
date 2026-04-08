import { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Container,
} from "@mui/material";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container  sx={{ py: 3,width:{xs:"100%",md:"100%"}}}> 
      <Grid container spacing={3}>
        {products.map((item: any) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={item.id}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 6,
                },
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image={item.thumbnail}
                alt={item.title}
                sx={{
                  objectFit: "contain",
                  p: 2,
                }}
              />

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" noWrap>
                  {item.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {item.description}
                </Typography>

                <Box mt={1} mb={1}>
                  <Chip
                    label={item.category.toUpperCase()}
                    size="small"
                    sx={{
                      backgroundColor: "#099486",
                      color: "white",
                    }}
                  />
                </Box>

                <Typography variant="h6" color="green">
                  ₹{item.price}
                </Typography>

                <Typography variant="body2">⭐ {item.rating}</Typography>

                <Typography
                  variant="body2"
                  color={item.stock > 10 ? "green" : "red"}
                >
                  {item.stock > 10 ? "In Stock" : "Low Stock"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Home;
