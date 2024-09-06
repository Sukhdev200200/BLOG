import ReactDOM from 'react-dom/client'
import React from 'react'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/Store.js'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Protection from './components/AuthLayout.jsx'
import Home from './Apps/Home.jsx'
import Login from './Apps/Login.jsx'
import Signup from './Apps/SingUp.jsx'
import AddPost from './Apps/AddPost.jsx'
import Post from './Apps/Post.jsx'
import Allposts from './Apps/Allposts.jsx'
import EditPost from './Apps/EditPost.jsx'


const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/login",
        element:(
          <Protection authentication={false}>
            <Login/>
          </Protection>
        )
      },
      {
        path:"/signup",
        element:(
          <Protection authentication= {false}>
            <Signup/>
          </Protection>
        )
      },
      {
        path:"/addpost",
        element:(
          <Protection authentication>
            <AddPost/>
          </Protection>
        )
      },
      {
        path:"/post/:slug",
        element:(
          <Protection authentication>
            <Post/>
          </Protection>
        )
      },
      {
        path:"/allpost",
        element:(
          <Protection authentication>
            <Allposts/>
          </Protection>
        )
      },
      {
        path:"/edit-post/:slug",
        element:(
          <Protection authentication>
            <EditPost/>
          </Protection>
        )
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode >
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
