/*
  LICENSE: MIT
  Created by: Lightnet
*/

import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'

import { App } from './App'

import { Provider } from 'react-redux'
import { AuthProvider } from './components/auth/AuthProvider'
import { NotifyProvider } from './components/notify/NotifyProvider'
import { ThemeProvider } from './components/theme/ThemeProvider'
import { EventProvider } from './components/event/EventProvider'

import store from "./components/store/store.jsx";

export function render(url, context) {
  return ReactDOMServer.renderToString(
    <StaticRouter location={url} context={context}>
      <ThemeProvider>
        <EventProvider>
          <Provider store={store}>
            <NotifyProvider>              
              <AuthProvider>
                <App/>
              </AuthProvider>
            </NotifyProvider>
          </Provider>
        </EventProvider>
      </ThemeProvider>
    </StaticRouter>
  )
}