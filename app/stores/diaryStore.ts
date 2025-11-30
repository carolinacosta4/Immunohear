import { create } from "zustand";
import api from "@/api/api";
import { Tip } from "@/interfaces/Tip";

interface DiaryState {
  fetchUserEntries: (userID: string) => Promise<void>;
  fetchEntryByDate: (userID: string, date: string) => Promise<void>;
  fetchEntry: (userID: string, entryID: string) => Promise<void>;
  fetchFeelings: () => Promise<void>;
  createEntry: (
    thoughts: string,
    feelingID: string,
    authToken: string
  ) => Promise<void>;
}

export const useDiaryStore = create<DiaryState>((set) => ({
  fetchUserEntries: async (userID) => {
    try {
      const response = await api.get(`diary/${userID}`);
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  },
  fetchEntryByDate: async (userID, date) => {
    try {
      const response = await api.get(`diary/${userID}/?date=${date}`);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  },
  fetchEntry: async (userID, entryID) => {
    try {
      const response = await api.get(`diary/${userID}/${entryID}`);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  },
  fetchFeelings: async () => {
    try {
      const response = await api.get(`feelings`);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  },
  createEntry: async (thoughts, feelingID, authToken) => {
    try {
      const body = { text: thoughts, IDfeeling: feelingID };
      const response = await api.post(`diary`, body, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });      
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useDiaryStore;
