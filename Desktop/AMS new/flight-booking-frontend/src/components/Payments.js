import React from "react";
import { connect } from "react-redux";
import { Button, Jumbotron, Modal, Breadcrumb, Table,Alert, Card, ListGroup } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import { bookFlight, clearBooking } from "../actions";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

function Payments({ flight, user, userDetails, bookFlight, clearBooking }) {
  let fare = flight.fare;
  let history = useHistory();

  const api = axios.create({
    baseURL: `http://localhost:9100/bookings`,
  });
  function getEmail() {
    if (user.method === "local") {
      return user.local.email;
    } else if (user.method === "facebook") {
      return user.facebook.email;
    } else if (user.method === "google") {
      return user.google.email;
    }
  }
  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    console.log(fare);
    fare=fare+10*fare/100
    const data = await api.post("/razorpay", { fare });
    //   .then((t) => t.json());

    console.log("data",data.data.amount);
    console.log("key",process.env.REACT_APP_KEY_ID)
    const options = {
      key: process.env.REACT_APP_KEY_ID,
      currency: data.data.currency,
      amount: data.data.amount.toString(),
      order_id: data.data.id,
      name: "Flight Booking",
      description: "Complete payment to book the flight",
      //   image: "http://localhost:1337/logo.svg",
      handler: async function (response) {
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
        console.log(userDetails._id);
        await clearBooking();
        await bookFlight(userDetails, flight);
        history.push("/successpage");
      },
      prefill: {
        email: getEmail(),
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">Search Flights</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/book">Traveller Details</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Payment</Breadcrumb.Item>
      </Breadcrumb>
      {/* <Jumbotron>
        <h4>Pay {fare}</h4>
        <p>
          <Button onClick={displayRazorpay} variant="primary">
            Pay now
          </Button>
        </p>
      </Jumbotron> */}
      <Card style={{margin:"8% 37%"}}>
      <b style={{textAlign:'center',fontSize:'30px'}}>Flights Charges</b>
        <Card.Body>
        <p style={{display:'flex',justifyContent:'space-between'}}>
        <p>Flight Charges:</p>
        <p>{fare}</p>
        </p>
        <p style={{display:'flex',justifyContent:'space-between'}}>
        <p>GST(10%):</p>
        <p>+{(10*fare)/100}</p>
        </p>
        <hr />
        <p style={{display:'flex',justifyContent:'space-between'}}>
        <p>Total Charges:</p>
        <p>{fare+(10*fare)/100}</p>
        </p>
        <Button onClick={displayRazorpay} variant="dark" style={{width:'100%'}}>
            Pay now
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.errorMessage,
    flight: state.flight.flight,
    user: state.auth.user,
    userDetails: state.flight.userDetails,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    bookFlight: (userDetails, flight) =>
      dispatch(bookFlight(userDetails, flight)),
    clearBooking: () => dispatch(clearBooking()),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Payments);
