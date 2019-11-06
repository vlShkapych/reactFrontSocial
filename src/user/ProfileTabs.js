import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import '../../public/css/profTabs.css'
class ProfileTabs extends Component{
    constructor(){
        super();
        this.state={
            followersTabOnScreen:false,
            followingsTabOnScreen:false,
            postsOnScreen:false
        }
    }
    allhide=()=>{
       return this.state.followingsTabOnScreen||this.state.postsOnScreen||this.state.followersTabOnScreen
    }
    onClickTab=(name)=>event=>{
        if(name==="followersTabOnScreen"){
            this.setState({followersTabOnScreen:!this.state.followersTabOnScreen})
        }     
        if(name==="followingsTabOnScreen"){
            this.setState({followingsTabOnScreen:!this.state.followingsTabOnScreen})
        }    
        if(name==="postsOnScreen"){
            this.setState({postsOnScreen:!this.state.postsOnScreen})
        }  
    }
    
    followersTab=()=>(
            <div className={this.state.followersTabOnScreen?'col-md-12':this.allhide()?"hide":"col-md-4"}>
                   <h3 className='text-primary' onClick={this.onClickTab('followersTabOnScreen')}>Followers</h3>
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
    )
    followingsTab=()=>(
            <div className={this.state.followingsTabOnScreen?'col-md-12':this.allhide()?"hide":"col-md-4"}>
                <h3 className='text-primary' onClick={this.onClickTab('followingsTabOnScreen')} >Followings</h3>
                <hr/>
                <div className="profileTabs">
                   {this.props.following.map((person,i)=>{
                        return (<div key={i} className="mt-2">
                            <div className='row'>
                            <img className='col-sm-h-3' src={`http://localhost:8080/user/photo/${person._id}`} alt={person.name} className="rounded-circle col-md-3" ></img>
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
    )
    postsTab=()=>(
            <div className={this.state.postsOnScreen?'col-md-12 ':this.allhide()?"hide":"col-md-4"}>
                <h3 className='text-primary' onClick={this.onClickTab('postsOnScreen')}>Posts</h3>
                <hr/>
                <div className={this.state.postsOnScreen?"":"profileTabs"}>
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
    )
    sortTabs=()=>{
        
    }
    render(){
        return(
           <div className='row'>
               {this.followersTab()}
               {this.followingsTab()}
               {this.postsTab()}
               <p></p>
           </div>
            
        )
    }

}



export default ProfileTabs;