import React from "react";
import { products } from "/Users/sai/serverlessApp/src/data.js";
import ProductRow from "/Users/sai/serverlessApp/src/components/ProductRow.js";


export default function Products() {
  return (
    <div className="container main-content">
      {products.map((product, index) => {
        return (
          <ProductRow
            key={index}
            id={product.SKU}
            image={process.env.PUBLIC_URL + "/images/logo1.jpeg"}
            name={product.productUniqueName}
            description={product.description}
            price={product.cost}
            sellerid={product.SellerID}
          />
        );
      })}
    </div>
  );
}
