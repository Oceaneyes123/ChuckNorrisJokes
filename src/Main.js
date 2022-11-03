import React from 'react';
import App from './components/App';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Footer from './components/Footer'
import Joke from './components/Joke'
import './style.scss'
import { useSelector } from "react-redux";

function Main(){
    const isJokeSelected = useSelector(state=>state.isJokeSelected)
    return (
        <>
            <Nav/>
            <Hero/>
            { !isJokeSelected ?  <App/> : <Joke/> }
            <Footer/>
        </>
    )
}

export default Main;