
import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Shell from './components/Layout/Shell';
import Dashboard from './pages/Dashboard';
import ProductList from './pages/Products/ProductList';
import ProductForm from './pages/Products/ProductForm';
import CategoryList from './pages/Categories/CategoryList';
import CategoryForm from './pages/Categories/CategoryForm';
import OrderList from './pages/Orders/OrderList';
import SettingsPage from './pages/Settings';
import ReviewList from './pages/Reviews/ReviewList';
import ReviewForm from './pages/Reviews/ReviewForm';
import ArticleList from './pages/Articles/ArticleList';
import ArticleForm from './pages/Articles/ArticleForm';
import UserList from './pages/Users/UserList';
import UserForm from './pages/Users/UserForm';
import LoginPage from './pages/Login';
import { ApiService } from './services/api';

/**
 * Helper component to apply CSS variables based on saved settings
 */
const ThemeInitializer: React.FC = () => {
  useEffect(() => {
    const initTheme = async () => {
      try {
        const settings = await ApiService.getSettings();
        if (settings && settings.theme) {
          const root = document.documentElement;
          
          const applyShades = (color: string, prefix: string) => {
            // Simplified shade generation logic
            const shades = {
                '50': color + '10',
                '100': color + '20',
                '200': color + '40',
                '300': color + '60',
                '400': color + '90',
                '500': color,
                '600': color + 'cc',
                '700': color + 'b3',
                '800': color + '99',
                '900': color + '80',
            };
            Object.entries(shades).forEach(([weight, val]) => {
                root.style.setProperty(`--${prefix}-${weight}`, val);
            });
          };

          applyShades(settings.theme.primaryColor, 'primary');
          applyShades(settings.theme.secondaryColor, 'secondary');
        }
      } catch (err) {
        console.error("Theme initialization failed", err);
      }
    };
    initTheme();
  }, []);

  return null;
};

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  useEffect(() => {
    ApiService.initialize();
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  if (!isLoggedIn) {
    return (
      <LanguageProvider>
        <ThemeInitializer />
        <LoginPage onLogin={handleLogin} />
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <ThemeInitializer />
      <HashRouter>
        <Shell onLogout={handleLogout}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/new" element={<ProductForm />} />
            <Route path="/products/edit/:id" element={<ProductForm />} />
            <Route path="/categories" element={<CategoryList />} />
            <Route path="/categories/new" element={<CategoryForm />} />
            <Route path="/categories/edit/:id" element={<CategoryForm />} />
            <Route path="/orders" element={<OrderList />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/reviews" element={<ReviewList />} />
            <Route path="/reviews/new" element={<ReviewForm />} />
            <Route path="/reviews/edit/:id" element={<ReviewForm />} />
            <Route path="/articles" element={<ArticleList />} />
            <Route path="/articles/new" element={<ArticleForm />} />
            <Route path="/articles/edit/:id" element={<ArticleForm />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/new" element={<UserForm />} />
            <Route path="/users/edit/:id" element={<UserForm />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Shell>
      </HashRouter>
    </LanguageProvider>
  );
};

export default App;
