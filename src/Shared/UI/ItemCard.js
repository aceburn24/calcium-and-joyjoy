import { FaRegHeart, FaCartPlus } from 'react-icons/fa';
import {
  Box, Card, CardBody, CardHeader, HStack, Image, Text, IconButton, useToast,
  LinkBox, LinkOverlay,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import convertCurrency from "../utils/convertCurrency";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Store/cart";
import axiosInstance from "../utils/axiosInstance";

function ItemCard({ cardW, data, onSelect, isSelected }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const toast = useToast();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  if (!data) return <LoadingSpinner />;

  const { name, price, gender, discount, id, category, image } = data;
  const maxLength = 21;
  const formattedName = name.length > maxLength ? `${name.slice(0, maxLength)}...` : name;

  const clickHandler = () => {
    if (pathname === "/customize") {
      onSelect(data);
    }
  };

  const handleWishlist = async (e) => {
    e.stopPropagation();
    if (!user) {
      toast({ position: "top", status: "error", description: "Please login to add items to your wishlist." });
      return;
    }

    try {
      await axiosInstance.post("/user/wishlist/store", {
        user_id: user.user_info.id,
        product_id: id,
      }, { headers: { Authorization: `Bearer ${user.token}` } });
      toast({ position: "top", status: "success", title: "Added to wishlist" });
    } catch (error) {
      toast({ position: "top", status: "error", description: "An error occurred while adding to wishlist." });
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart({ ...data, quantity: 1 }));
    toast({ position: "top", status: "success", title: "Added to cart" });
  };

  return (
    <LinkBox as={Card} py="8px" boxShadow="4px 4px 16px rgba(0,0,0,.3)" w={cardW || "250px"} mx="auto" cursor="pointer" transition="all .4s" _hover={{ transform: "translateY(-8px)", boxShadow: "4px 8px 16px rgba(0,0,0,.4)" }} borderRadius="20px" h="400px" bgColor={isSelected ? "var(--accent)" : ""} onClick={clickHandler}>
      {discount && (
        <CardHeader color="white" pos="relative" mt="-8px">
          <Box w="fit-content" pos="absolute" right="24px" top="0" bgColor="#F24E1E" px="4px" py="12px" clipPath="polygon(100% 0, 100% 100%, 50% 80%, 0 100%, 0 0)" fontSize="14px">{Math.round(discount * 100)}%</Box>
        </CardHeader>
      )}
      <CardBody>
      <Box display="flex" justifyContent="center" alignItems="center" h="200px">
          <LinkOverlay as={Link} to={pathname !== "/customize" ? `/shoe/${id}` : undefined}>
            <Image alt="product" mx="auto" src={image} verticalAlign="bottom" mb="16px" maxH="200px" borderRadius="10px" />
          </LinkOverlay>
      </Box>
        <Text fontWeight="semibold">{formattedName}</Text>
        <Text color="gray.500">{category?.name || ''} - {gender === "male" ? "Men's" : "Women's"}</Text>
        {discount ? (
          <HStack>
            <Text color="red" fontWeight="semibold">{convertCurrency(price * (1 - discount))}</Text>
            <Text my="16px" textDecor="line-through" fontWeight="semibold">{convertCurrency(price)}</Text>
          </HStack>
        ) : (
          <Text my="16px" fontWeight="semibold">{convertCurrency(price)}</Text>
        )}
        <HStack spacing={4} mt={2}>
          <IconButton aria-label="Add to cart" icon={<FaCartPlus />} onClick={handleAddToCart} />
          <IconButton aria-label="Add to wishlist" icon={<FaRegHeart />} onClick={handleWishlist} />
        </HStack>
      </CardBody>
    </LinkBox>
  );
}

export default ItemCard;
