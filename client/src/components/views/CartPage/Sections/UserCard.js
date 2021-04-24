import React from 'react'
import "./UserCard.css"


function UserCard(props) {

    const renderImages=(images)=>{
        if(images.length>0){
            var image= images[0]
            return `http://54.180.113.32:5000/${image}`
        }
    }

    const renderCart =()=>(
        props.products && props.products.map((product, i)=>(
            <tr key={i}>
                <td>
                    <img style={{width:"75px"}} src={renderImages(product.images)} alt="products"/>
                </td>
                <td>{product.quantity}</td>
                <td>{product.price}</td>
                <td>
                    <button style={{borderRadius:"10px", fontSize:"13px"}}
                    onClick={()=>props.removeCart(product._id)}>Remove</button>
                </td>
            </tr>
        ))
    )

    return (
        <div>
            <table>
                <thead>
                    <tr style={{color:"peru" ,fontStyle:"oblique"}}>
                        <th>Product Image</th>
                        <th>Product Quantity</th>
                        <th>Product Price</th>
                        <th>Product from Cart</th>
                    </tr>
                </thead>

                <tbody>
                    {renderCart()}
                </tbody>
            </table>
        </div>
    )
}

export default UserCard
