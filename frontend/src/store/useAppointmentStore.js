import { create } from "zustand";
import { axiosInstance } from "../api/axios";
import { useAuthStore } from "./useAuthStore";

export const useAppointmentStore = create((set) => ({
  loading: false,
  error: null,
  appointments: [],

  createAppointment: async (appointmentData) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.post('/customer/appointments', appointmentData);
      return res.data;
    } catch (err) {
      set({ error: err.response?.data?.message || err.message });
    } finally {
      set({ loading: false });
    }
  },

  getAppointments: async () => {
    const role = useAuthStore.getState().role; 
    const endpoint = role === 'barber' ? '/barber/appointments' : '/customer/appointments';

    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get(endpoint);
      set({ appointments: res.data });
    } catch (err) {
      set({ error: err.response?.data?.message || err.message });
    } finally {
      set({ loading: false });
    }
  }
}));