import {React, useState} from "react";
import {Select, MenuItem} from "@mui/material/";
import { useDispatch } from "react-redux";

const Dropdown = ({menuItems}) => {
    const [selected, setSelected] = useState(menuItems[0])
    const dispatch = useDispatch()

    const changeSelected = (event) => {
        console.log(event)
        setSelected(event.target.value)
        dispatch(dropDownSwitchValueCall(event.target.value))
    }

    return (
        <Select
        labelId="hierarchy-selector"
        id="hierarchy-select"
        value={selected}
        onChange={changeSelected}
        >
            {menuItems.map((item) => {
                return <MenuItem key={item} value={item}>{item}</MenuItem>
            }
             ) }
        </Select>
    )
}

export const dropDownSwitchValueCall = data => {
    return {
        type: 'SWITCH_HIERARCHY',
        payload: data
    };
};

export default Dropdown
