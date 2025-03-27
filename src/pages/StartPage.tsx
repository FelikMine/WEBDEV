import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router";
import '../styles/global.css';
import "../styles/Login.css";

export default function StartPage() {

    return (
        <>
        <div id='wrapper'>
            <Header />
            <div className="login vw-100 d-flex flex-row justify-content-center align-items-center">
            <div className="mx-auto gap-4 px-5 py-5 w-75 d-flex flex-column justify-content-center align-items-center" >
                <h1> Welcome to our online store </h1>
                <p>
                In our online store you can buy popular products at low prices or find rare items that have not yet appeared in other marketplaces!
                </p>
                <p>
                We closely monitor prices and the currency index. Thus, we offer special offers and promotions for regular customers.
                </p>
                <p>
                The application has a simple and intuitive user interface. Therefore, you will enjoy interacting and making cool purchases. Come to our store through a simple registration form and order your favorite products!
                </p>
                <button className="btn px-4 btn-custom">
                    <Link to="/products">Get started</Link>
                </button>
                </div>
            </div>
            <Footer />
        </div>
        </>
    )
}