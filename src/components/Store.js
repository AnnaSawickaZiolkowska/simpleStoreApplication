import Products from "./Products";
import styled from "styled-components";
import useFetchData from "../hooks/useFetchData";
// import { useState } from "react";
import ShopInterface from "./ShopInterface";
import { useModal } from "../hooks/useModal";
import CartPage from "./CartPage";
import CloseIcon from "@material-ui/icons/Close";
// import { useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ProductsWrapper = styled.ul`
  list-style: none;
  padding: 40px 100px;
  display: grid;
  margin: 0;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: 430px;
  grid-gap: 20px;
`;
const ProductWrapper = styled.li`
  display: grid;
  justify-items: center;
  min-width: 290px;
  background-color: #f2f2f2;
  padding: 20px 10px 20px 30px;
  border-radius: 10px;
`;

const ModalWrapper = styled.section`
  height: 100vh;
  padding: 40px 100px;
`;
const CloseIconStyle = styled(CloseIcon)`
  font-size: large;
  width: 25px;
  height: 25px;
  float: right;
  text-align: right;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.5);
  margin: 12px 25px;
`;

const Store = () => {
  const [cart, setCart] = useLocalStorage("cartList", []);
  const { isOpen, openModal, closeModal } = useModal();
  const products = useFetchData();

  const addToCart = (id) => {
    setCart(
      cart.find((cartItem) => cartItem.id === id)
        ? cart.map((cartItem) =>
            cartItem === cart.find((cartItem) => cartItem.id === id)
              ? { ...cartItem, orderCount: cartItem.orderCount + 1 }
              : cartItem
          )
        : [...cart, { id, orderCount: 1 }]
    );
  };
  console.log(cart);

  const subtractFromCart = (id) => {
    setCart((cart) => {
      const exsistingItem = cart.find((cartItem) => cartItem.id === id);
      if (exsistingItem.orderCount > 1) {
        return cart.map((cartItem) =>
          cartItem === exsistingItem
            ? { ...cartItem, orderCount: cartItem.orderCount - 1 }
            : cartItem
        );
      } else {
        return cart.filter((cartItem) => cartItem !== exsistingItem);
      }
    });
  };

  const orderCount = cart.reduce(
    (sum, cartItem) => sum + cartItem.orderCount,
    0
  );

  const joinProductWithCart = (id) => {
    const item = products.find((product) => product.id === id);
    const cartItem = cart.find((cart) => cart.id === id);
    return { ...item, ...cartItem };
  };

  const cartItemsJoinedWithProducts = cart.map((cartItem) =>
    joinProductWithCart(cartItem.id)
  );

  if (isOpen === true) {
    return (
      <ModalWrapper>
        <CloseIconStyle onClick={closeModal} />
        <CartPage
          cartItemsJoinedWithProducts={cartItemsJoinedWithProducts}
          addToCart={addToCart}
          subtractFromCart={subtractFromCart}
        />
      </ModalWrapper>
    );
  }

  return (
    <div>
      <ShopInterface openModal={openModal} orderCount={orderCount} />
      <ProductsWrapper>
        {products &&
          products.map((product) => {
            return (
              <ProductWrapper key={product.id}>
                <Products
                  brand={product.brand}
                  name={product.name}
                  caption={product.caption}
                  unit={product.unit}
                  id={product.id}
                  price={product.price}
                  picture={product.pictures[0].small}
                  onBuyClick={(id) => addToCart(product.id)}
                />
              </ProductWrapper>
            );
          })}
      </ProductsWrapper>
    </div>
  );
};

export default Store;
