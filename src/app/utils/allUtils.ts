import axios from "axios";
import { TokensAuth } from "../interfaces/forms";

export let numbers = [1,2,3,4,5,6,7,8,9]

export let postData = async (tokens: TokensAuth | null, url:string, body?:any, contentType?:string ): Promise<any> => {
    try {
      const responce = await axios.post('http://localhost:3000/' + url, body, {
        headers: {
           'Content-Type': contentType,
          accessToken: `Bearer ${tokens?.accessToken}`,
          refreshToken: `Bearer ${tokens?.refreshToken}`,
        }
      })

      return responce.data

    } catch (error: any) {
      console.log(error);
  
    }
}

export let getData = async (url:string): Promise<any> => {
    try {
        const response = await axios.get('http://localhost:3000/' + url)
        return response.data
      } catch (error) {
        console.log(error);

      }
  }