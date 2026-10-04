import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      const totalPrice = cartList.reduce(
        (sum, eachObject) => sum + eachObject.price * eachObject.quantity,
        0,
      )

      return (
        <div className="cart-summary-container">
          <div className="cart-summary">
            <h1 className="order-total">Order Total: Rs {totalPrice}/-</h1>
            <p className="items-in-cart">{cartList.length} items in cart</p>
          </div>
          <button type="button" className="checkout-button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
