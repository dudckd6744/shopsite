import React from 'react'
import {Descriptions, Button} from "antd";
import { useDispatch } from 'react-redux';
import { addToCart} from "../../../../_actions/user_actions";

function ProductInfo(props) {
    const dispatch = useDispatch();


    const clickHandle=()=>{

        dispatch(addToCart(props.detail._id))
    }

    return (
        <div style={{fontSize:"1rem", fontStyle:"oblique"}}>
            <Descriptions  layout="vertical" bordered="true" size="default" title="Product Info">
                <Descriptions.Item label="bbbbbb">{props.detail.price}</Descriptions.Item>
                <Descriptions.Item label="Sold">{props.detail.sold}</Descriptions.Item>
                <Descriptions.Item label="Views">{props.detail.views}</Descriptions.Item>
                <Descriptions.Item label="Description">{props.detail.description}</Descriptions.Item>
            </Descriptions>
            <br />
            <br />
            <div style={{ display:"flex", justifyContent:"center"}}>
                <Button size="large" shape="round" type="danger" onClick={clickHandle}>
                    Add to Cart
                </Button>
            </div>
        </div>
    )
}

export default ProductInfo
