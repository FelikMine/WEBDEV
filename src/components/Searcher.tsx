import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import '../styles/Searcher.css';
import {useState, useEffect} from 'react';

interface SearcherProps {
    categories: Set<string>;
    nowCategory: string;
    onSelect: (category: string) => void;
}

export default function Searcher({ categories, nowCategory, onSelect} : SearcherProps) {

    const [dropdown, setDropdown] = useState<React.ReactElement[]>([]);

    useEffect(() => {
        const items = Array.from(categories).map((category) => (
            <Dropdown.Item key={category} eventKey={category}>
                {category}
            </Dropdown.Item>
        ));
        setDropdown(items);
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