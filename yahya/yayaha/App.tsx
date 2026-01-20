import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import VendorDashboard from "./pages/VendorDashboard";
import VendorProductsPage from "./pages/VendorProductsPage";
import VendorOrdersPage from "./pages/VendorOrdersPage";
import CheckoutPage from "./pages/CheckoutPage";
import AllCategoriesPage from "./pages/AllCategoriesPage";
import ListingPage from "./pages/ListingPage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import CartPage from "./pages/CartPage";
import AboutUsPage from "./pages/AboutUsPage";
import ArticlesPage from "./pages/ArticlesPage";
import DownloadPage from "./pages/DownloadPage";
import { AuthProvider, useAuth } from "./services/AuthContext";
import { CartProvider } from "./services/CartContext";

const ProtectedRoute: React.FC<{
  children: React.ReactNode;
  roles?: string[];
}> = ({ children, roles }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/auth" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/categories" element={<AllCategoriesPage />} />
              <Route path="/shop" element={<ListingPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/about" element={<AboutUsPage />} />
              <Route path="/articles" element={<ArticlesPage />} />
              <Route path="/download" element={<DownloadPage />} />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute roles={["customer"]}>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute roles={["customer"]}>
                    <CheckoutPage />
                  </ProtectedRoute>
                }
              />

              {/* Vendor Routes */}
              <Route
                path="/vendor"
                element={
                  <ProtectedRoute roles={["vendor"]}>
                    <VendorDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/vendor/products"
                element={
                  <ProtectedRoute roles={["vendor"]}>
                    <VendorProductsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/vendor/orders"
                element={
                  <ProtectedRoute roles={["vendor"]}>
                    <VendorOrdersPage />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
