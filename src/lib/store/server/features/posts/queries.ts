import { useQuery } from "react-query"
import { Post } from "./interface"
import { useMutation, useQueryClient } from "react-query"
import { BASE_URL } from "@/utils/constants"
import axios from "axios";
// import axiosInstance from "@/providers/axiosContext";

/**
 * Function to fetch posts by sending a GET request to the API
 * @returns The response data from the API
 */
const getPosts = async () => {
    try {
      const response = await axios.get(`/userbbbbb`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

 /**
 * Function to fetch a single post by sending a GET request to the API
 * @param id The ID of the post to fetch
 * @returns The response data from the API
 */

const getPost =async(id:number)=>{
    try {
        const response = await axios.get(`${BASE_URL}/posts/${id}`);
        return response.data;
      } catch (error) {
        throw error;
      }
    
}


/**
 * Custom hook to fetch a list of posts using useQuery from react-query.
 * 
 * @returns The query object for fetching posts.
 * 
 * @description
 * This hook uses `useQuery` to fetch a list of posts from the API. It returns
 * the query object containing the posts data and any loading or error states.
 */
export const useGetPosts = ()=> useQuery<Post[]>("posts" , getPosts)

/**
 * Custom hook to fetch a single post by ID using useQuery from react-query.
 * 
 * @param postId The ID of the post to fetch
 * @returns The query object for fetching the post.
 * 
 * @description
 * This hook uses `useQuery` to fetch a single post by its ID. It returns the
 * query object containing the post data, and it keeps the previous data
 * while the new data is being fetched.
 */
export const useGetPost =(postId:number)=> useQuery<Post>(['post' , postId] , ()=> getPost(postId) , {
    keepPreviousData:true
} )