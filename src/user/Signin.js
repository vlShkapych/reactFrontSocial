import React,{Component} from 'react';
import {Redirect} from 'react-router-dom'
class Signin extends Component{ 
    constructor(){
        super();
        this.state={
            email:'',
            password:'',
            error:'',
            redirectToReferer:false,
            loading: false
        }
    }
    handleChange = (name)=> (event)=>{
        this.setState({error:""});
        this.setState({[name]:event.target.value});
        
    }
    
    authenticate(jwt,next){
        this.message=jwt;
        if(typeof window!=="undefined"){
            localStorage.setItem("jwt",JSON.stringify(jwt));
            next();
        }
       
    }
    clickSubmit = event =>{
        event.preventDefault();
        this.setState({loading: true});
        const {email,password} = this.state;
        const user ={
            email,
            password            
        };
      this.signin(user)
      .then(data =>{
        if(data.error) 
            this.setState({error: data.error,loading: false});
        else {
            //auth
            console.log(data)
            this.authenticate(data,()=>{
                this.setState({redirectToReferer:true});
            });
            //redirect
        }
      });
    }
    signin = (user)=>{
      return fetch(`http://localhost:8080/signin`,{
            method:'POST',
            headers:{
                Accept:'application/json',
                "Content-Type":'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response=>{
             return response.json();
        })
        .catch(err=>console.log(err));
    }
    signinForm= ()=>(
        <form>
        <div className="form-group">
            <label className='text-muted'>Email</label>
            <input onChange={this.handleChange('email')} value={this.state.email} type='email' className='form-control'  />
        </div>
        <div className="form-group">
            <label className='text-muted'>Password</label>
            <input onChange={this.handleChange('password')} value={this.state.password} type='password' className='form-control' />
        </div>
        <button onClick={this.clickSubmit} className='btn btn-raised ptn-primary'>Submit</button>
    </form>
    )
    
    render(){
        if(this.state.redirectToReferer){
            return <Redirect to='/' />
        }
        return(
            <div className='container'>
                <h2 className='mt-5 mb-5'>Sign In</h2>
                <div className="alert alert-danger" style={{display: this.state.error?"":"none" }}>
                    {this.state.error}
                </div>
                {this.state.loading ? (
                    <div className="jumbotron text-center">
                        <h2>Loading...</h2>
                    </div>
                    )
                    :("")
                }
               {this.signinForm()}
            </div>
        );
    }
}

export default Signin;