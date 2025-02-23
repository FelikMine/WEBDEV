import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import '../styles/Searcher.css';
import React, {useState, useEffect} from 'react';

export default function Searcher() {

    const [productsData, setProductsData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [nowCategory, setNowCategory] = useState("Category");
    const [dropdown, setDropdown] = useState([]);

    useEffect( () => {

        fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => {

            setProductsData(data)
            const uniqueCategories = new Set(data.map(el => el.category));
            setCategories(uniqueCategories);
        });
    }, [])

    // const categories = new Set();
    // categories.add([])

    useEffect( () => {

        const items = Array.from(categories).map((category) => (
            <Dropdown.Item key={category} eventKey={category} onSelect={HandleSelect}>
                {category}
            </Dropdown.Item>
        ));

        setDropdown(items);

    }, [categories])

    const HandleSelect = (category) => {
        setNowCategory(category);
    }

    return (
        <>
        <div id="searcher">
            <DropdownButton id="dropdown-basic-button" onSelect={HandleSelect} title={nowCategory}>
                {dropdown}
            </DropdownButton>

            <input type="text" placeholder='search'/>

            <DropdownButton id="dropdown-basic-button" title="Filter">
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </DropdownButton>

        </div>
        </>
    )
}