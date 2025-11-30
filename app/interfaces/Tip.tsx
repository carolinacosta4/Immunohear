export interface Tip {
  title: string;
  _id: string;
  info: string;
  IDcategory: {
    _id: string;
    name: string;
  };
  image: string;
  description: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}
