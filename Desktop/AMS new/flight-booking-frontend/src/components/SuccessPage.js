import React, { Component } from "react";
import { Jumbotron, Button,Modal, Breadcrumb, Table,Alert,Card } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import logo from '../images/OIP.jpg';
class SuccessPage extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props.booking.booking._id);
  }
  render() {
    return (
      <>
        {/* {this.props.booking ? (
          <div>
            {this.props.booking.hasOwnProperty("_id") ? (
              <Jumbotron>
                <h1>Booking successful!</h1>
                <p>Your ticket number is {this.props.booking.bookingId}</p>
                <p>
                  <Button variant="dark">
                    <Link
                      to="/mybookings"
                      style={{ color: "inherit", textDecoration: "inherit" }}
                    >
                      Your Bookings
                    </Link>
                  </Button>{" "}
                </p>
              </Jumbotron>
            ) : null}
          </div>
        ) : (
          <Jumbotron>
            <h1>Booking failed!</h1>
            <p>Please try again</p>
            <p>
              <Button variant="dark">
                <Link
                  to="/"
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  Search Flight
                </Link>
              </Button>
            </p>
          </Jumbotron>
        )} */}
        <Card style={{margin:"8% 37%"}}>
        <Card.Body>
        <p style={{fontSize:'35px',textAlign:'center',fontWeight:'bold'}}>Your Booking has been placed!</p>
        <p>Your ticket number is {this.props.booking.bookingId}</p>
        <Button variant="dark" style={{width:'100%'}}>
        <Link to="/mybookings" style={{ color: "inherit", textDecoration: "inherit" }}>Your Bookings</Link>
        </Button>
        {/* <p style={{display:'flex',justifyContent:'space-between'}}>
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
          </Button> */}
        </Card.Body>
      </Card>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    booking: state.flight.booking,
    cancelBooking: state.flight.cancelBooking,
  };
}

export default connect(mapStateToProps)(SuccessPage);
