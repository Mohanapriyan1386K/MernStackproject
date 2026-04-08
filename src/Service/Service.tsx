import api from "./api";
import type { CreateUserPayload, LoginPayload } from "./apitype";

export const getProducts = (params:{
   page:number,
   limit:number,
   productname:string
   price:number
}) => {
  return api.get("/getproduct",{params:params});
};

export const createProduct = (payload: any) => {
  return api.post("/addproduct", payload);
};

export const updateProduct = (id: string, payload: any) => {
  return api.put(`/updateproduct/${id}`, payload);
};

export const deleteProduct = (id: string) =>{
    return api.delete(`/deleteproduct/${id}`)
}

export const getCategories = () => {
  return api.get("/getcategory");
};

export const getDashbarddata=()=>{
   return api.get("/dashboard")
}

export const getUser = (params: {
  page: number;
  limit: number;
  name?: string;
  user_name?: string;
  email?: string;
}) => {
  return api.get("/users", { params: params });
};



export const login = (payload: LoginPayload) => {
  return api.post("/login", payload);
};

export const createUser = (payload: CreateUserPayload) => {
  return api.post("/createuser", payload);
};

export const updateUser = (id: string, payload: Partial<CreateUserPayload>) => {
  return api.put(`/users/${id}`, payload);
};


export const deleteUser = (id: string) => {
  return api.delete(`/users/${id}`);
};


export const getOrders = (params:{
  page?:number,
  limit?:number,
  orderId?:string,
  userName?:string,
  status?:string
})=>{
  return api.get("/getorders",{params:params})
}


export const categorydropdown=()=>{
   return api.get("/categorydropdown")
}
