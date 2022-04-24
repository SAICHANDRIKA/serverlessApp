import React, { useState } from "react";
import { Button} from "react-bootstrap";

export default function CartProduct({ product, onChangeCallback }) {
  const [quantity, setQuantity] = useState(product.quantity);

  function handleIncerement() {
    onChangeCallback(product.SKU, quantity + 1);
    setQuantity(quantity + 1);

  }

  function handleDecrement() {
    if (quantity > 0) {
      onChangeCallback(product.SKU, quantity - 1);
      setQuantity(quantity - 1);
    } else {
      onChangeCallback(product.SKU, 0);
      setQuantity(0);
    }
  }

  return (
    <>
   
    <tr key={product.SKU}>
      <td>
        {product.SKU} 
      </td>
      <td>{product.name}</td>
      <td colSpan={1}>
      <Button onClick={handleIncerement}>+</Button>
      &nbsp; &nbsp;{quantity} &nbsp; &nbsp;
      <Button onClick={handleDecrement}>-</Button></td>
      <td>{product.total} </td>
    </tr>
    </>
  );
}
