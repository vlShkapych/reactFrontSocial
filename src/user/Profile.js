import React,{Component} from 'react'
import isAuth from '../core/Auth'
import {Redirect,Link} from 'react-router-dom'
import read from '../core/Read'
import defProfile from '../../public/img/ricardo.png'
import Signout from '../user/Signout'
import FollowProfileButton from './FollowButton'
import ProfileTabs from './ProfileTabs'
import {getPostsBy} from '../post/getPosts'

class Profile extends Component{
    constructor(){
        super();
        this.state = {
            user:{
                followers:[],
                following:[]
            },
            posts:[],
            redirectToSignin:false,
            following:false,
            error:""
        }
    }
   
    init = (userId)=>{
        const token = isAuth().token;
        read(userId,token)
        .then(response =>{
            return response.json();
        })
        .then(data=>{
            if(data.error){
                this.setState({redirectToSignin:true})
            } else{
                console.log({user:data})
                console.log(data)
            let following = this.checkFollow(data)
               this.setState({user:data,following:!!following})
            }
        });
    }
     
    componentDidMount(){
       const userId = this.props.match.params.userId
       this.init(userId);
       getPostsBy(userId,isAuth().token)
       .then(data=>{
           if(data.error){
               console.log(data.error);
           }else{
               this.setState({posts:data});
               console.log(data)
           }
       })
    }
    componentWillReceiveProps(props){
        const userId = this.props.match.params.userId;
        this.init(userId);
     }

    clickDelete = ()=>{
        let answ=window.confirm('Are you sure you want to delete your Ricardo account')
        if(answ){
            this.delete()
            .then(data=>{
                if(data.error){
                  console.log(data.error)  
                }
                else{
                    Signout(next=>{
                        console.log('Deleted')
                    });
                    this.setState({redirectToSignin:true})

                }
            });    
        }
        
    }
    checkFollow = user=>{
        const jwt= isAuth();
        if(user.followers.length===0)
            return false;
        const match= user.followers.find(follower=>{
            return follower._id===jwt.user._id;
        });
        return match;
    }
    delete = ()=>{
        const userId = this.props.match.params.userId;
        const token = isAuth().token;
        return fetch(`http://localhost:8080/user/${userId}`,{
        method:'DELETE',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
            Authorization:`Bearer ${token}`
        }
    })
    .then(response=>{
       return response.json();
    })
    .catch(err=>{
        console.log(err); 
    });
    }
    render(){
        if(this.state.redirectToSignin){
            return <Redirect to='/' />;
        }
        const userId = this.props.match.params.userId;
        console.log(isAuth().user._id)
        console.log(this.state.user._id)

        const photoUrl = userId?'http://localhost:8080/user/photo/'+userId+"?"+new Date().getTime(): defProfile;
        return (
            <div className='container'>
               <h2 className='mt-5 mb-5'>Profile</h2> 
               <img className="card-img-top" src={photoUrl} alt="Card image cap" style={{width:'100%',height:'15vw',objectFit:'cover'}} alt='photo'/>
               <p>Hello {this.state.user.name} </p>
               <p>Email {this.state.user.email}</p>
               <p>{`Joined ${new Date(this.state.user.created).toDateString()}`}</p>
               {isAuth()&&isAuth().user._id==this.state.user._id?(
                    <div className='row'>
                        <Link className="btn btn-raised btn-success " to={`/user/edit/${this.state.user._id}`}>Edit</Link>
                        <button  className='btn btn-raised btn-danger '  onClick={this.clickDelete}>Delete Account</button>
                    </div>
                ):(<FollowProfileButton  follow={this.state.following} followId={userId} comp={this} />)}
                <hr/>
                <ProfileTabs followers={this.state.user.followers} following={this.state.user.following} posts={this.state.posts} />
            </div>
        )
    }
}
export default Profile;