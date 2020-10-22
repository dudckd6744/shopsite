import React, { useEffect, useState } from 'react'
import {Col, Row, Card, Icon} from "antd";
import Axios from 'axios'
import Meta from 'antd/lib/card/Meta';
import ImageSilder from "../utils/ImageSilder";
import CheckBox from "../LandingPage/Sections/CheckBox";
import {ProductLists, Price} from "../LandingPage/Sections/datas";
import RadioBox from './Sections/RadioBox';
import Searches from './Sections/Searches';

function LandingPage() {

    const [products, setproducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setlimit] = useState(4)
    const [PostSize, setPostSize] = useState(0)
    const [Filters, setFilters] = useState({
        productlists:[],
        price: []
    })
    const [SearchTerm, setSearchTerm] = useState("")

    useEffect(() => {

        var body = {
            skip:Skip,
            limit:Limit
        }
        
        
        getProducts(body)
    }, [])

    const getProducts=(body)=>{
        Axios.post('/api/product/products',body)
        .then(response=> {
            if(response.data.success){
                if(body.lodemore){
                    setproducts([...products, ...response.data.product])
                }else{
                    setproducts(response.data.product)
                }
                setPostSize(response.data.PostSize)
            }else{
                alert("상품들을 가져오는데 실패하였습니다!!")
            }
        })
    }

    const onclickhandle =()=>{

        var skip = Skip+Limit;

        var body={
            skip: skip,
            limit:Limit,
            lodemore:true
        }
        getProducts(body)
        setSkip(skip)
    }

    const renderCards= products.map((item, i)=>{
        return <Col key={i} lg={6} md={8} xs={24}>
            <Card
                cover={<a href={`/product/${item._id}`}> <ImageSilder images ={item.images}/></a>}
            >
                <Meta
                    title={item.title}
                    description={`$${item.price}`}
                />
            </Card>
        </Col>
    })
    const showFilteredResults=(filter)=>{
        var body = {
            skip:0,
            limit:Limit,
            filters:filter
        }
        
        setSkip(0)
        getProducts(body)
    }
    const hadlePrice=(value)=>{
        const data = Price;
        var array = [];

        for (let key in data){
            if(data[key]._id === parseInt(value, 10)){
                array = data[key].array;
            }
        }

        return array;

    }

    const handleFilters=(filter, category)=>{

        const newFilters = {...Filters}

        newFilters[category] = filter

        if(category==="price"){
            var priceValues = hadlePrice(filter)
            newFilters[category] = priceValues
        }

        showFilteredResults(newFilters)
        setFilters(newFilters)
    }

    const updateSearch=(newSearch)=>{

        var body ={
            skip:0,
            limit:Limit,
            filters:Filters,
            searchTerm: newSearch
        }
        getProducts(body)
        setSkip(0)
        setSearchTerm(newSearch)
        console.log(newSearch)

    }


    return (
        <div style={{ width:"75%", margin:"3rem auto"}}>
            <div style={{textAlign:"center"}}>
                <h1 style={{color:"whitesmoke", fontStyle:"oblique"}}>사진 목록  <Icon type="gift"/></h1>
                <hr />
            </div>

            {/* Filter */}
            <Row gutter={[16,16]}>
            {/* checkBOx */}
            <Col lg={12} xs={24}>
            < CheckBox list={ProductLists} handleFilters={filter => handleFilters(filter, "productlists")}/>
            </Col>
            {/* RadioBox */}
            <Col lg={12} xs={24}>
            <RadioBox list={Price} handleFilters={filter => handleFilters(filter, "price")}/>
            </Col>
            </Row>
            {/* search */}
            <div style={{display:"flex", justifyContent:"flex-end", margin:"1rem auto"}}>
            <Searches 
                refreshFunction={updateSearch}
            />
            </div>
            {/* Cards */}
            <Row gutter={[16,16]}>
                {renderCards}
            </Row>
            <br />
            {PostSize >= Limit &&
                <div style={{ display:"flex", justifyContent:"center"}}>
                    <button onClick={onclickhandle}>더 보기</button>
                </div>
            }
        </div>
    )
}

export default LandingPage
