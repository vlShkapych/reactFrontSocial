const isAuth=()=>{
    if(typeof window === 'undefined')
        return false;
    if(localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'))
    }
    else{
        return false;
    }
}
export default isAuth;

