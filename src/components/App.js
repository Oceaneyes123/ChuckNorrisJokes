import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { store, storeAction } from "../store";

const App = () => {
  
    const [mappedJokes, setMappedJokes] = useState([])
    const [maxOutput, setMaxOutput] = useState(6)
    const [colors, setColors] = useState(['red', 'green', 'orange', 'blue', 'brown', 'pale-orange', 'kiwi-green', 'light-gold'])
    const dispatch = useDispatch()
    const jokes = useSelector(state => state.allJokes )
    const categories = useSelector(state => state.allCategory)
    
    const fetchData = async () => {
      
      axios.get('https://api.chucknorris.io/jokes/search?query=all').then(res => {  
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
       setMappedJokes(tempMappedJokes)
       dispatch(storeAction.setJokes(tempMappedJokes))
      })
      
      axios.get('https://api.chucknorris.io/jokes/categories').then(res => {
        dispatch(storeAction.setCategory([...res.data, 'uncategorized']))
     
      })  
    }
    
    const categorize = (category) => {
      let filteredJokes = []
      
      for(let i = 0; i < mappedJokes.length; i++){
        if(mappedJokes[i].category == category){
          filteredJokes.push(mappedJokes[i])
        }
      }
      
      filteredJokes.length == 1 ?  dispatch(storeAction.viewJoke({key: filteredJokes[0].key})) : dispatch(storeAction.setJokes(filteredJokes))
        
    }

    
    useEffect(() => {
        fetchData()
    }, [])
    
    
    const categoryList  = categories.map((category, i) => {
      return (
        <div className={`category-button button-${colors[i % 8]}`} key={i} onClick={()=>{categorize(category)}}>
          { category.toUpperCase() + ' JOKES' }
        </div>
      )
    })
    
    const jokesList  = jokes.map((joke) => {
      return (
        // {joke: joke.value, category: joke.categories[0]}
        <div className="joke-card" key={joke.key} onClick={() => 
          {
            dispatch(storeAction.viewJoke({key: joke.key}))
          }
        }>
          <div className="joke-category">
            <div className="lightning-icon"></div>
            The Chuck Joke
          </div>
          <div className="joke-text">{ joke.joke }</div>
          <div className="see-stats">See Stats &rarr;</div>
        </div>
      )
    })
    
    const showMore = () => {
      setMaxOutput(maxOutput + 6)
    }
    
      return (
        <div className="app-container">
          <div className="category-button-list">
            {categoryList}
          </div>
          <div className="joke-list">
              { jokesList.slice(0, maxOutput) }
          </div>
          <div className="button-view-more-container">
            <button className="button-view-more" onClick={showMore}>View More</button>
          </div>
        </div>
      )
      
    
}


export default App