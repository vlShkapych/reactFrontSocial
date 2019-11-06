export const getPostsBy = (userId,token)=>{
    return fetch(`http://localhost:8080/posts/by/`+userId,{
        method:'GET',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
            Authorization:`Bearer ${token}`
        }
    })
    .then(response =>{
        return response.json();
    })
    .catch(err=>{
        console.log(err);
    });
}

export const getAllPosts = (token) =>{
    return fetch(`http://localhost:8080/posts`,{
        method:'GET',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
        }
    })
    .then(response =>{
        return response.json();
    })
    .catch(err=>{
        console.log(err);
    });;
}