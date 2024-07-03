import { useDispatch } from 'react-redux';
import './App.css'
import { useState, useEffect } from 'react'
import authService from './appwrite/auth_service'
import { login, logout } from './store/authSlice'
import { Header, Footer } from './components/index'
import conf from './conf/config';
function App() {
  //you can do conditional rendoring on the basis of loading
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  
  //environment variables are set up correctly
  // console.log( " bucket    " + conf.appwriteBucketId);
  // console.log( " collection   " + conf.appwriteCollectionId)
  // console.log( "  url   " + conf.appwriteUrl)
  // console.log( " project  " + conf.appwriteProjectId)
  // console.log( "datbase    " + conf.appwriteDatabaseId)

  useEffect(() => {
    authService.getCurrentUser().then((userData) => {
      if (userData) {
        dispatch(login({ userData }));
      }
      dispatch(logout());
    }).finally(() => { setLoading(false) });
  }, [])

  if (loading) {
    return (
      <div className=' min-h-screen flex flex-wrap bg-gray-700 content-between' >
        <div className=" w-full block">
          <Header />
          <main>
            {/* todo */}
            {/* <>outlet</> */}
          </main>
          <Footer />
        </div>
      </div>
    )
  }
    else {
       return (
          <div  className='bg-red-500' >
            done
          </div>    
      )
    }

}


export default App
