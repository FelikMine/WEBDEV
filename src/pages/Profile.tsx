import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSelector, useDispatch} from "react-redux";
import { setUserData } from "../app/userDataSlice";
import { RootState } from '../app/store';
import { Link } from "react-router";
import image from "../assets/profile_photo.svg"
import '../styles/Profile.css';
import '../styles/global.css';

export default function Profile() {

    const userData = useSelector((state: RootState) => state.userData);
    const dispatchData = useDispatch();

    function HandleExit() {
        localStorage.removeItem('token');
        dispatchData(setUserData({
            userName: "default",
            password: "default",
            email: "default"
        }))
        window.location.reload();
    }

    console.log(userData);

    return (
        <>
        <div id="wrapper">
            <Header />
            <div id="content">
                <div id="searcher">
                    <div className="searcher__title d-flex flex-row">
                        <h1>Your personal page</h1>
                        <h2> Favorites </h2>
                        <h2> In card </h2>
                        <h2> Exit account </h2>
                    </div>
                </div>

                <div id="profile">

                    <div className="upper-container d-flex flex-row">

                        <div className="profile__data">
                            <div className="profile__data__image d-flex align-items-center justify-content-center">
                                <img src={image} alt="profile photo" />
                            </div>
                        </div>

                        <div className="profile__favorites">
                            <Link to="/favorites"> <button> Go to favorites</button></Link>
                            <p> In favorites you have x supplies:</p>
                            <ul>
                                <li>Monitor</li>
                                <li>Monitor</li>
                                <li>Monitor</li>
                                <li>Monitor</li>
                            </ul>
                            <hr className="first-line"/>
                        </div>

                        <div className="profile__card">
                            <Link to="/card"> <button> Go to card</button></Link>
                            <p> In card you have x supplies:</p>
                            <ul>
                                <li>Monitor</li>
                                <li>Monitor</li>
                                <li>Monitor</li>
                                <li>Monitor</li>
                            </ul>
                            <hr className="last-line"/>
                        </div>

                        <div className="profile__exit d-flex flex-column">
                                <button onClick={HandleExit}> Exit</button>
                        </div>
                    </div>

                    <div className="bottom-container d-flex flex-row">

                        <div className="profile__person">
                            <p>Name: {userData.userName}</p>
                            <p>Password: {userData.password}</p>
                            <p>Email: {userData.email}</p>
                        </div>

                        <div className="profile__text">
                            <p> Sum of x supplies: </p>
                            <span>sum $</span>
                        </div>

                        <div className="profile__text">
                            <p> Sum of x supplies: </p>
                            <span>sum $</span>
                        </div>

                        <div>

                        </div>
                    </div>

                </div>
            </div>
        <Footer />
    </div>
    </>
    )
}