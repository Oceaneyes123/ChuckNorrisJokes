import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { store, storeAction } from "../store";

const Joke = () => {
    const joke = useSelector(state => state.allJokes)
    const jokeKey = useSelector(state => state.selectedKey)
    const dispatch = useDispatch()
    const [popularity, setPopularity] = useState({})
    
    const getPopularity = () => {
        let likeCount = joke.filter(item => item.key == jokeKey)[0].like
        let popularity
        if(likeCount >= 101){
            popularity = {text: 'Epic', color: 'red'}
        }else if(likeCount >= 51 && likeCount <= 100){
            popularity = {text: 'Trending', color: 'pale-orange'}
        }else{
            popularity = {text: 'Popular', color: 'blue'}
        }
        
        setPopularity(popularity)

    }
    
    useEffect(() => {
        getPopularity()
    }, [joke.filter(item => item.key == jokeKey)[0].like])
    
    return  ( <div className="single-joke-container">
            <div className="back-arrow-wrapper" onClick={()=>{dispatch(storeAction.goBack())}}>
                <img src="../assets/assets2/arrow-left-copy-2.png"></img>
            </div>
            <div className="single-joke-card">
                <div className="single-joke-header">
                    <div className="single-joke-category">
                      {joke.filter(item => item.key == jokeKey)[0].category}
                    </div>
                    <div className={`single-joke-popularity popularity-${popularity.color}`}>
                        &bull; {popularity.text}
                    </div>
                </div>
                <div className="single-joke-title">
                    The Chuck Joke
                </div>
                <div className="single-joke-text"> 
                {joke.filter(item => item.key == jokeKey)[0].joke}
                </div>
            </div>
            <div className="single-joke-actions">
                <div className="like-dislike-container">
                    <div>
                        <div className="like-wrapper" onClick={() => {dispatch(storeAction.likeJoke())}}>
                            <img src="../assets/assets2/hand.png"></img>
                        </div>
                        <div className="like-counter">{joke.filter(item => item.key == jokeKey)[0].like}</div>
                    </div>
                    <div>
                        <div className="dislike-wrapper" onClick={() => {dispatch(storeAction.dislikeJoke())}}>
                            <img src="../assets/assets2/hand-copy.png"></img>
                        </div>
                        <div className="dislike-counter">{joke.filter(item => item.key == jokeKey)[0].dislike}</div>
                    </div>
                </div>
                
                <div className="next-prev-container">
                    <div className="prev-button" onClick={() => {jokeKey == 0 ? console.log('NO PREV') : dispatch(storeAction.prevJoke())}}>
                        <img src="../assets/assets2/arrow-left.png"></img>
                        <div className="prev-text">PREV JOKE</div>
                    </div> 
                    <div className="next-button" onClick={() => {dispatch(storeAction.nextJoke())}}>
                        <div className="next-text">NEXT JOKE</div>
                        <img src="../assets/assets2/arrow-left-copy.png"></img>
                    </div>
                </div>
            </div>
        </div>
    )
 
}


export default Joke