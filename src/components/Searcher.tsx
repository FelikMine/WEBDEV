import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import '../styles/Searcher.css';
import React, {useState, useEffect} from 'react';
import { useSelector } from "react-redux";
import { RootState } from '../app/store';

// type SelectCallback  = {
//     eventKey: string | null,
//     e: React.SyntheticEvent<unknown>,
// }

export type SelectCallback = (
    eventKey: string | null,
    e?: React.SyntheticEvent<unknown, Event>
) => void;

interface SearcherProps {
    // categories: Set<string>;
    // nowCategory: string;
    // (category: string) => void
    onSelect: SelectCallback;
}

export default function Searcher({onSelect} : SearcherProps) {

    const [dropdown, setDropdown] = useState<React.ReactElement[]>([]);

    const categories = useSelector((state: RootState) => state.products.categories);
    const nowCategory = useSelector((state: RootState) => state.products.nowCategory);

    useEffect(() => {
        const items = Array.from(categories).map((category) => (
            <Dropdown.Item key={category} eventKey={category}>
                {category}
            </Dropdown.Item>
        ));
        setDropdown(items);
        console.log(items, categories, 'категории');

    }, [categories, onSelect]);


    return (
        <>
        <div id="searcher">
            <DropdownButton id="dropdown-basic-button" onSelect={onSelect} title={nowCategory}>
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