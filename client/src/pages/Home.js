import React from 'react';
import { Link } from 'react-router-dom'

function Home() {
    return (
        <>
        <h1>Welcome to my website</h1>
        <div><Link to="/login">Log in</Link> or <Link to='/signup'>sign up</Link> to gain access to all features</div>
        </>
    )
};

export default Home;