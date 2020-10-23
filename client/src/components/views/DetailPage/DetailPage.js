import React, { useState, useEffect } from 'react'
import {Row , Col} from "antd";
import Axios from 'axios'
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';

function DetailPage(props) {

    const productId = props.match.params.pageId

    const [Products, setProducts] = useState({})

    useEffect(() => {

        var body={
            id : productId,
            type:"single"
        }


        Axios.post('/api/product/getProduct' ,body)
        .then(response=>{
                console.log(response.data[0])
                setProducts(response.data[0])
        })
        .catch(err => alert(err))

    }, [])


    return (
        <div style={{ width:"100%", padding:"3rem 4rem"}}>
            <div style={{display:"flex", justifyContent:"center"}}>
                <h1 style={{fontStyle:"oblique", color:"lightcoral", fontSize:"3rem"}} >{Products.title}</h1>
            </div>

            <Row gutter={[16, 16]}>
                <Col lg={12} sm={24}>
                    <ProductImage detail={Products}/>
                </Col>
                <Col lg={12} sm={24}>
                    <ProductInfo detail={Products}/>
                </Col>
            </Row>
        </div>
    )
}

export default DetailPage
