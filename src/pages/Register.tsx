import Header from "../components/Header";
import { FormEvent, useState } from "react";
import Footer from "../components/Footer";
import { useDispatch } from 'react-redux';
import { setUserData } from '../app/userDataSlice';
import "../styles/Register.css";
import '../styles/global.css';

export default function Register() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');

    const dispatch = useDispatch();

  const handleSubmit = async (e:FormEvent) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userName, email, password }),
    });

    const data = await response.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      alert('Register successful!');
      dispatch(setUserData({ userName, email, password}))
    } else {
      alert('Register failed');
    }
  };

    return (
        <>
        <div id="wrapper">
            <Header />
            <div className="vw-100 d-flex flex-row justify-content-center align-items-center register">
            <form onSubmit={handleSubmit} className="mx-auto gap-4 px-1 py-4 w-50 d-flex flex-column justify-content-center align-items-center" >
                <h1> Registration </h1>
                <label htmlFor="name">Name</label>
                <input
                   className="w-75 p-1"
                   type="name"
                   placeholder=" input your name..."
                   value={userName}
                   onChange={(e) => setUserName(e.target.value)}
               />
               <label htmlFor="email">Email</label>
                <input
                    type="email"
                    className="w-75 p-1"
                    placeholder=" input your email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    className="w-75 p-1"
                    placeholder=" input your password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="btn px-4 btn-custom">Register</button>
                <a href="/login">Or go to autorization...</a>
                </form>
            </div>
            <Footer />
        </div>
        </>
    )
}