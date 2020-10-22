import React, { useState } from 'react'
import { Collapse ,Checkbox} from 'antd';

const { Panel } = Collapse;

function CheckBox(props) {

    const [Checked, setChecked] = useState([])

    const handleCheck=(value)=> {

        const currentIndex = Checked.indexOf(value)


        const newChecked = [...Checked]

        if(currentIndex === -1){
            newChecked.push(value)
        }else{
            newChecked.splice(currentIndex, 1)
        }
        setChecked(newChecked)
        props.handleFilters(newChecked)
    }

    const renderCheckBoxList=()=>props.list && props.list.map((item, i)=>(
        <React.Fragment key={i}>
        <Checkbox onChange={() => handleCheck(item._id)}
            checked={Checked.indexOf(item._id) === -1 ? false : true }/>
        <span>{item.name}</span> <br />
        </React.Fragment>
    ))

    return (
        <div>
            <Collapse defaultActiveKey={['0']}>
                <Panel header="Product" key="1">
                    {renderCheckBoxList()}
                </Panel>
            </Collapse>
        </div>
    )
}

export default CheckBox
