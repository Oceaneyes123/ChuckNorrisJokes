import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { storeAction } from "../store";

const Hero = () => {
    
    const [searchText, setSearchText] = useState('');
    const [searchJokes, setSearchJokes] = useState([])
    const dispatch = useDispatch()
    const jokes = useSelector(state => state.allJokesStatic )
    
    const handleKeyDown = event => {
   
        if(event.key === 'Enter'){
            dispatch(storeAction.goBack())
            event.preventDefault()
            console.log(event.key)
            axios.get('https://api.chucknorris.io/jokes/search?query=' + searchText).then(res => {
                let tempJokes = res.data.result
                let tempMappedJokes = []
                tempMappedJokes = tempJokes.map((tempJoke, i)=> {
                  return {
                    key: i,
                    category: tempJoke.categories.length != 0 ? tempJoke.categories[0] : 'uncategorized',
                    joke: tempJoke.value,
                    like: 0,
                    dislike: 0,
                  }
                })
                setSearchJokes(tempMappedJokes)
                dispatch(storeAction.setJokes(tempMappedJokes))
            })
        }
    }
    
        return ( <div>
            <div className="hero">
                <div className="hero-inner">  
                    <h1 className="hero-headline">The Joke Bible</h1>
                    <h2 className="hero-subheadline">Daily Laughs for you and yours</h2>
                    <input type="text" className="search-input"
                        onChange={event => setSearchText(event.target.value)}
                        onKeyDown={handleKeyDown}
                    ></input>
                </div>
            </div>
        </div> )
    
}

export default Hero