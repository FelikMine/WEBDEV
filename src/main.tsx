import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor  } from './app/store'
import { BrowserRouter, Routes, Route } from "react-router";
import App from './pages/App.tsx';
import StartPage from './pages/StartPage.tsx';
import Card from "./pages/Card.tsx";
import Profile from './pages/Profile.tsx';
import Favorites from './pages/Favorites.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import PrivateRoute from './components/PrivateRoute.tsx';

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
         <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <Routes>
                    <Route path="/products" element={<App />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                    <Route path="/card" element={<Card />} />
                    <Route path="/main" element={<StartPage />} />
                    <Route path="/" element={<StartPage />} />
                </Routes>
            </BrowserRouter>
        </PersistGate>
    </Provider>,
)
