import React from 'react'
import AllPosts from './allPosts'

const Home = ()=>(
    <div>
    <div className='jumbotron'>
        <h2>Welcome to Ricardo NEt</h2>
        <p className='lead'>Here you can watch the best posts of our users</p>
    </div>
        <AllPosts />

    </div>
)

export default Home;