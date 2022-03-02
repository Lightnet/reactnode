/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://v5.reactrouter.com/web/guides/quick-start
// https://reacttraining.com/blog/react-router-v6-pre/
// https://dev.to/salehmubashar/usenavigate-tutorial-react-js-aop

import React from 'react';
import { AuthProvider } from './auth/AuthProvider.jsx';
import { RoutePage } from './RoutePage.jsx';
import { ThemeProvider } from './theme/ThemeProvider.jsx';
import { BrowserRouter } from 'react-router-dom';
import { NotifyProvider } from './notify/NotifyProvider.jsx';
import { Provider } from "react-redux";
import store from "./store/store.jsx";
import { EventProvider } from './event/EventProvider.jsx';

export default function App() {

  return (<>
    <Provider store={store}>
      <EventProvider>
        <ThemeProvider>
          <NotifyProvider>
            <AuthProvider>
              <BrowserRouter>
                <RoutePage />
              </BrowserRouter>
            </AuthProvider>
          </NotifyProvider>
        </ThemeProvider>
      </EventProvider>
    </Provider>
  </>)
}