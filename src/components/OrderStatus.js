import React from "react";
import { Table } from "react-bootstrap";

export default function OrderStatus({ id, status, items }) {
  return (
    <div className="container padding-bottom-3x mb-1">
      <div className="card mb-3">
        <div className="p-4 text-center text-white text-lg bg-dark rounded-top">
          <span className="text-uppercase">Tracking Order No - </span>
          <span className="text-medium">{id}</span>
        </div>
        <div className="d-flex flex-wrap flex-sm-nowrap justify-content-between py-3 px-2 bg-secondary">
          <div className="w-100 text-center py-1 px-2">
            <span className="text-medium">Status : {status} </span>
          </div>
        </div>
        <div className="card-body">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>SKU</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {items &&
                items.map((order, index) => (
                  <tr key={index}>
                    <td>{order.SKU}</td>
                    <td>{order.name}</td>
                    <td>{order.quantity}</td>
                    <td>{order.total}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
