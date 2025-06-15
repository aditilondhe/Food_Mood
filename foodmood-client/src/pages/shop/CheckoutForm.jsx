import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const CheckoutForm = ({ price, cart }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  useEffect(() => {
    if (typeof price !== "number" || price < 1) {
      console.log("Price is not a number or less than 1");
      return;
    }

    axiosSecure.post("/create-payment-intent", { price }).then((res) => {
      console.log("Stripe backend response:", res.data);
      if (res.data?.clientSecret) {
        setClientSecret(res.data.clientSecret);
      } else {
        console.error("clientSecret missing from backend response!");
      }
    });
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (!clientSecret) {
      console.error("clientSecret is undefined. Cannot confirm payment.");
      return;
    }

    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
    } else {
      setCardError("Success!");
      console.log("[PaymentMethod]", paymentMethod);
    }
    const { paymentIntent, confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "unknown",
          },
        },
      }
    );
    if (confirmError) {
      console.log(confirmError);
    }
    console.log(paymentIntent);
  };
  return (
    <div className="flex flex-col sm:flex-row justify-start items-start gap-8">
      {/* left side */}
      <div className="md:w-1/2 space-y-3 w-full">
        <h4 className="text-lg font-semibold">Order Summary</h4>
        <p>Total Price: ${price}</p>
        <p>Number of Items: {cart.length}</p>
      </div>
      {/*  right side */}
      <div className="md:w-1/2 space-y-5 w-full card shrink-0 max-w-sm shadow-2xl bg-white px-4 py-8 ">
        <h4 className="text-lg font-semibold">Process your Payment!</h4>
        <h5 className="font-medium">Credit/Debit Card</h5>
        {/* stripe form */}
        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <button
            type="submit"
            disabled={!stripe}
            className="btn btn-sm bg-orange-500 w-full  text-white mt-5"
          >
            Pay
          </button>
        </form>
        {cardError ? (
          <p className="text-red mx-auto italic text-sm">{cardError}</p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default CheckoutForm;
