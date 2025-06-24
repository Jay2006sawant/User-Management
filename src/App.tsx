import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import { Provider } from 'react-redux';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import store from './store';
import ProtectedRoute from './components/organisms/ProtectedRoute';
import MainLayout from './components/templates/MainLayout';

const theme = createTheme();

const App: React.FC = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={<Navigate to="/dashboard" replace />}
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          {/* Placeholder routes for sidebar navigation */}
          <Route
            path="/tenants"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <div>Tenants Page (Coming Soon)</div>
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/organizations"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <div>Organizations Page (Coming Soon)</div>
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <div>Users Page (Coming Soon)</div>
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/roles"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <div>Roles Page (Coming Soon)</div>
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/privileges"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <div>Privileges Page (Coming Soon)</div>
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/legal-entities"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <div>Legal Entities Page (Coming Soon)</div>
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);

export default App;
