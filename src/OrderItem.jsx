
const OrderItem = ({ item}) => {
  return (
    <div>
     {    item.menuItems.map((menuItem) => (
            <li key={menuItem._id}>
              {menuItem.product.title} (x{menuItem.quantity}) - $
              {menuItem.product.price.toFixed(2)}
            </li>
          ))}
    </div>
  )
}

export default OrderItem