import React,{Component} from 'react'
import isAuth from '../core/Auth'
class FollowProfileButton extends Component{
    follow = ()=>{
        const token = isAuth().token;
        const followId = this.props.followId; 
        const user= isAuth().user._id
        console.log("herak")
        return fetch("http://localhost:8080/user/follow/"+user,{
         method:"PUT",
         headers:{
             Accept:'application/json',
             "Content-Type":"application/json",
             Authorization:`Bearer ${token}`
         },
         body: JSON.stringify({userId:followId})
     })
     .then(response=>{
        return response.json();
    })
    .then(data=>{
        console.log(data)
       if(data.error){
           console.log(data.error)
       }else{
               let following = this.props.comp.checkFollow(data)
               this.props.comp.setState({user:data,following:!!following});
           }
   })
    }
    unfollow = ()=>{
        const token = isAuth().token;
        const followId = this.props.followId;
        const user= isAuth().user._id

        return fetch("http://localhost:8080/user/unfollow/"+user,{
         method:"PUT",
         headers:{
             Accept:'application/json',
             "Content-Type":"application/json",
             Authorization:`Bearer ${token}`
         },
         body: JSON.stringify({userId:followId})
     })
     .then(response=>{
         return response.json();
     })
     .then(data=>{
         console.log(data)
        if(data.error){
            console.log(data.error)
        }else{
                let following = this.props.comp.checkFollow(data)
                this.props.comp.setState({user:data,following:!!following});
            }
    })
}
    render(){
        return (
            <div className='d-inline-block mt-5'>
                {this.props.follow?(
                <button className='btn btn-danger btn-raised mt-5' onClick={this.unfollow}>
                    UnFollow
                </button>):(
                <button  className='btn btn-success btn-raised mt-5' onClick={this.follow}>
                    Follow
                </button>
                )}
            </div>
        )
    }
}
export default FollowProfileButton;