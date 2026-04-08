export interface User {
  _id: string;
  name: string;
  user_name: string;
  email: string;
  password: string;
  profile: string;
  address: string | null;
  createdAt: string; // or Date if you parse it
  updatedAt: string; // or Date if you parse it
  __v: number;
}

export interface UserResponse {
  data: User[];
}



export type DashboardData = {
  totalUsers: number;
  totalProducts: number;
  totalCategory: number;
};

export interface Category {
  _id: string;
  name: string;
}

export interface Product {
  _id: any;
  productname: string;
  price: number;
  quantity: number;
  description: string;
  category: Category;
  images: string[];
  status: string; // you can make it union if needed
  discount: number;
  sku: string;
  rating: number;
  isDeleted: boolean;
  createdAt: string; // or Date
  updatedAt: string; // or Date
  __v: number;
}



export interface ProductModalProps {
  mode: "Add" | "Edit";
  data?: Product;
  onok?: () => void;
}

export interface ProductDetails {
  productname: string;
  price: number;
  quantity: number;
  description: string;
  images?: string[];
}

export type odrderproduct ={
  _id: string;
  productname: string;
  price: number;
}

export interface Order {
  _id: string;
  user: string;
  userName?: string;
  product?: odrderproduct;
  productDetails?: ProductDetails;
  orderQuantity: number;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
