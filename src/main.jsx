import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.jsx'
import { createBrowserRouter,RouterProvider,Route } from 'react-router-dom'
import { SignIn } from './routes/SignIn.jsx';
import { Home } from './routes/Home.jsx';

const router = createBrowserRouter(
  [
    {
      element: <App />,
      children: [
        {
          path: '/',
          element: <SignIn />,     
        },
        {
          path: '/login',
          element: <SignIn />
        },
        {
          path: '/home',
          element: <Home />
        } 
      ],
    }
  ]
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}> 

    </RouterProvider>
  </React.StrictMode>,
)
