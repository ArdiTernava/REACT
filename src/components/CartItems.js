import React, { useEffect, useState } from 'react';

function CartItems({ setItems }) {
  const [localItems, setLocalItems] = useState([]);
  console.log(localItems.length)

  useEffect(() => {
    const storedItems = localStorage.getItem('cart') === null ? [] : JSON.parse(localStorage.getItem('cart'));
    setLocalItems(storedItems);
  }, [setItems]);

  const deleteCartItem = (index) => {
    const cartItems = [...localItems];
   

    if (cartItems.length ) {
      cartItems.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cartItems));
      setLocalItems(cartItems);
      setItems(cartItems);
    }
  };

  const increaseQuantity = (index) => {
    const cartItems = [...localItems];

    if (cartItems.length > 0 && cartItems[index]) {
      cartItems[index].qty += parseInt(1);
      localStorage.setItem('cart', JSON.stringify(cartItems));
      setLocalItems(cartItems);
      setItems(cartItems);
     
    }
  };

  const decreaseQuantity = (index) => {
    const cartItems = [...localItems];

    if (cartItems.length > 0 && cartItems[index] && cartItems[index].qty > 1 ) {
      cartItems[index].qty -= 1;
      localStorage.setItem('cart', JSON.stringify(cartItems));
      setLocalItems(cartItems);
      setItems(cartItems);
    }else{
      

      
    }
  };

  return (
    <div className="container-column p-60">
      <h3>Cart items</h3>

    <span className='countItems'>All items ({localItems.length})</span>
      {localItems && localItems.length ? (
        <table className='cartTable'>
          <tbody>
            <tr>
              <td>#</td>
              <td>Title</td>
              <td>Qty</td>
              <td>Delete</td>
            </tr>
            {localItems.map((item, index) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>
                  <button className='buttonQty' onClick={() => decreaseQuantity(index)}>-</button>
                  <span>{item.qty}</span>
                  <button className='buttonQty' onClick={() => increaseQuantity(index)}>+</button>
                </td>
                <td>
                  <button  className='buttonDelete' onClick={() => deleteCartItem(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Cart is empty!</p>
      )}
    </div>
  );
}

export default CartItems;

