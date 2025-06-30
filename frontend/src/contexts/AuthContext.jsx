import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const isInitialized = useRef(false);

  // Check for existing token on mount - simplified to prevent toggling
  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;
    
    console.log('🔍 AuthContext: Checking for existing token...');
    const token = localStorage.getItem('token');
    if (token) {
      console.log('🔍 AuthContext: Token found, but not loading user data to prevent toggling');
      // If token exists, we'll let the login/register functions handle user data
      // For now, just set loading to false
    } else {
      console.log('🔍 AuthContext: No token found');
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      setLoading(true);
      console.log('🔐 Attempting login with:', credentials.email);
      
      const response = await authAPI.login(credentials);
      console.log('✅ Login response received');
      
      const { token, user: userData } = response.data.data;
      
      // Store token and user data
      localStorage.setItem('token', token);
      setUser({ ...userData, token });
      
      console.log('🎉 Login successful for user:', userData.username);
      return { success: true };
      
    } catch (error) {
      console.error('❌ Login failed:', error.response?.data?.message || error.message);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      console.log('📝 Attempting registration for:', userData.email);
      
      const response = await authAPI.register(userData);
      console.log('✅ Registration response received');
      
      const { token, user: newUser } = response.data.data;
      
      // Store token and user data
      localStorage.setItem('token', token);
      setUser({ ...newUser, token });
      
      console.log('🎉 Registration successful for user:', newUser.username);
      return { success: true };
      
    } catch (error) {
      console.error('❌ Registration failed:', error.response?.data?.message || error.message);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Registration failed' 
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      console.log('🚪 Logging out...');
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      setUser(null);
      console.log('✅ Logout completed');
    }
  };

  const updateUserData = (newUserData) => {
    setUser(prevUser => ({ ...prevUser, ...newUserData }));
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUserData,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 