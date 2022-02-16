/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://v5.reactrouter.com/web/guides/quick-start
// https://reacttraining.com/blog/react-router-v6-pre/
// https://dev.to/salehmubashar/usenavigate-tutorial-react-js-aop

import React from 'react';
import { AuthProvider } from './auth/auth.js';
import { RoutePage } from './routepage.js';
import { ThemeProvider } from './theme/themeprovider.js';
import { BrowserRouter } from 'react-router-dom';
import { NotifyProvider } from './notify/notifyprovider.js';
import { Provider } from "react-redux";
import store from "./store/store.js";

export default function App() {

  return (<>
    <Provider store={store}>
      <ThemeProvider>
        <NotifyProvider>
          <AuthProvider>
            <BrowserRouter>
              <RoutePage />
            </BrowserRouter>
          </AuthProvider>
        </NotifyProvider>
      </ThemeProvider>
    </Provider>
  </>);
}

// 