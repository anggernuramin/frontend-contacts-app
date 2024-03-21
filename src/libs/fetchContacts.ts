import axios, {AxiosResponse} from "axios"
interface Contact {
    name: string
    email: string
    nohp:  number
}
 interface ApiResponse {
    status: string
    data: Contact[]
    message: string
 }

 interface ErrorResponse {
    
 }



export const fetchData = async () => {
    const data: Contact[] = []
    let loading: boolean = false
    let error: any = ''

    const getContacts = async () => {
        loading = true;
        const response = await axios.get("https://backend-contacts-apps.vercel.app/")
        data.push(...response.data.data)
        try {
        } catch (error: any) {
            error = error.message || 'Failed to fetch data';
        }finally{
            loading = false;
        }
    }

    await getContacts()

    return { data, loading, error, fetchData };
}