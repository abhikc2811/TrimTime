import { create }from 'zustand';
import { axiosInstance } from '../api/axios.js';

export const useAuthStore = create((set, get) => ({
  user: null,
  role: null,
  email: '',
  otpSent: false,
  otpVerified: false,
  loading: false,
  error: null,

  loginModalOpen: false,
  setLoginModalOpen: (value) => set({ loginModalOpen: value }),
  setError: (message) => set({ error: message }),
  setEmail: (email) => set({ email }),
  setRole: (role) => set({ role }),
  setUser: (user) => set({user}),

  sendOtp: async () => {
    const { email, role } = get();
    set({ loading: true, error: null });
    try {
      await axiosInstance.post('/auth/send-otp', { email, role });
      set({ otpSent: true });
      console.log('[DEBUG] sendOtp payload:', { email, role });
    } catch (err) {
      console.error('[ERROR] sendOtp failed:', err.response?.data || err.message);
      set({ error: err.response?.data?.message || err.message });
    }
       finally {
      set({ loading: false });
    }
  },

  verifyOtp: async (otp) => {
    const { email } = get();
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post('/auth/verify-otp', { email, otp });
      set({ otpVerified: true, role: response.data.role });
    } catch (err) {
      set({ error: err.response?.data?.message || err.message });
    } finally {
      set({ loading: false });
    }
  },

  register: async (formData) => {
    set({ loading: true, error: null });
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'profileFile') return;
        if (value != null) data.append(key, value);
      });
      if (formData.profileFile) {
        data.append('profilePic', formData.profileFile);
      }
      const response = await axiosInstance.post('/auth/register', data);
      set({ role: response.data.role });
      await get().checkAuth();
    } catch (err) {
      set({ error: err.response?.data?.message || err.message });
    } finally {
      set({ loading: false });
    }
  },

  login: async (email, password, role) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.post('/auth/login', { email, password, role });
      await get().checkAuth();
    } catch (err) {
      set({ error: err.response?.data?.message || err.message });
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.post('/auth/logout');
      set({ user: null, role: null, otpSent: false, otpVerified: false, email: '' });
    } catch (err) {
      set({ error: err.response?.data?.message || err.message });
    } finally {
      set({ loading: false });
    }
  },

  checkAuth: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get('/auth/check-auth');
      set({ user: response.data.user, role: response.data.user?.role || null });
    } catch (err) {
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  },

  updateProfile: async (formData) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.put('/auth/profile', formData);
      const updatedUser = response.data.user;
      const newRole = response.data.role || get().role;
      updatedUser.role = newRole;
      set({ user: updatedUser, role: newRole });
      return updatedUser;
    } catch (err) {
      set({ error: err.response?.data?.message || err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },
}));
