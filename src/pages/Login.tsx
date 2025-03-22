import Header from "../components/Header";
import Footer from "../components/Footer";
import { FormEvent, useState } from "react";
import "../styles/Login.css";
import '../styles/global.css';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const getMessage = async () => {
        const response = await fetch("http://localhost:3000/message");
        const json = response.json();

        // const response2 = await fetch(`http://localhost:3000/user?email=${email}`);
        // const json2 = response2.json();
        // console.log(json2);
        console.log(json);

        try {
            const response2 = await fetch(`http://localhost:3000/user?email=test@example.com`);

            // Логируем статус и текст ответа
            console.log('Status:', response2.status);
            const text = await response2.text(); // Читаем ответ как текст
            console.log('Response text:', text);

            if (!response2.ok) {
                throw new Error(`HTTP error! status: ${response2.status}`);
            }

            const json2 = await response2.json(); // Парсим JSON
            console.log('User data:', json2);
        } catch (error) {
            console.error('Error fetching user:', error);
        }

    }

    getMessage();

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault();

        const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (data.token) {
        localStorage.setItem('token', data.token);
        alert('Login successful!');
        } else {
        alert('Login failed');
        }
    };

    return (
        <>
        <div id="wrapper">
            <Header />
            <div className="login vw-100 d-flex flex-row justify-content-center align-items-center">
            <form onSubmit={handleSubmit} className="mx-auto gap-4 px-1 py-4 w-50 d-flex flex-column justify-content-center align-items-center" >
                <h1> Autorization </h1>
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
                <button type="submit" className="btn px-4 btn-custom">Login</button>
                <a href="/register">Or go to registration...</a>
                </form>
            </div>
            <Footer />
        </div>
        </>
    )
}