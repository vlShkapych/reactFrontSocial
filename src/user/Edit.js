import React , {Component} from 'react'
import {Redirect} from 'react-router-dom'
import read from '../core/Read'
import isAuth from '../core/Auth'
import defProfile from '../../public/img/ricardo.png'

class Edit extends Component{
    constructor(){
        super();
        this.state={
            name:"",
            email:"",
            password:"",
            photo:"",
            error:'',
            redirectToReferer:false,
            fileSize: 0,
            loading: false
        }
    }
    init = userId =>{
        const token = isAuth().token;
        read(userId,token)
        .then(response =>{
            return response.json();
        })
        .then(data=>{
            if(data.error){
                this.setState({redirectToSignin:true})
            } else{
               this.setState({name:data.name,email:data.email})
            }
        });     
    }
    handelChange = name => event =>{
        this.setState({error:""});
        const value = name==='photo'?event.target.files[0] : event.target.value;
        this.userData.set(name,value)
        console.log(value)
        this.setState({[name]: value});       
    }
    clickSubmit= (event)=>{
        event.preventDefault();
        this.setState({loading:true})
        const token = isAuth().token;
        this.edit(this.userData,token);

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
    
    editForm= ()=>(
        <form>
        <div className="form-group">
            <label className='text-muted'>Profile Photo</label>
            <input onChange={this.handelChange('photo')} type='file' accept="image/*" className='form-control'  />
        </div>
        <div className="form-group">
            <label className='text-muted'>Name</label>
            <input  value={this.state.name} onChange={this.handelChange('name')} type='text' className='form-control'  />
        </div>
        <div className="form-group">
            <label className='text-muted'>Password</label>
            <input  value={this.state.password} onChange={this.handelChange('password')} type='password' className='form-control' />
        </div>
        <div className="form-group">
            <label className='text-muted'>Email</label>
            <input value={this.state.email } onChange={this.handelChange('email')} type='text' className='form-control'  />
        </div>
        <button onClick={this.clickSubmit} className='btn btn-raised ptn-primary'>Submit</button>
    </form>
    )
    componentDidMount(){
        this.userData=new FormData();
        const userId = this.props.match.params.userId;
        this.init(userId);
    }
    render(){
        const userId = this.props.match.params.userId;

        if(this.state.redirectToReferer){
            return <Redirect to={`/user/${this.props.match.params.userId}`} />
        }
        const photoUrl = userId?'http://localhost:8080/user/photo/'+userId+"?"+new Date().getTime(): defProfile;
        return(
            
            <div>
                
                <div className='container'>
                    <h2 className='mt-5 mb-5'>Edit</h2>
                    <img className="card-img-top" src={photoUrl} alt="Card image cap" style={{width:'100%',height:'15vw',objectFit:'cover'}} />
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
                    {this.editForm()}
                </div>

            </div>
        )
    }
}
export default Edit;