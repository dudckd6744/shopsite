import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery';


function ProductImage(props) {

    const [Images, setImages] = useState([])
    
    useEffect(() => {

        if(props.detail && props.detail.images){

            var images=[]

            props.detail.images.map(item=>{
                images.push({
                    original: `http://54.180.113.32/${item}`,
                    thumbnail: `http://54.180.113.32/${item}`
                })
            })
            setImages(images)
        }
    }, [props.detail])

    return (
        <div>
            <ImageGallery items={Images} />
        </div>
    )
}

export default ProductImage
