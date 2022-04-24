import React,{ useState}  from "react";
import { Navbar, Container, Nav, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/fontawesome-free-solid";
import ShoppingCartModal from "./ShoppingCartModal.js";
import axios from "axios";
import "./Header.css";

function Header() {
  const [show, setShow] = useState(false);
  const [cartItems, setCartItems] = useState(null);
  const cartid = "ABC4";


  const handleClose = () => setShow(false);


  function getData() {
    axios
      .get(
        " https://8cqch877gk.execute-api.us-east-1.amazonaws.com/alpha/getcartitems?id=" +
          cartid,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setCartItems(response.data.data.Item.items);
        setShow(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Row className="bg-dark">
        <Col md={11}>
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand>Ordering System</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/form">Form</Nav.Link>
                <Nav.Link href="/products">Products</Nav.Link>
                <Nav.Link href="/trackorder">Track Orders</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </Col>
        <Col>
          <FontAwesomeIcon
            variant="primary" onClick={getData}
            icon={faShoppingCart}
            size="xl"
            color="white"
            className="shoppingcart"
          />
       </Col>
      </Row>
      <ShoppingCartModal
          show={show} onHide={handleClose}  cartItems={cartItems} cartid={cartid}/>
    </>
  );
}

export default Header;
