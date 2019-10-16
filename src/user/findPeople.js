import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import defProfile from '../../public/img/ricardo.png'
import isAuth from '../core/Auth'
class FindPeople extends Component{
    constructor(){
        super();
        this.state={
            users:[]
        }
    }
    findPeople = (userId,token)=>{
        return fetch("http://localhost:8080/user/findPeople/"+userId,{
             method:"GET",
             headers:{
                 Accept:'application/json',
                 "Content-Type":"application/json",
                 Authorization:`Bearer ${token}`
             }
        })
         .then(response=>{
             return response.json();
         })
         .catch(err=>console.log(err))
    }
    componentDidMount(){
        const userId = isAuth().user._id;
        const token = isAuth().token;
        this.findPeople(userId,token).then(data=>{
            if(data.error){
                console.log(data.error);
            }else{
                this.setState({users:data});
            }
        });
    }
    renderUsers=(users)=>(
        <div className='row'>
            {users.map((user,i)=>(
                
                <div className="card col-md-4" key={i}>
                <img className="card-img-top" src={user._id?'http://localhost:8080/user/photo/'+user._id+"?"+new Date().getTime(): defProfile} alt="User" style={{width:'100%',height:'15vw',objectFit:'cover'}} />
                <div className="card-body">
                  <h5 className="card-title">{user.name}</h5>
                    <Link to={`user/${user._id}`} className="btn btn-raised btn-primary btn-small">
                        View Profil 
                    </Link>
                </div> 
              </div>
            ))}
        </div>
    )
    render(){
        const {users} = this.state; 
        return (
           <div className='container'>
               <h2 className='mt-5 mb-5'>Users</h2>
               {this.renderUsers(users)}
           </div>
        )

    }
}
export default FindPeople;

