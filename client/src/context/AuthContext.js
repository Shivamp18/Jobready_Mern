import React, { createContext, useState, useEffect, useCallback } from 'react';
import api from '../../src/utils/api/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const loadUser = async () => {
  //     try {
  //       const token = localStorage.getItem('token');
  //       if (!token) {
  //         setLoading(false);
  //         return;
  //       }

  //       // Set token to Auth header
  //       if (token) {
  //         api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  //       }

  //       const res = await api.get('/api/auth/users');
  //       console.log(res);
  //       setUser(res.data);
  //       console.log(user);
  //       setIsAuthenticated(true);
  //     } catch (err) {
  //       console.log(err);
  //       localStorage.removeItem('token');
  //       delete api.defaults.headers.common['Authorization'];
  //       setError(err.response?.data?.message || 'Authentication error');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   loadUser();
  // }, []);

  const loadUser = useCallback(async () => {
    setLoading(true); // Set loading to true when starting the check
    const token = localStorage.getItem('token'); // Get the token from localStorage
    const storedUser = localStorage.getItem('user'); // Try to get user data from localStorage
    if (!token) {
      // If no token is found, the user is not authenticated
      setLoading(false); // Authentication check complete
      return;
    }

    // If a token exists, set it as the default Authorization header for API requests

      if (storedUser && token) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
  
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }


    try {
      // *Crucial:* Call your backend endpoint that verifies the token and returns the user data.
      // Replace '/api/auth/flashcards' with the correct endpoint for fetching user data.
      //FIXME -  const res = await api.get('/api/auth/flashcards'); // *Assuming '/api/auth/me' is the correct endpoint*
      //FIXME -  setUser(res.data); // Update the user state with the fetched data
      //FIXME -  setIsAuthenticated(true); // Set isAuthenticated to true
    } catch (err) {
      // If there's an error (token invalid, expired, etc.), remove the token and user from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      delete api.defaults.headers.common['Authorization']; // Clear the authorization header
      setError(err.response?.data?.message || 'Authentication error'); // Set the error message
    } finally {
      setLoading(false); // Authentication check complete
    }
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const res = await api.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      setUser(res.data.user);
      setIsAuthenticated(true);
      setError(null);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const res = await api.post('/api/auth/register', userData);
      console.log(res);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        login,
        register,
        logout,
        setUser,
        loadUser

      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
