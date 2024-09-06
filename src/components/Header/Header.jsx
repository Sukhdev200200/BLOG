import React from 'react'
import Container from '../container/Container'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import Logo from '../Logo'
import LogoutBtn from './LogoutBtn'


const Header = () => {
  const authstatus = useSelector((state)=> state.auth.status)
  const navigate = useNavigate()

  const navItem = [
    {
      name: "Home",
      slug : '/',
      active:true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authstatus
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authstatus
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authstatus
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authstatus
    }
  ]
  return (
    <header className='w-full bg-gray-100'>
      <Container>
        <nav className='flex'>
          <div className='m-3'>
          <Link to='/'>
           <Logo/>
          </Link>
          </div>
          <ul className='flex ml-auto font-bold'>
            {navItem.map((item)=>item.active?(
              <li key={item.name}>
                <button onClick={()=>navigate(item.slug)} 
                className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full '>
                  {item.name}
                </button>

              </li>

            ):null)}
          </ul>
          {authstatus && (
            <li>
              <LogoutBtn/>
            </li>
          )}
        
        </nav>
      </Container>
    </header>
  )
}

export default Header
