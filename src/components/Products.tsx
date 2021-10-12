import React from "react";
import styled from "styled-components";
import { IProducts } from "./Store";

const CaptionStyle = styled.span`
  font-size: 10px;
  padding: 30px;
`;
const BasketButtonStyle = styled.button`
  background-color: white;
  border: 1px solid black;
  border-radius: 15px;
  padding: 5px 10px;
  font-size: 12px;
  font-weight: bold;
  font-family: Arial;
    &:hover {
      background-color: black;
      border: 1px solid white;
      color: white;
    }
`;
const FlexCenterStyle = styled.div`
  display: flex;
  align-items: flex-end;
  // justify-content: center;
  justify-self: flex-start;
`;

// interface Props {
//   caption: string;
//   id: Number;
//   price: Number;
//   picture: string;
//   onBuyClick: React.MouseEventHandler;
//   brand: string;
//   name: string;
// }

  const Products: React.FC<IProducts> = ({ 
caption, id, price, picture, onBuyClick }) => {

  return (
    <>
      <FlexCenterStyle>
        <img src={picture} alt="" />
        <CaptionStyle>
          {caption} {id}
        </CaptionStyle>
      </FlexCenterStyle>
      <FlexCenterStyle>
        <BasketButtonStyle onClick={onBuyClick}>
          Dodaj do koszyka
        </BasketButtonStyle>
        <FlexCenterStyle style={{ marginLeft: "80px" }}>
          {price} PLN
        </FlexCenterStyle>
      </FlexCenterStyle>
    </>
  );
};

export default Products;
