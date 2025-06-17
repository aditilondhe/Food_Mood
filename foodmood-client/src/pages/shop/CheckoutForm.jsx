import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ price, cart }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setcardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  console.log(user.email);

  useEffect(() => {
    if (typeof price !== "number" || price < 1) {
      console.error(
        "Invalid price value. Must be a number greater than or equal to 1."
      );
      return;
    }

    axiosSecure.post("/create-payment-intent", { price }).then((res) => {
      console.log(res.data.clientSecret);
      console.log(price);
      setClientSecret(res.data.clientSecret);
    });
  }, [price, axiosSecure]);

  // handleSubmit btn click
  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // console.log('card: ', card)
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setcardError(error.message);
    } else {
      // setcardError('Success!');
      // console.log('[PaymentMethod]', paymentMethod);
    }
    console.log("clientSecret being used:", clientSecret);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "unknown",
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
    }

    console.log("paymentIntent", paymentIntent);

    if (paymentIntent.status === "succeeded") {
      const transactionId = paymentIntent.id;
      setcardError(`Your transactionId is: ${transactionId}`);

      // save payment info to server
      const paymentInfo = {
        email: user.email,
        transactionId: transactionId,
        price,
        quantity: cart.length,
        status: "Order Pending",
        itemsName: cart.map((item) => item.name),
        cartItems: cart.map((item) => item._id),
        menuItems: cart.map((item) => item.menuItemId),
      };
      console.log(paymentInfo);

      //send payment info
      axiosSecure.post("/payments", paymentInfo).then((res) => {
        console.log(res.data);
        if (res.data) {
          alert("Payment Successfull!");
          navigate("/order");
        }
      });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-start items-start gap-8 px-4 py-8">
      {/* Left side - Order Summary */}
      <div className="lg:w-1/2 w-full space-y-3">
        <h4 className="text-lg font-semibold">Order Summary</h4>
        <p>Total Price: ${price}</p>
        <p>Number of Items: {cart.length}</p>
      </div>

      {/* Right side - Payment Form */}
      <div className="lg:w-1/2 w-full card shadow-md bg-white px-5 py-8 rounded-lg max-w-full">
        <h4 className="text-lg font-semibold mb-2">Process your Payment!</h4>
        <h5 className="font-medium mb-4">Credit/Debit Card</h5>

        {/* Stripe Payment Form */}
        <form onSubmit={handleSubmit}>
          <div className="border p-3 rounded-md">
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
          </div>
          <button
            type="submit"
            disabled={!stripe || !clientSecret}
            className="btn btn-sm bg-orange-500 w-full text-white mt-5"
          >
            Pay
          </button>
        </form>

        {cardError && (
          <p className="text-red-500 mt-2 italic text-sm text-center">
            {cardError}
          </p>
        )}
      </div>
    </div>
  );
};

export default CheckoutForm;
