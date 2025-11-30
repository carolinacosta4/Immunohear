import { Diagnosis } from "./Diagnosis";

export interface User {
  appointments: [];
  diseases: Diagnosis[];
  entries: [];
  exams: [];
  user: {
    _id: string;
    name: string;
    email: string;
    password: string;
    profilePicture: string;
    cloudinaryID: string;
    language: string;
    isDeactivated: boolean;
  };
}
