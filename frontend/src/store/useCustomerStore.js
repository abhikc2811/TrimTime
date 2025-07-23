import { create } from "zustand";
import { axiosInstance } from "../api/axios";

export const useCustomerStore = create((set) => ({
  barbers: [],

  search: async (query="") => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get(`/customer/search${query ? `?query=${query}` : ""}`);
      set({ barbers: res.data });
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },
  
}));