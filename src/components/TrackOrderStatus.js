import "./TrackOrderStatus.css";
import OrderStatus from "./OrderStatus.js";
import axios from "axios";
import React, { useState, useEffect } from "react";

export default function TrackOrderStatus() {
  const cartid = "ABC4";
  const [orders, setOrders] = useState(null);
  const [texttrack,setTextrack] = useState(null);

  function getOrdersData(cartid) {
    axios
      .get(
        "https://8cqch877gk.execute-api.us-east-1.amazonaws.com/alpha/trackorders?id=" +
          cartid,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data.Items);
        setOrders(response.data.Items);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getOrdersData(cartid);
  }, [cartid]);

  return (
    <div className="main_container">
      {orders && orders.length > 0 ? (
        orders.map((order, index) => (
          <OrderStatus
            key={index}
            id={order.orderId}
            items={order.items}
            status={order.orderStatus}
          />
        ))
      ) : (
        <span>{texttrack}</span>
      )}
    </div>
  );
}
