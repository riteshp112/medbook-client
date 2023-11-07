import { fetchURL } from "../config";
const medFetch= (body)=>fetch(fetchURL,{
    method: 'POST',
    headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
})
export default medFetch;