import React, { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import "../styles/ProductList.css";
import Row from 'react-bootstrap/Row';

export default function ProductList ({products}) {

    const [cards, setCards] = useState([]);

    function TruncatedText({ text, maxLength }) {

        if (text.length <= maxLength){
            return <Card.Text className="product-description">{text}</Card.Text>; //Текущий текст
        }

        let truncatedText = text.slice(0, maxLength);

        const lastSpaceIndex = truncatedText.lastIndexOf(' ');
        if (lastSpaceIndex !== -1) {
            truncatedText = truncatedText.slice(0, lastSpaceIndex);
        }

        truncatedText += '...';

        return <Card.Text className="product-description">{truncatedText}</Card.Text>;
    }

    useEffect(() => {

        const cardItems = products.map((el) => (
            <Col key={el.id} xs={12} md={4} lg={3}>
                <Card id="card" style={{ marginBottom: '20px' }}>
                    <Card.Img variant="top" src={el.image} className="product-image"/>
                    <Card.Body>
                        {/* <Card.Title>{el.title}</Card.Title> */}
                        <TruncatedText text={el.title} maxLength={60} />
                        <TruncatedText text={el.description} maxLength={60} />
                        <Card.Text>
                            {el.price}
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

            {/* <Row xs={1} md={2} className="g-4">
            {Array.from({ length: 4 }).map((_, idx) => (

            ))}
            </Row> */}

        </div>
        </>
    )
}