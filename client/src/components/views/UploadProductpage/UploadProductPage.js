import React, { useState } from 'react'
import {Input, Form, Typography, message, Button} from 'antd';
import FileUpload from "../utils/FileUpload"
import Axios from 'axios';

const {Title} = Typography;
const {TextArea} = Input;

const ProductLists= [
    {key:1, value:"Car"},
    {key:2, value:"Animals"},
    {key:3, value:"People"},
    {key:4, value:"Products"}
]

function UploadProductPage(props) {

    const [ProductName, setProductName] = useState("")
    const [Desc, setDesc] = useState("")
    const [Price, setPrice] = useState(0)
    const [ProductList, setProductList] = useState(0)
    const [Images, setImages] = useState([])

    const onTitle =(e)=>{
        setProductName(e.currentTarget.value)
    }
    const onDesc=(e)=>{
        setDesc(e.currentTarget.value)
    }
    const onPrice=(e)=>{
        setPrice(e.currentTarget.value)
    }
    const onProductList=(e)=>{
        setProductList(e.currentTarget.value)
    }
    const updateImages=(newImage)=>{
        setImages(newImage)
    }
    const onSubmitHandle=(e)=>{
        e.preventDefault();

        if(!ProductName || !Desc || !Price || !ProductList || !Images){
            return alert(" 모든 값을 넣어주셔야 합니다!!")
        }

        var body={
            writer:props.user.userData._id,
            title:ProductName,
            description: Desc,
            price:Price,
            productlists:ProductList,
            images:Images
        }
        Axios.post('/api/product',body)
        .then(response=> {
            if(response.data.success){
                console.log(response.data)
                message.success("상품 업로드에 성공하셨습니다.")
                setTimeout(() => {
                    props.history.push('/')
                }, 2000);
            }else{
                alert("상품 업로드에 실패하였습니다.!")
            }
        })

    }

    return (
        <div style={{  maxWidth:"700px", margin: "2rem auto"}}>
            <div style={{textAlign:"center", marginBottom:"2rem"}}>
                <Title style={{color:"wheat"}} level={2}> 상품 업로드 </Title>
            </div>
            <hr />
            <Form onSubmit={onSubmitHandle}>

                <FileUpload refresh={updateImages} />

                <br />
                <br />
                <label style={{color:"whitesmoke"}}>이름</label>
                <Input value={ProductName} onChange={onTitle} />
                <br />
                <br />
                <label style={{color:"whitesmoke"}}>설명</label>
                <TextArea value={Desc} onChange={onDesc} />
                <br />
                <br />
                <label style={{color:"whitesmoke"}}>가격</label>
                <Input type="number" value={Price} onChange={onPrice} />
                <br />
                <br />
                <select vaule={ProductList} onChange={onProductList}>
                    {ProductLists.map((item, i)=>(
                        <option key={i} value={item.key}>{item.value}</option>
                    ))}
                </select>
                <br />
                <br />
                <Button type="primary" onClick={onSubmitHandle}
                style={{fontSize:"1rem", fontStyle:"italic"}} >
                    확인
                </Button>
            </Form>
        </div>
    )
}

export default UploadProductPage
