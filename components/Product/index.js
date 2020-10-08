import React from "react";

const Product = ({ data }) => {
  const { name, price, available, weight, solds } = data;
  return (
    <tr>
      <td className="border px-4 py-2">{name}</td>
      <td className="border px-4 py-2">{price}</td>
      <td className="border px-4 py-2">{available}</td>
      <td className="border px-4 py-2">{weight}</td>
      <td className="border px-4 py-2">{solds}</td>
    </tr>
  );
};

export default Product;
