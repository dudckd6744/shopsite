import React from 'react'

function HistoryPage(props) {
    return (
        <div style={{width:"75%", margin:" 3rem auto"}}>
            <div style={{textAlign:"center"}}>
                <h1>History</h1>
            </div>
                <table>
                    <thead>
                        <tr>
                            <th>Payment Id</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Date Of Purchase</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.user.userData && props.user.userData.history &&
                        props.user.userData.history.map((item,i)=>(
                            <tr key={i}>
                                <td>{item.paymentId}</td>
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                                <td>{item.dateOfPurchase}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        </div>
    )
}

export default HistoryPage
