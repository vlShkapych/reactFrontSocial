import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class ProfileTabs extends Component{
    constructor(){
        super();
    }

    render(){
        const {following,followers} = this.props;
        return(
           <div className='row'>
               <div className='col-md-4'>
                   <h3 className='text-primary'>Followers</h3>
                   <hr/>
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
               <div className='col-md-4'>
                   <h3 className='text-primary'>Followings</h3>
                   <hr/>
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
            
        )
    }

}



export default ProfileTabs;