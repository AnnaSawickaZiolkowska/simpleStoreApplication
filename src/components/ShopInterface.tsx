import React from "react";
import styled from "styled-components";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

const ShopInterfaceWrapper = styled.div`
  margin-top: 20px;
  padding: 0 100px;
  height: 30px;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
`;
interface Props {
  openModal: React.MouseEventHandler;
  orderCount: number;
}

const ShopInterface: React.FC<Props> = ({ openModal, orderCount }) => {
  return (
    <ShopInterfaceWrapper onClick={openModal}>
      <div>Przejdź do koszyka</div>
      <IconButton aria-label="cart">
        <StyledBadge badgeContent={orderCount} color="secondary">
          <ShoppingCartIcon />
        </StyledBadge>
      </IconButton>
    </ShopInterfaceWrapper>
  );
};

export default ShopInterface;
