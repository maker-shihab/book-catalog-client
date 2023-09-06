export interface IUser {
  name: {
    firstName: string;
    lastName: string;
  };
  userName: string;
  phoneNumber: string;
  email: string;
  gender: string;
  password: string;
  address: string;
}

export interface IBook {
  _id: number;
  author: string;
  image: string;
  title: number;
  genre: string;
  publicationDate: string;
  revies?: string[];
}
