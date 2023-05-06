// import { useEffect, useState } from 'react';
//import {BrowserRouter as Routes,Route,} from 'react-router-dom'
import {Routes, Route,Navigate} from 'react-router-dom';


// import { getPosts } from '../api';
import { useAuth } from '../hooks';
import {  Home ,Login,Signup,Settings,UserProfile } from '../pages';
import { Loader, Navbar } from './';

// const PrivateRoute=()=> {
//   //https://stackoverflow.com/questions/69923420/how-to-use-private-route-in-react-router-domv6
//   const auth = useAuth();
//   if (auth.user) {
//     return (
//       <Settings/>
//     )
//   }else{
//     return (
//       <Login/>
//     )
//   }
// }

const PrivateRoute = ({ children}) => {

  const auth = useAuth();
      // console.log("children",children);
  if (auth.user) {
      return children;
    }
    
  return <Navigate to="/" />
}

const About=()=>{
  return <h1>About</h1>
};

const UserInfo=()=>{
  return <h1>UserInfo</h1>
};

const Page404=()=>{
  return <h1>404</h1>
};


function App() {
  // const [posts, setPosts] = useState([]);
  // const [loading, setLoading] = useState(true);

  const auth = useAuth();

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const response = await getPosts();

  //     if (response.success) {
  //       setPosts(response.data.posts);
  //     }

  //     setLoading(false);
  //   };

  //   fetchPosts();
  // }, []);

  if (auth.loading) {
    return <Loader />;
  }

 // console.log(posts);
  return (
    <div className="App">
      <Navbar />
      <Routes>
           <Route path="/" element={<Home />} />
           <Route exact path="/login" element={<Login />} />
           <Route exact path="/about" element={<About />} />
           <Route exact path="/user/info" element={<UserInfo/>} />
           <Route exact path="/register" element={<Signup/>} />

           {/* <Route exact path="/settings" element={<PrivateRoute/>} /> */}
           {/* <Route exact path="/user/:userId" element={<PrivateRoute/>} /> */}
           <Route path="/settings" element={ <PrivateRoute> <Settings /> </PrivateRoute>}/>
           <Route exact path="/user/:userId" element={ <PrivateRoute> <UserProfile /> </PrivateRoute>}/>
           <Route path="*" element={<Page404/>} />
            
      </Routes>
      
    </div>
  );
}
// <Route exact path="/settings" element={<Settings/>} />
export default App;