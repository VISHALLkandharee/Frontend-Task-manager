// Base Url
export const BASE_URL = import.meta.env.VITE_API_BASE_URL;


// get token
function getToken() {
    return localStorage.getItem("accessToken")
}


function getHeaders (custom = {}) {
    return{
        "Content-Type" : "application/json",
        ...(getToken() &&{ Authorization : `Bearer ${getToken()}`}),
        ...custom
    }
}


// Api request

export const apiRequest = async (path,options={}) => {

    const response = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers : getHeaders(options.headers)
    })


    if(!response.ok) throw new Error(await response.text())

    return response.json();
}