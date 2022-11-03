import React from "react";
import { createRoot } from 'react-dom/client'
import './style.scss'
import { store } from './store'
import { Provider } from "react-redux";
import Main from "./Main";



const container = document.getElementById('app')

const root = createRoot(container)

root.render(
            <Provider store={store}>
                <Main/>
            </Provider>
     )

