const Signout = (next)=>{
    if(typeof window!== 'undefined') localStorage.removeItem('jwt');
    next();
    return fetch(`http://localhost:8080/signout`,{
        method:"GET"
    })
    .then(response=>{
        console.log('signout',response);
        return response.json;
    })
    .catch(err=>console.log(err))
}
export default Signout;