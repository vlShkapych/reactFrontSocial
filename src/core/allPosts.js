import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import isAuth from '../core/Auth'
import {getAllPosts} from '../post/getPosts'
class AllPosts extends Component{
  constructor(){
      super(); 
      this.state={
        posts:[]
      }
  }

  componentDidMount(){
    getAllPosts(isAuth().token)
    .then(data=>{
      if(data.error){
        console.log(data);
      }
      else{
        this.setState({posts:data});
      }
    });
  }
  posts=()=>(
    <div className='row justify-content-md-center'>    
    {this.state.posts.map((post,i)=>{
      return (
      
       <div key={i} class="card mr-4 mb-2 col-4">
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
 )
  render(){ 

    return (
     <div className='container'>
       {this.posts()}
     </div>
        
      
    
    )
  }
}
export default AllPosts;