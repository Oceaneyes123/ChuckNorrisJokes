import { configureStore, createSlice } from '@reduxjs/toolkit'


const storeSlice = createSlice({
    name: "store",
    initialState: {
        selectedText: "",
        selectedCategory: "",
        isJokeSelected: false,
        allJokes: [],
        selectedKey: 0,
        allJokesStatic: [],
        allCategory: [],
    },
    reducers: {
        viewJoke(state, action){
            state.isJokeSelected = true
            state.selectedKey = action.payload.key
        },
        
        goBack(state){
            state.isJokeSelected = false
        },
        
        setJokes(state, action){
            state.allJokes = action.payload
            
            if(state.allJokesStatic.length == 0){
                state.allJokesStatic = action.payload
            }
        },
        
        setCategory(state, action){
            state.allCategory = action.payload
        },
        
        nextJoke(state){
            let indexOfCurrentJoke = state.allJokes.findIndex(item => item.key == state.selectedKey)
            let nextKey = state.allJokes[indexOfCurrentJoke + 1].key
            state.selectedKey = nextKey
        },
        
        prevJoke(state){ 
            let indexOfCurrentJoke = state.allJokes.findIndex(item => item.key == state.selectedKey)
            let prevKey = state.allJokes[indexOfCurrentJoke - 1].key
            state.selectedKey = prevKey
        },
        
        likeJoke(state){
            state.allJokes.filter(item => item.key == state.selectedKey)[0].like += 1
        },
        
        dislikeJoke(state){
            state.allJokes.filter(item => item.key == state.selectedKey)[0].dislike += 1
        }
       
    }
})

export const storeAction = storeSlice.actions

export const  store = configureStore({reducer: storeSlice.reducer});