import React,{Component} from 'react';
import {Link} from 'react-router-dom'
class Signup extends Component{
    constructor(){
        super();
        this.state={
            name:'',
            email:'',
            password:'',
            error:'',
            open: false
        }
    }
    handleChange = (name)=> (event)=>{
        this.setState({error:""});
        this.setState({[name]:event.target.value});
        
    }
    clickSubmit = event =>{
        event.preventDefault();
        const {name,email,password} = this.state;
        const user ={
            name,
            email,
            password            
        };
      this.signup(user)
      .then(data =>{
          if(data.error) this.setState({error: data.error});
            else this.setState({
                name:'',
                email:'',
                password:'',
                error:'',
                open:true
            });
      });
    }
    signup = (user)=>{
        
      return fetch("http://localhost:8080/signup",{
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
    signupForm= ()=>(
        <form>
        <div className="form-group">
            <label className='text-muted'>Name</label>
            <input onChange={this.handleChange('name')} value={this.state.name} type='text' className='form-control'  />
        </div>
        <div className="form-group">
            <label className='text-muted'>Password</label>
            <input onChange={this.handleChange('password')} value={this.state.password} type='password' className='form-control' />
        </div>
        <div className="form-group">
            <label className='text-muted'>Email</label>
            <input onChange={this.handleChange('email')} value={this.state.email } type='text' className='form-control'  />
        </div>
        <button onClick={this.clickSubmit} className='btn btn-raised ptn-primary'>Submit</button>
    </form>
    )
    
    render(){
        return(
            <div className='container'>
                <h2 className='mt-5 mb-5'>Signup</h2>
                <div className="alert alert-danger" style={{display: this.state.error?"":"none" }}>
                    {this.state.error}
                </div>
                <div className="alert alert-info" style={{display: this.state.open ? "":"none" }}>
                    New account created)<Link to='/signin'>Sign In</Link>
                </div>
               {this.signupForm()}
            </div>
        );
    }
}
export default Signup;

