import React from "react";
import styled from "styled-components";
import CartItem from "./CartItem";

const HeaderStyle = styled.header`
display: flex;
justify-content: space-between;
margin 20px;
margin-top: 60px;
padding: 15px 50px 15px 95px;
border-top: 1px solid lightgrey;
border-bottom: 1px solid lightgrey;
`;

// interface Props {
//   addToCart: Function;
//   subtractFromCart: Function;
//   cartItemsJoinedWithProducts: any;

// }

// const CartPage: React.FC<Props> = ({
  const CartPage = ({
  addToCart,
  subtractFromCart,
  cartItemsJoinedWithProducts,
}) => {

  return (
    <div>
      <HeaderStyle>
        <span>Szczegóły produktu</span>
        <span>Cena za 1 szt.</span>
      </HeaderStyle>
      {cartItemsJoinedWithProducts.map((cartItem, index) => (
        <div key={index}>
          <main style={{ marginBottom: "30px", width: "100%", borderBottom: "1px solid lightgrey", paddingBottom: "20px"}}>
            <CartItem
              brand={cartItem.brand}
              name={cartItem.name}
              caption={cartItem.caption}
              unit={cartItem.unit}
              id={cartItem.id}
              price={cartItem.price}
              picture={cartItem.pictures[0].small}
              orderCount={cartItem.orderCount}
              onAddButton={() => addToCart(cartItem.id)}
              onMinusButton={() => subtractFromCart(cartItem.id)}
            />
          </main>
        </div>
      ))}
    </div>
  );
};

export default CartPage;
