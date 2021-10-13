import Products from "./Products";
import styled from "styled-components";
import useFetchData from "../hooks/useFetchData";
import ShopInterface from "./ShopInterface";
import { useModal } from "../hooks/useModal";
import CartPage from "./CartPage";
import CloseIcon from "@material-ui/icons/Close";
import useLocalStorage from "../hooks/useLocalStorage";
import { connect, useDispatch, useSelector } from "react-redux";

const ProductsWrapper = styled.ul`
  list-style: none;
  padding: 40px 0px;
  margin: 0 5%;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: 430px;
  grid-gap: 20px;
`;
const ProductWrapper = styled.li`
  display: grid;
  justify-items: center;
  min-width: 290px;
  max-width: 360px;
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

export interface IProducts {
  brand: string;
  name: string;
  caption: string;
  unit: string;
  id: number;
  price: number;
  picture?: string;
  pictures?: any;
  [index: number]: number;
  onBuyClick: React.MouseEventHandler;
}
interface ICartItem {
  id: number;
  orderCount: number;
}

const Store = () => {
  const [cart, setCart] = useLocalStorage("cartList", []);
  const { isOpen, openModal, closeModal } = useModal();

  const products: Array<IProducts> = useFetchData();

  const dispatch = useDispatch();
// const cartTest = useSelector(state => state.cartTest)

  // const {cart} = props;
  // console.log(props);

  const addToCart = (id: number) => {
    const exsistingItem = cart.find((cartItem: ICartItem) => cartItem.id === id);
    setCart(
      exsistingItem
        ? cart.map((cartItem: ICartItem) =>
            cartItem === exsistingItem
              ? { ...cartItem, orderCount: cartItem.orderCount + 1 }
              : cartItem
          )
        : [...cart, { id, orderCount: 1 }]
    );
  };

  const subtractFromCart = (id: number) => {
    const exsistingItem = cart.find((cartItem: ICartItem) => cartItem.id === id);
    setCart(
      exsistingItem.orderCount > 1
        ? cart.map((cartItem: ICartItem) =>
            cartItem === cart.find((cartItem: ICartItem) => cartItem.id === id)
              ? { ...cartItem, orderCount: cartItem.orderCount - 1 }
              : cartItem
          )
        : cart.filter((cartItem: ICartItem) => cartItem !== exsistingItem)
    );
  };

  const orderCount = cart.reduce(
    (sum: number, cartItem: ICartItem) => sum + cartItem.orderCount,
    0
  );

  const joinProductWithCart = (id: number) => {
    const item = products.find((product) => product.id === id);
    const cartItem = cart.find((cart: ICartItem) => cart.id === id);
    return { ...item, ...cartItem };
  };

  const cartItemsJoinedWithProducts = cart.map((cartItem: ICartItem) =>
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
          products.map((product: IProducts) => {
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
                  onBuyClick={(event: React.MouseEvent) => addToCart(product.id)}
                />
              </ProductWrapper>
            );
          })}
      </ProductsWrapper>
    </div>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     cart: state.cart
//   }
// }

// export default connect(mapStateToProps)(Store);
export default Store;