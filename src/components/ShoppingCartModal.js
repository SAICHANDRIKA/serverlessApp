import React, { useState, useEffect } from "react";
import { Button, Table,Alert } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import CartProduct from "./CartProduct.js";
import axios from "axios";

export default function ShoppingCartModal({ show, onHide, cartItems, cartid }) {
  const [products, setProducts] = useState(null);
  const [disableSave, setDisableSave] = useState(true);
  const [disableOrder, setDisableOrder] = useState(false);
  const [textsaved, setTextsaved] = useState(null);
  const [showA, setShowA] = useState(false);
  const [showB, setShowB] = useState(false);

  useEffect(() => {
    if (show) {
      setProducts(cartItems);
      if(cartItems === []){
        setDisableOrder(true);
      }
    }
  }, [show, cartItems]);

  function quantityChangeCallback(sku, quantity) {
    let tempProducts = products;
    let index = tempProducts.findIndex((item) => item.SKU === sku);
    if (index !== -1) {
      if (quantity > 0) {
        tempProducts[index].quantity = quantity;
        tempProducts[index].total = quantity * tempProducts[index].price;
      } else {
        tempProducts.splice(index, 1);
      }
    }
    setProducts(tempProducts);
    setDisableSave(false);
    setDisableOrder(true);
    setTextsaved(
      <span className="text-left text-danger">Save the Changes!!</span>
    );
  }

  function saveChanges() {
    axios
      .post(
        "https://8cqch877gk.execute-api.us-east-1.amazonaws.com/alpha/savecartitems",
        { id: cartid, items: products },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setTextsaved("SAVED CHANGES SUCCESSFULLY!");
        console.log("response ", response);
      });
    setDisableSave(true);
    setDisableOrder(false);
  }
  function handleCheckout() {
    console.log(products);
    axios
      .post(
        "https://8cqch877gk.execute-api.us-east-1.amazonaws.com/alpha/orderitems",
        { id: cartid, items: products },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("response ", response);
        if (response.status === 200) {
          setShowA(true);
          setShowB(false);
        }else{
          setShowB(true);
          setShowA(false); 
        }
      });
    clearAndHide();
  }

  function clearAndHide() {
    onHide();
    setTextsaved("");
    setDisableSave(true);
    setDisableOrder(true);
    setProducts(null);
  }

  return (
    <>
    <Alert show={showA} variant="success" >
         Your Order has been submitted!! Track your orders using Track Orders page above.
         <div className="d-flex justify-content-end">
          <Button onClick={() => setShowA(false)} variant="outline-success">
            Ok
          </Button>
        </div>
        </Alert>
        <Alert show={showB} variant="danger" >
          Oops! Try again
          <div className="d-flex justify-content-end">
          <Button onClick={() => setShowB(false)} variant="outline-danger">
            Ok
          </Button>
        </div>
        </Alert>
      <Modal
        show={show}
        onHide={clearAndHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Review Cart
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>SKU</th>
                <th>Name</th>
                <th colSpan={1}>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {products && products.length > 0 ? (
                products.map((product) => (
                  <CartProduct
                    key={product.SKU}
                    product={product}
                    onChangeCallback={quantityChangeCallback}
                  />
                ))
              ) : (
                <span>Cart is empty</span>
              )}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <span className="text-left text-success">{textsaved}</span>
          <Button onClick={saveChanges} disabled={disableSave}>
            Save Changes
          </Button>
          <Button
            variant="info"
            onClick={handleCheckout}
            disabled={disableOrder}
          >
            Order
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
