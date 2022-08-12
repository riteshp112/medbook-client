import { fetchURL } from "../config";
import NetworkUtils from "../Utils/NetworkUtility";
const medFetch= async (body)=>{
    const isConnected = await NetworkUtils.isNetworkAvailable()
    if(!isConnected)
    {
        alert("No Internet! Check Your Connection!")
    }
    else
    return fetch(fetchURL,{
    method: 'POST',
    headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
})}
export default medFetch;