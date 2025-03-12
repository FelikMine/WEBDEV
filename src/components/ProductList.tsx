import React, { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import "../styles/ProductList.css";
import Row from 'react-bootstrap/Row';
import { useSelector } from "react-redux";
import { RootState } from '../app/store';

// interface Product {
//     id: number;
//     title: string;
//     description: string;
//     price: number;
//     image: string;
// }

interface TruncatedTextProps {
    text: string;
    maxLength: number;
    isBold: boolean;
}

const TruncatedText: React.FC<TruncatedTextProps> = ({ text, maxLength, isBold }) => {
    if (text.length <= maxLength) {
        return (
            <Card.Text style={isBold ? { fontWeight: 'bolder' } : { fontWeight: 'lighter' }} className="product-description">
                {text}
            </Card.Text>
        );
    }

    let truncatedText = text.slice(0, maxLength);
    const lastSpaceIndex = truncatedText.lastIndexOf(' ');
    if (lastSpaceIndex !== -1) {
        truncatedText = truncatedText.slice(0, lastSpaceIndex);
    }
    truncatedText += '...';

    return (
        <Card.Text style={isBold ? { fontWeight: 'bolder' } : { fontWeight: 'lighter' }} className="product-description">
            {truncatedText}
        </Card.Text>
    );
};

const ProductList = () => {

    const [cards, setCards] = useState<React.ReactElement[]>([]);

    const products = useSelector((state: RootState) => state.products.filterData);

    useEffect(() => {

        const cardItems = products.map((el) => (

            <Col key={el.id} xs={12} md={4} lg={3}>
                <Card id="card" style={{ marginBottom: '20px' }}>
                    <Card.Img variant="top" src={el.image} className="product-image"/>
                    <Card.Body>
                        <TruncatedText text={el.title} isBold={true} maxLength={60} />
                        <TruncatedText text={el.description} isBold={false} maxLength={60} />
                        <Card.Text>
                            {el.price} $
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>

        ));

        setCards(cardItems);

    }, [products]);

    return (
        <>
        <div id="products">
            <Row>
                {cards}
            </Row>
        </div>
        </>
    )
}

export default ProductList;