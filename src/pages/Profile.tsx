import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { RootState } from '../app/store';
import '../styles/global.css';

export default function Profile() {

    const userData = useSelector((state: RootState) => state.userData);

    console.log(userData);


    return (
        <>
        <div id="wrapper">
            <Header />
            <div>
                <h1> Profile</h1>
                <h2>Name: {userData.userName}</h2>
                <h3>Password: {userData.password}</h3>
                <h4>Email: {userData.email}</h4>
            </div>
            <Footer />
        </div>
        </>
    )
}