import React, {useState} from "react";

function CartCard({sneaker, onRemove}) {
    const [amountInCart, setAmountInCart] = useState(sneaker.numberInCart);

    function handleChange(e) {
        if (e.target.value <= sneaker.quantity) {
            fetch(`http://localhost:4000/sneakers/${sneaker.id}`, {
                method: "PATCH",
            headers:
            {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                "numberInCart": parseInt(e.target.value)
            })
            })
            .then(response => response.json())
            .then((item) => {
                setAmountInCart(item.numberInCart)
            });
        }
        else {
            alert("Not enough shoes in stock to fulfill the request!")
        }
    };

    function handleRemove(e) {
        onRemove(sneaker);
    }

    return (
        <tr>
            <td>{sneaker.colorway} {sneaker.brand} {sneaker.model}</td>
            <td>
                <img src={sneaker.imageUrl} alt={sneaker.brand + ' ' + sneaker.model} />
            </td>
            <td>{sneaker.price}</td>
            <td>
                <input type="number" name="quantity" value={amountInCart} onChange={handleChange}/>
            </td>
            <td>
                <button onClick={handleRemove}>Remove from cart</button>
            </td>
        </tr>
    )
};

export default CartCard;