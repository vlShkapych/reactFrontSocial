import React,{Component} from 'react'
import {list} from './Read'
import {Link} from 'react-router-dom'
import defProfile from '../../public/img/ricardo.png'
class Users extends Component{
    constructor(){
        super();
        this.state={
            users:[],
            page:null,
        }
    }

    componentDidMount(){
        list().then(data=>{
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
export default Users;

