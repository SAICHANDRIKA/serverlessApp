import React,{useState} from "react";
import { Card, CardGroup, Col, Row, Button,Alert } from "react-bootstrap";
import axios from "axios";

export default function ProductRow(props) {
  const cartid="ABC4"
  const [showA, setShowA] = useState(false);
  const [showB, setShowB] = useState(false);

  function handleClick(cartid, productid, name, price, quantity,sellerid) {
    console.log(cartid, productid, name, price, quantity);
    axios
      .post(
        "https://8cqch877gk.execute-api.us-east-1.amazonaws.com/alpha/addtocart",
        { id: cartid, pid: productid, name: name, price: price, quantity: quantity, total: price ,sellerid : sellerid},
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
  }
  return (
    <>
        <Alert show={showA} variant="success" >
         Item Added to Cart!!
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
    
      <Row xs={1} md={4} className="g-4">
        {
          <Col>
            <CardGroup>
              <Card style={{ cursor: "pointer" }}>
                <Card.Img variant="top" src={props.image} />
                <Card.Body>
                  <Card.Title>
                    <div>#{props.id}</div>
                    <div> {props.name}</div>
                  </Card.Title>
                  <Card.Text as="div">
                    <div
                      dangerouslySetInnerHTML={{ __html: props.description }}
                    ></div>
                    <div className="product-price">{props.price}</div>
                  </Card.Text>
                </Card.Body>
                
                  <Button
                    onClick={() =>
                      handleClick(cartid, props.id, props.name, props.price, 1,props.sellerid)
                    }
                    variant="primary"
                  >
                    Add to cart
                  </Button>
              
              </Card>
            </CardGroup>
          </Col>
        }
      </Row>
    </>
  );
}
