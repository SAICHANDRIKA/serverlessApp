import React, { useState } from "react";
import axios from "axios";

export default function Form() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);

  function handleChange(event) {
    const inputValue = event.target.value;
    const stateField = event.target.name;
    if (stateField === "name") {
      setName(inputValue);
    } else {
      setQuantity(inputValue);
    }
    console.log(stateField, inputValue);
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post(
        "https://osnp68cpfk.execute-api.us-east-1.amazonaws.com/default/serverlessappfunction",
        { name: name, quantity: quantity, pid: "1" },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setName("");
        setQuantity(0);
        console.log("response ", response);
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product name:</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={name}
            required
          />

          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            onChange={handleChange}
            value={quantity}
            min="1"
          />
        </div>
        <button type="submit">Submit Order</button>
      </form>
    </div>
  );
}
