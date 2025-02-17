export const read = (userId,token)=>{
    return fetch(`http://localhost:8080/user/${userId}`,{
        method:'GET',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
            Authorization:`Bearer ${token}`
        }
    });
}
export const list = ()=>{
    return fetch(`http://localhost:8080/users`,{
        method:'GET'
    })
    .then(response =>{
        return response.json();
    })
    .catch(err=>{
        console.log(err);
    });
}
export default read;