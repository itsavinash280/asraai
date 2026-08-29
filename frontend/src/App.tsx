import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { VoiceAssistantProvider } from './context/VoiceAssistantContext';

import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { VoiceAssistantModal } from './components/voice/VoiceAssistantModal';
import { ProtectedRoute, LoadingSplashScreen } from './components/common/ProtectedRoute';
import { LandingPage } from './pages/landing/LandingPage';

import { FarmerDashboard } from './pages/dashboard/FarmerDashboard';
import { BuyerDashboard } from './pages/dashboard/BuyerDashboard';
import { ExpertDashboard } from './pages/dashboard/ExpertDashboard';
import { TransportDashboard } from './pages/dashboard/TransportDashboard';
import { AdminDashboard } from './pages/dashboard/AdminDashboard';

import { CropRecommendationPage } from './pages/ai/CropRecommendationPage';
import { DiseaseDetectionPage } from './pages/ai/DiseaseDetectionPage';
import { PricePredictionPage } from './pages/ai/PricePredictionPage';

import { MarketplacePage } from './pages/marketplace/MarketplacePage';
import { CartPage } from './pages/marketplace/CartPage';
import { CheckoutPage } from './pages/marketplace/CheckoutPage';

import { OrdersPage } from './pages/orders/OrdersPage';
import { GovernmentSchemesPage } from './pages/schemes/GovernmentSchemesPage';
import { WeatherPage } from './pages/weather/WeatherPage';
import { ExpertConsultationPage } from './pages/experts/ExpertConsultationPage';
import { FarmerProfilePage } from './pages/profile/FarmerProfilePage';

import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { AdminLoginPage } from './pages/auth/AdminLoginPage';
import { ExpertLoginPage } from './pages/auth/ExpertLoginPage';
import { TransportLoginPage } from './pages/auth/TransportLoginPage';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <VoiceAssistantModal />

      <main className="flex-1 lg:pl-64 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>

      <div className="lg:pl-64">
        <Footer />
      </div>
    </div>
  );
};

export const RoleDashboardRouter: React.FC = () => {
  const { user } = useAuth();

  if (user?.role === 'BUYER') return <BuyerDashboard />;
  if (user?.role === 'EXPERT') return <ExpertDashboard />;
  if (user?.role === 'TRANSPORT') return <TransportDashboard />;
  if (user?.role === 'ADMIN') return <AdminDashboard />;
  return <FarmerDashboard />;
};

export const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSplashScreen message="Connecting to AsraVerse AI Agricultural Intelligence..." />;
  }

  return (
    <Routes>
      {/* Public Landing & Authentication */}
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/expert/login" element={<ExpertLoginPage />} />
      <Route path="/transport/login" element={<TransportLoginPage />} />

      {/* Root Route: Landing Page for logged-out visitors, Role Dashboard for authenticated users */}
      <Route
        path="/"
        element={
          user ? (
            <ProtectedRoute>
              <AppLayout>
                <RoleDashboardRouter />
              </AppLayout>
            </ProtectedRoute>
          ) : (
            <LandingPage />
          )
        }
      />

      {/* Explicit Dashboard Route */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <AppLayout>
              <RoleDashboardRouter />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* Role-Protected Dashboards */}
      <Route
        path="/buyer"
        element={
          <ProtectedRoute allowedRoles={['BUYER', 'ADMIN']}>
            <AppLayout>
              <BuyerDashboard />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/expert"
        element={
          <ProtectedRoute allowedRoles={['EXPERT', 'ADMIN']}>
            <AppLayout>
              <ExpertDashboard />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/transport"
        element={
          <ProtectedRoute allowedRoles={['TRANSPORT', 'ADMIN']}>
            <AppLayout>
              <TransportDashboard />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <AppLayout>
              <AdminDashboard />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* Feature & Advisory Routes */}
      <Route
        path="/crop-recommendation"
        element={
          <ProtectedRoute allowedRoles={['FARMER', 'EXPERT', 'ADMIN']}>
            <AppLayout>
              <CropRecommendationPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/disease-detection"
        element={
          <ProtectedRoute allowedRoles={['FARMER', 'EXPERT', 'ADMIN']}>
            <AppLayout>
              <DiseaseDetectionPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/price-prediction"
        element={
          <ProtectedRoute allowedRoles={['FARMER', 'BUYER', 'ADMIN']}>
            <AppLayout>
              <PricePredictionPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/marketplace"
        element={
          <ProtectedRoute allowedRoles={['FARMER', 'BUYER', 'ADMIN']}>
            <AppLayout>
              <MarketplacePage />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/cart"
        element={
          <ProtectedRoute allowedRoles={['FARMER', 'BUYER', 'ADMIN']}>
            <AppLayout>
              <CartPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/checkout"
        element={
          <ProtectedRoute allowedRoles={['BUYER', 'FARMER', 'ADMIN']}>
            <AppLayout>
              <CheckoutPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/orders"
        element={
          <ProtectedRoute allowedRoles={['FARMER', 'BUYER', 'TRANSPORT', 'ADMIN']}>
            <AppLayout>
              <OrdersPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/schemes"
        element={
          <ProtectedRoute allowedRoles={['FARMER', 'BUYER', 'EXPERT', 'ADMIN']}>
            <AppLayout>
              <GovernmentSchemesPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/weather"
        element={
          <ProtectedRoute allowedRoles={['FARMER', 'BUYER', 'EXPERT', 'TRANSPORT', 'ADMIN']}>
            <AppLayout>
              <WeatherPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/expert-consultation"
        element={
          <ProtectedRoute allowedRoles={['FARMER', 'EXPERT', 'ADMIN']}>
            <AppLayout>
              <ExpertConsultationPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute allowedRoles={['FARMER', 'ADMIN']}>
            <AppLayout>
              <FarmerProfilePage />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <VoiceAssistantProvider>
          <Router>
            <AppContent />
          </Router>
        </VoiceAssistantProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
