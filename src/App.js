import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = productObject => {
    const {cartList} = this.state

    const product = cartList.find(
      eachProduct => eachProduct.id === productObject.id,
    )

    if (product === undefined) {
      this.setState({cartList: [...cartList, productObject]})
    } else {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachProduct => {
          if (product.id === eachProduct.id) {
            return {
              ...eachProduct,
              quantity: eachProduct.quantity + productObject.quantity,
            }
          }
          return eachProduct
        }),
      }))
    }
  }

  removeCartItem = productId => {
    const {cartList} = this.state

    const updatedCartList = cartList.filter(
      eachProduct => eachProduct.id !== productId,
    )

    this.setState({cartList: updatedCartList})
  }

  incrementCartItemQuantity = productId => {
    const {cartList} = this.state

    const updatedCartList = cartList.map(eachProduct => {
      if (eachProduct.id === productId) {
        return {
          ...eachProduct,
          quantity: eachProduct.quantity + 1,
        }
      }
      return eachProduct
    })

    this.setState({cartList: updatedCartList})
  }

  decrementCartItemQuantity = productId => {
    const {cartList} = this.state

    const updatedCartList = cartList.map(eachProduct => {
      if (eachProduct.id === productId) {
        return {
          ...eachProduct,
          quantity: eachProduct.quantity - 1,
        }
      }
      return eachProduct
    })

    const filteredCartList = updatedCartList.filter(
      eachProduct => eachProduct.quantity !== 0,
    )

    this.setState({cartList: filteredCartList})
  }

  removeAllCartItems = () => this.setState({cartList: []})

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
