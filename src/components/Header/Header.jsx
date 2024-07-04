import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Logo, LogoutBtn, Container } from '../index'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  //mne yha change kia hain thoda dekh lena last mein
  const authStatus = useSelector((state) => state.authStatus)
  const navigate = useNavigate();

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]


  return (
    <header className='py-3 shadow bg-gray-500' >

      <Container>
        <nav className='flex' >
          <div className=' mr-4 ' >
            {/* <link to='/' >
              <Logo width='70px' />
            </link> */}
            <ul className='flex ml-auto' >
              {
                navItems.map((item) => item.active ?
                  <li key={item.name} >
                    <button className=' inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                     onClick={() =>{navigate(item.slug)}}
                      >
                      {item.name}
                    </button>
                  </li> : null)
              }
              {
                authStatus &&
                <li>
                   <LogoutBtn/>
                </li>
              }
            </ul>
          </div>

        </nav>
      </Container>

    </header>
  )
}

export default Header