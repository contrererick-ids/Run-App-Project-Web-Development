// src/store/authStore.js
import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'https://web-back-4n3m.onrender.com';

const useAuthStore = create((set) => ({
  // User state
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  
  // Sign up function
  signUp: async (username, email, password) => {
    set({ loading: true, error: null });
    
    try {
      const response = await axios.post(`${API_URL}/api/v1/auth/signup`, {
        username,
        email,
        password,
      });
      
      /* // Store user data and token in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user)); */
      
      set({ 
        user: response.data.user,
        isAuthenticated: true,
        loading: false
      });
      
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Sign up failed';
      set({ loading: false, error: errorMessage });
      throw new Error(errorMessage);
    }
  },
  
  // Sign in function
  signIn: async (email, password) => {
    set({ loading: true, error: null });
    
    try {
      // Agregamos logs para depuración
      console.log('Intentando iniciar sesión con:', { email });
      
      const response = await axios.post(`${API_URL}/api/v1/auth/signin`, {
        email,
        password,
      });
      
      // Verificamos qué contiene la respuesta
      console.log('Respuesta recibida:', response.data);
      
      // Verificamos si tenemos los datos que esperamos
      if (!response.data.jwt) {
        throw new Error('Token no recibido del servidor');
      }
      
      // Store user data and token in localStorage
      localStorage.setItem('token', response.data.jwt);
      localStorage.setItem('user', JSON.stringify(response.data.user || response.data));
      
      set({ 
        user: response.data.user || response.data,
        isAuthenticated: true,
        loading: false
      });
      
      return response.data;
    } catch (error) {
      console.error('Error completo:', error);
      const errorMessage = error.response?.data?.message || 'Sign in failed';
      set({ loading: false, error: errorMessage });
      throw new Error(errorMessage);
    }
  },
  
  // Sign out function
  signOut: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    set({
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null
    });
  },
  
  // Initialize auth state from localStorage
  initAuth: () => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    
    if (token && user) {
      set({
        user,
        isAuthenticated: true
      });
    }
  },

  // Update user profile (partial update)
  updateUser: (updates) => set((state) => ({
    user: { ...state.user, ...updates }
  })),
  
  // Set complete user object (complete replacement)
  setUser: (userData) => {
    // También actualizamos en localStorage
    localStorage.setItem('user', JSON.stringify(userData));
    
    set({
      user: userData
    });
  },
  
  // Clear error
  clearError: () => set({ error: null })
}));

export default useAuthStore;