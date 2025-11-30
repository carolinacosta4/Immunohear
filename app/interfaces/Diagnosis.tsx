export interface Diagnosis {
  IDdisease: {
    _id: string;
    description: string;
    name: string;
    type: string;
  };
  IDuser: string;
  _id: string;
  affected: string;
  createdAt: string;
  tinnitus: boolean;
  updatedAt: string;
  vestibular: boolean;
}
