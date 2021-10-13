import * as React from 'react';
import {render} from "./testUtils"
import Dropdown from "../src/components/Dropdown"
import Footer from "../src/components/Footer"

test('dropdown renders', () => {
    const dropdown = render(<Dropdown menuItems={["Item1, Item2"]}/>);
    dropdown.debug()
    expect(dropdown).toBeDefined()
});
/*
 test('dropdown items are selectable', () =>{
    render(<Dropdown test-id="dropdown" menuItems={["Item1, Item2"]}/>);
}) */