import React, { useState } from 'react'
import { Input } from 'antd';
const { Search } = Input;



function Searches(props) {

    const [SearchTerm, setSearchTerm] = useState("")

    const onSearch=(e)=>{
        setSearchTerm(e.currentTarget.value)
        props.refreshFunction(e.currentTarget.value)
    }

    return (
        <div>
            <Search
            placeholder="input search text"
            enterButton="Search"
            onChange={onSearch}
            style={{ width: 240 }}
            value={SearchTerm}
            />
        </div>
    )
}

export default Searches
