import { create } from "zustand";
import api from "@/api/api";
import { Tip } from "@/interfaces/Tip";

interface UserState {
  tips: Tip[] | undefined;
  tip: Tip | undefined;
  fetchTips: () => Promise<void>;
  fetchTip: (tipID: string) => Promise<void>;
  fetchCategories: () => Promise<void>;
}

export const useTipsStore = create<UserState>((set) => ({
  tips: undefined,
  tip: undefined,
  fetchTips: async () => {
    try {
      const response = await api.get("tips");
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  },
  fetchTip: async (tipID) => {
    try {
      const response = await api.get(`tips/${tipID}`);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  },
  fetchCategories: async () => {
    try {
      const response = await api.get("tipCategory");
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useTipsStore;
