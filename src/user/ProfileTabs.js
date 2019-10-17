import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import '../../public/css/profTabs.css'
class ProfileTabs extends Component{
    constructor(){
        super();
    }

    render(){
        return(
           <div className='row'>
               <div className='col-md-4'>
                   <h3 className='text-primary'>Followers</h3>
                   <hr/>
                   <div className="profileTabs">
                   {this.props.followers.map((person,i)=>{
                        return (<div key={i} className="mt-2">
                            <div className='row'>
                            <img src={`http://localhost:8080/user/photo/${person._id}`} alt={person.name} className="rounded-circle col-md-3" ></img>
                                <div>
                                    <Link to={`/user/${person._id}`}>
                                            <h5 className="align-middle mt-3">{person.name}</h5>
                                    </Link>
                                </div>
                            </div>
                        </div>)
                    })}
                    </div>
               </div>
               <div className='col-md-4'>
                   <h3 className='text-primary'>Followings</h3>
                   <hr/>
                   <div className="profileTabs">
                   {this.props.following.map((person,i)=>{
                        return (<div key={i} className="mt-2">
                            <div className='row'>
                            <img src={`http://localhost:8080/user/photo/${person._id}`} alt={person.name} className="rounded-circle col-md-3" ></img>
                                <div>
                                    <Link to={`/user/${person._id}`}>
                                            <h5 className="align-middle mt-4">{person.name}</h5>
                                    </Link>
                                </div>
                            </div>
                        </div>)
                    })}
                    </div>
               </div>
               <div className='col-md-4'>
                   <h3 className='text-primary'>Posts</h3>
                   <hr/>
                   <div className="profileTabs">
                       {this.props.posts.map((post,i)=>{
                           return (
                            <div key={i} class="card mr-4 mb-2">
                              <div className="view overlay">
                                <img className="card-img-top" src={post._id?'http://localhost:8080/post/photo/'+post._id : "https://mdbootstrap.com/img/Photos/Others/food.jpg"} alt="Card image cap" />
                                <a>
                                  <div className="mask rgba-white-slight"></div>
                                </a>
                              </div>
                              <div className="card-body">
                                
                                <h4 className="card-title">{post.title}</h4>
                                <hr/>
                                <p class="card-text">{post.body}</p>
                            
                              </div>
                              <div class="rounded-bottom mdb-color lighten-3 text-center pt-3">
                                <ul class="list-unstyled list-inline font-small">
                                  <li class="list-inline-item pr-2 white-text"><i class="far fa-clock pr-1"></i>{post.created}</li>
                                  <li class="list-inline-item pr-2"><a href="#" class="white-text"><i class="fas fa-pray pr-1"></i>12</a></li>
                                  <li class="list-inline-item pr-2"><a href="#" class="white-text"><i class="far fa-comment-alt pr-1"> </i>21</a></li>
                                </ul>
                              </div>
                            
                            </div>

                           )
                       })}
                    </div>
                </div>
           </div>
            
        )
    }

}



export default ProfileTabs;