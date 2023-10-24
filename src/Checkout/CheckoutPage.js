import CheckoutConfirm from "./CheckoutConfirm";
import { useState } from "react";
import CheckoutPay from "./CheckoutPay";
import Thankyou from "./Thankyou";
import { Grid } from "@chakra-ui/react";
import OrderSummary from "./OrderSummary";
function CheckoutPage() {
  const [confirmed, setConfirmed] = useState(false);
  const [processed, setProcessed] = useState(false);

  return (
    <Grid
      maxW='1000px'
      mx='auto'
      gridTemplateColumns={{ base: "1fr", lg: "5.5fr 4.5fr" }}
      gap={{ base: "80px", lg: "200px" }}
    >
      {!confirmed && !processed && (
        <CheckoutConfirm onConfirm={() => setConfirmed(true)} />
      )}
      {confirmed && !processed && (
        <CheckoutPay
          onPay={() => setProcessed(true)}
          onBack={() => setConfirmed(false)}
        />
      )}
      {processed && <Thankyou />}
      <OrderSummary />
    </Grid>
  );
}

export default CheckoutPage;
