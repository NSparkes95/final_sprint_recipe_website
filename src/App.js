import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DetailsPage from './pages/DetailsPage';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import FavoritesPage from './pages/FavoritesPage';
import Footer from './components/Footer';
import CartPage from './pages/CartPage';
import { FavoritesProvider } from './Context/FavoritesContext';
import './styles/App.css';

function App() {
  return (
    <FavoritesProvider> {/* Wrap the app in FavoritesProvider */}
      <Router>
        <Header />
        <div className="main-background">
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/details/:id" element={<DetailsPage />} />
              <Route path="/favourites" element={<FavoritesPage />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
            <Footer />
          </main>
        </div>
      </Router>
    </FavoritesProvider>
  );
}

export default App;