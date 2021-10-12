import React from "react";
import styled from "styled-components";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";

const CartItemStyle = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
`;
const CaptionStyle = styled.div`
  margin: 15px 0 0 70px;
  font-size: 14px;
`;
const OrderCountStyle = styled.div`
  padding: 10px 20px;
  width: 20px;
  border-radius: 50%;
  font-family: monospace;
  text-align: center;
  font-size: 16px;
`;

interface Props {
  brand: string;
  caption: string;
  price: number;
  picture: string;
  orderCount: number;
  onAddButton: Function;
  onMinusButton: Function;
  name?: string;
  unit?: string;
  id?: number;
}

  const CartItem: React.FC<Props> = ({
    brand,
    caption,
    price,
    picture,
    orderCount,
    onAddButton,
    onMinusButton,
  }) => {
  return (
    <>
      <CartItemStyle>
        <div style={{ width: "140px"}}>
          <img src={picture} alt="" style={{ height: "200px"}} />
        </div>
        <div style={{ width: "100%", marginRight: "90px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              padding: "0 20px",
            }}
          >
            <div style={{ margin: "5px 0 0 50px" }}>{brand}</div>
            <div>{price}</div>
          </div>
          <CaptionStyle>{caption}</CaptionStyle>
          <div style={{ margin: "100px 0 0 70px", display: "flex" }}>
            <button onClick={() => onAddButton()}>
              <AddIcon />
            </button>
            <OrderCountStyle>{orderCount}</OrderCountStyle>
            <button onClick={() => onMinusButton()}>
              <RemoveIcon />
            </button>
          </div>
        </div>
      </CartItemStyle>
    </>
  );
};

export default CartItem;
