import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Home from "./pages/Home.jsx"
import Auth from "./pages/Auth.jsx"
import AllPosts from "./pages/AllPosts.jsx"
import AddPost from "./pages/AddPost.jsx"
import EditPost from "./pages/EditPost.jsx"
import Post from "./pages/Post.jsx"
import { Provider } from 'react-redux'
import { store } from "./store/store.js";

import SnackbarProvider from 'react-simple-snackbar'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
    
      {
        path: "/all-posts",
        element: (
            <AllPosts />
        )
      },
      {
        path: "/add-post",
        element: (
            <AddPost />
        )
      },
      {
        path: "/edit-post/:slug",
        element: (
            <EditPost />
        )
      },
      {
        path: "/post/:slug",
        element: (
            <Post />
        )
      }
 ,
      {
        path: "/login",
        element: (
            <Auth />
        )
      },
    ]
   }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SnackbarProvider>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    </SnackbarProvider>
  </React.StrictMode>,
)