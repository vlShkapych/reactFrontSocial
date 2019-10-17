import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import Signout from '../user/Signout'
import isAuth from './Auth'
const isActive=(history,path)=>{
    if(history.location.pathname===path){
        return true;
    }
    else{
        return false;
    }
}



const Menu =({history})=>(
<nav className="mb-1 navbar navbar-expand-lg navbar-dark default-color">
  <a className="navbar-brand" href="#">RicardoNET</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-333"
    aria-controls="navbarSupportedContent-333" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent-333">
    <ul className="navbar-nav mr-auto">
      <li  className={ isActive(history,'/')?'nav-item active':'nav-item'} >
        <Link to='/' className="nav-link">
            Home
        </Link>
      </li>
      <li  className={ isActive(history,'/users')?'nav-item active':'nav-item'} >
        <Link to='/users' className="nav-link">
            Users
        </Link>
      </li>
      </ul>
    <ul className="navbar-nav ml-auto nav-flex-icons">
         
    <li  className={ isActive(history,'/signin')?'nav-item active':'nav-item'} >
      <Link to='/signin' style={{display: isAuth()?"none":""}} className='nav-link'>Sign In</Link>
      </li>
      <li  className={ isActive(history,'/signup')?'nav-item active':'nav-item'} >
      <Link to='/signup' style={{display: isAuth()?"none":""}} className='nav-link'>Sign Up</Link>
      </li>
      <li className="nav-item dropdown" style={{display: !isAuth()?"none":""}}>
        
      <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink-4" data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false">
          <i className="fas fa-user"></i> {isAuth()&&isAuth().user.name}</a>

        <div className="dropdown-menu dropdown-menu-right dropdown-default"
          aria-labelledby="navbarDropdownMenuLink-333">
          <Link to={`/user/${isAuth()&&isAuth().user._id}`} className='dropdown-item'>Profile</Link>
          <Link to={`/user/findPeople/${isAuth()&&isAuth().user._id}`} className='dropdown-item'>Find</Link>
          <Link to={`/post/create/`} className='dropdown-item'>Create Post</Link>

          <a className='dropdown-item' onClick={()=>Signout(()=>history.push('/'))}>Sign Out</a>
        </div>
      </li>
    </ul>
  </div>
</nav>
);
export default withRouter(Menu);

 