import { create } from "zustand";
import api from "@/api/api";
import { Tip } from "@/interfaces/Tip";

interface DiaryState {
  fetchUserAppointments: (userID: string) => Promise<void>;
  fetchAppointmentByDate: (userID: string, date: string) => Promise<void>;
  fetchAppointment: (userID: string, entryID: string) => Promise<void>;
}

export const useAppointmentStore = create<DiaryState>((set) => ({
  fetchUserAppointments: async (userID) => {
    try {
      const response = await api.get(`appointments/${userID}`);
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  },
  fetchAppointmentByDate: async (userID, date) => {
    try {
      const response = await api.get(`diary/${userID}/?date=${date}`);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  },
  fetchAppointment: async (userID, entryID) => {
    try {
      const response = await api.get(`diary/${userID}/${entryID}`);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useAppointmentStore;
