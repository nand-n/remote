import { BASE_URL } from "@/utils/constants";
import axios from "axios";


export const createRootCategory = async (name: string): Promise<any> => {
    const response = await axios.post(`${BASE_URL}/categories/create-root`, { name });
    return response.data;
  };
  
  export const createCategoryWithChildren = async (categoryData: { name: string, children?: string[] }): Promise<any> => {
    const response = await axios.post(`${BASE_URL}/categories/create-root-with-ancestors`, categoryData);
    return response.data;
  };
  
    export const updateCategory = async (id: string, updateData: { name?: string; parentId?: string }): Promise<any> => {
    const response = await axios.put(`${BASE_URL}/categories/update/${id}`, updateData);
    return response.data;
  };
  
  export const addChildCategory = async (parentId: string, name: string): Promise<any> => {
    const response = await axios.post(`${BASE_URL}/categories/${parentId}/add-child`, { name });
    return response.data;
  };
  
    export const getAllCategories = async (): Promise<any> => {
    const response = await axios.get(`${BASE_URL}/categories`);
    return response.data;
  };

  export const getAllParrentCategories = async (): Promise<any> => {
    const response = await axios.get(`${BASE_URL}/categories/root-nodes`);
    return response.data;
  };
  
    export const getCategoryHierarchy = async (categoryId: string): Promise<any> => {
    const response = await axios.get(`${BASE_URL}/categories/${categoryId}/hierarchy`);
    return response.data;
  };
  
    export const deleteCategory = async (categoryId: string): Promise<any> => {
    const response = await axios.delete(`${BASE_URL}/categories/${categoryId}`);
    return response.data;
  };