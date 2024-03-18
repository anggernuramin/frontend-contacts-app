import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface ApiResponse<T = any>{
    data: T; // Data yang diterima dari respons HTTP
  status: number | string; // Kode status HTTP (misalnya: 200, 404, dll.)
  statusText: string; // Pesan status HTTP (misalnya: "OK", "Not Found", dll.)
  headers: any; // Header respons HTTP
  config: AxiosRequestConfig; // Konfigurasi yang digunakan untuk melakukan permintaan HTTP
  request?: any; // Informasi tentang permintaan HTTP yang dilakukan
}
interface Contact {
    _id: string,
    name: string
    nohp: number
    email?: string
    __v: number
}

// Kembalian function data, loading dan error
export const fetchData = async (): Promise<{data: Contact[] ; loading: boolean ; error: string | null}> => {
    let data: Contact[] = []
    let error: string | null = ''
    let loading: boolean = false
    
    try {
        loading = true
        const response = await axios.get("https://backend-contacts-apps.vercel.app/contact")
        data = response?.data?.data
    } catch (err: any) {
        error = err.message;
        console.error("Error fetching data:", err.message);
    }finally{
        loading = false
    }

    return {data,loading,error}

    // try {
    //     const response: AxiosResponse<ApiResponse>= await axios.get("https://backend-contacts-apps.vercel.app/contact") 
    //     console.log(response);
    //     return response
    // } catch (error) {
        
    // }
}
