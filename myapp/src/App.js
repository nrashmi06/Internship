// import './App.css';
// import React from 'react';
// import {Link, Route , Routes, useRoutes } from 'react-router-dom';
// import About from './About';
// import Home from './Home';
// import Item from './Item';
// import NewItem from './NewItem';
// import ItemLayout from './ItemLayout';
// function App() {
//   // let element = useRoutes([
//   //   {
//   //         path: '/',
//   //         element: <Home />
//   //   },
//   //   {
//   //       path: '/about',
//   //       element: <ItemLayout />,
//   //       children: [
//   //         {
//   //           index: true,
//   //           element: <Item />
//   //         },
//   //         { 
//   //          index: true,
//   //           element: <NewItem />
//   //         },
//   //         {
//   //           index: true,
//   //           element: <About />
//   //         }
//   //       ]
//   //   },
//   //   {
//   //     path: '*',
//   //     element: <h1>Not Found</h1>
//   //   }
//   // ])
//   return (
//     <>
//     <Routes location="/about">
//       <Route path="/about" element={<h1> Extra Content </h1>} />
//     </Routes>
//     <nav>
//       <ul>
//         <li><Link to ='/'>Home</Link></li>
//         <li><Link to ='/about'>About</Link></li>
//       </ul>
//     </nav>
//     <div>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path='/about' element={<ItemLayout/>}>
//           <Route index element={<Item/>}/>
//           <Route path=':id' element={<About/>}/>
//           <Route path='new' element={<NewItem/>}/>
//         </Route>
//         {/* <Route path="/about" element ={<Item />} />
//         <Route path="/about/:id" element={<About />} />
//         <Route path='/about/new' element ={<NewItem/>}/> */}
//         <Route path='*' element={ <h1>Not Found</h1>  }/>
//       </Routes>
//     </div>
//     </>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './Login';
import Signup from './Task-2/Signup';
import './App.css';

function App() {
  return (
  <>
      <h1>HOME</h1>
      <nav>
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Signup</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      </>
  );
}

export default App;
