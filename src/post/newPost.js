import React , {Component} from 'react'
import {Redirect} from 'react-router-dom'
import read from '../core/Read'
import isAuth from '../core/Auth'
import {create} from './apiPost'
class NewPost extends Component{
    constructor(){
        super();
        this.state={
           title:'',
           body:'',
           photo:'',
           error:'',
           user:{},
           loadinf:false
        }
    }
   
    handelChange = name => event =>{
        this.setState({error:""});
        const value = name==='photo'?event.target.files[0] : event.target.value;
        this.postData.set(name,value)
        console.log(value)
        this.setState({[name]: value});       
    }
    clickSubmit= (event)=>{
        event.preventDefault();
        this.setState({loading:true})
        const token = isAuth().token;
        create(this.postData,token);

    }
    edit = (user,token)=>{
       
        const userId = this.props.match.params.userId
        return fetch("http://localhost:8080/user/"+userId,{
            method:"PUT",
            headers:{
                Accept:'application/json',
                Authorization:`Bearer ${token}`
            },
            body: user
        })
        .then(response =>{
            return response.json();
        })
        .then(data=>{
            if(data.error){
                console.log(data.error)
             this.setState({error:data.error})
            }else{
                   let jwt=JSON.parse(localStorage.getItem('jwt'));
                   data.token = jwt.token;
                    localStorage.setItem("jwt",JSON.stringify(data));
                    this.setState({redirectToReferer:true});
                }
            })
        .catch(err=>{
            console.log(err)
            this.setState({error:err});
        })    
    }
    
    newPost= (title,body)=>(
        <form>
        <div className="form-group">
            <label className='text-muted'>Post Photo</label>
            <input onChange={this.handelChange('photo')} type='file' accept="image/*" className='form-control'  />
        </div>
        <div className="form-group">
            <label className='text-muted'>Title</label>
            <input  value={title} onChange={this.handelChange('title')} type='text' className='form-control'  />
        </div>
        <div className="form-group">
            <label className='text-muted'>Body</label>
            <input value={body} onChange={this.handelChange('body')} type='text' className='form-control'  />
        </div>
        <button onClick={this.clickSubmit} className='btn btn-raised ptn-primary'>Create</button>
    </form>
    )
    componentDidMount(){
        this.postData=new FormData();
        this.setState({user:isAuth().user});
    }
    render(){
        const userId = this.props.match.params.userId;

        if(this.state.redirectToReferer){
            return <Redirect to={`/user/${this.props.match.params.userId}`} />
        }
        // const photoUrl = userId?'http://localhost:8080/user/photo/'+userId+"?"+new Date().getTime(): defProfile;
        return(
            
            <div>
                
                <div className='container'>
                    <h2 className='mt-5 mb-5'>Create Post</h2>
                    <img className=" -img-top"  alt="Card image cap" style={{width:'100%',height:'15vw',objectFit:'cover'}} />
                    {this.state.loading ? (
                    <div className="jumbotron text-center">
                        <h2>Loading...</h2>
                    </div>
                    )
                    :("")
                }   
                    <div className="alert alert-danger" style={{display: this.state.error?"":"none" }}>
                        {this.state.error}
                    </div>
                    {this.newPost(this.state.title,this.state.body)}
                </div>

            </div>
        )
    }
}
export default NewPost;