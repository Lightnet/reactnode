/*
  LICENSE: MIT
  Created by: Lightnet
*/
import './style/globals.css'

import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'

import { Provider } from 'react-redux'
import { AuthProvider } from './components/auth/AuthProvider'
import { NotifyProvider } from './components/notify/NotifyProvider'
import { ThemeProvider } from './components/theme/ThemeProvider'
import { EventProvider } from './components/event/EventProvider'

import store from "./components/store/store.jsx";

ReactDOM.hydrate(
  <Provider store={store}>
    <EventProvider>
      <ThemeProvider>
        <NotifyProvider>
          <AuthProvider>
            <BrowserRouter>
              
                <App />
              
            </BrowserRouter>
          </AuthProvider>
        </NotifyProvider>
      </ThemeProvider>
    </EventProvider>
  </Provider>
  ,
  document.getElementById('app')
)