import { Box, Grid, Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import ItemCard from "../Shared/ItemCard";
function ProductList() {
  const { category, brand } = useParams();
  const dummyProds = Array.from({ length: 10 });
  return (
    <Box pt='40px' pb='80px'>
      <Heading ml='40px' mb='40px' textTransform='capitalize'>
        {category ? `${category}'s ${brand}` : brand}
      </Heading>
      <Grid
        columnGapgap='24px'
        rowGap='48px'
        gridTemplateColumns='repeat(auto-fit,minmax(380px,1fr))'
      >
        {dummyProds.map((_, i) => {
          return (
            <ItemCard
              cardW='300px'
              title={`Abbibas ${i}`}
              img='/dummyShoe.png'
              key={i}
            />
          );
        })}
      </Grid>
    </Box>
  );
}

export default ProductList;
