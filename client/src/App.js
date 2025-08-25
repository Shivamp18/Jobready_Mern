







// import React, { useContext, useEffect, useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';

// // Context
// import { AuthContext, AuthProvider } from './context/AuthContext';

// // Components
// import Navbar from './components/common/Navbar';
// import PrivateRoute from './components/common/PrivateRoute';

// // Pages
// import Home from './components/Home';
// import Register from './components/auth/Register';
// import Login from './components/auth/Login';
// import VerifyEmail from './components/auth/VerifyEmail';
// import ForgotPassword from './components/auth/ForgotPassword';
// import ResetPassword from './components/auth/ResetPassword';
// import Profile from './components/profile/Profile';
// import EditProfile from './components/profile/EditProfile';
// import ForumList from './components/forum/ForumList';
// import ForumTopic from './components/forum/ForumTopic';
// import CreateTopic from './components/forum/CreateTopic';
// import FlashcardList from './components/flashcards/FlashcardList';
// import CreateFlashcard from './components/flashcards/CreateFlashcard';
// import FlashcardDetail from './components/flashcards/FlashcardDetail';
// import MockInterviewList from './components/mockInterview/MockInterviewList';
// import CreateMockInterview from './components/mockInterview/CreateMockInterview';
// import MockInterviewDetail from './components/mockInterview/MockInterviewDetail';
// import NotFound from './components/common/NotFound';
// import InactiveCardsList from './components/flashcards/InactiveCardsList';
// import UserCards from './components/flashcards/UserCards';
// import CardSession from './components/flashcards/CardSession/CardSession';
// import UpdateCard from './components/flashcards/forms/UpdateCard';
// import Footer from './components/common/Footer';

// function App() {
//  const {user} = useContext(AuthContext);



//   return (
//     <AuthProvider>
//       <Router>
//         <div className="App">
//           <Navbar />
//           <div className="main-content">
//           <div className="container">
//             <Routes>
//               <Route path="/" element={<Home />} />
//               <Route path="/register" element={<Register />} />
//               <Route path="/login" element={user ? <Navigate to ='/' replace /> : <Login />} />
//               <Route path="/verify-email/:token" element={<VerifyEmail />} />
//               <Route path="/forgot-password" element={<ForgotPassword />} />
//               <Route path="/reset-password/:token" element={<ResetPassword />} />

//               <Route path="/profile" element={<PrivateRoute isAuthenticated = {!!user}><Profile /></PrivateRoute>} />
//               <Route path="/edit-profile" element={<PrivateRoute isAuthenticated = {!!user}><EditProfile /></PrivateRoute>} />

//               <Route path="/forum" element={<PrivateRoute isAuthenticated = {!!user}><ForumList /></PrivateRoute>} />
//               <Route path="/forum/create" element={<PrivateRoute isAuthenticated = {!!user}><CreateTopic /></PrivateRoute>} />
//               <Route path="/forum/:id" element={<PrivateRoute isAuthenticated = {!!user}><ForumTopic /></PrivateRoute>} />

//               <Route path="/flashcards" element={<PrivateRoute isAuthenticated = {!!user}><FlashcardList /></PrivateRoute>} />
//               <Route path="/flashcards/create" element={<PrivateRoute isAuthenticated = {!!user}><CreateFlashcard /></PrivateRoute>} />
//               <Route path="/flashcards/:id" element={<PrivateRoute isAuthenticated = {!!user}><UpdateCard /></PrivateRoute>} />
              

//               <Route
//                 exact
//                 path="/manage-active-cards"
//                 element={<PrivateRoute isAuthenticated = {!!user}><UserCards /></PrivateRoute>}
//               />
//               <Route
//                 exact
//                 path="/manage-inactive-cards"
//                 element={<PrivateRoute isAuthenticated = {!!user}><InactiveCardsList /></PrivateRoute>}
//               />
//               <Route path="/card-session" element={<PrivateRoute isAuthenticated = {!!user}><CardSession/></PrivateRoute>} />

//               <Route path="/mock-interviews" element={<PrivateRoute isAuthenticated = {!!user}><MockInterviewList /></PrivateRoute>} />
//               <Route path="/mock-interviews/create" element={<PrivateRoute isAuthenticated = {!!user}><CreateMockInterview /></PrivateRoute>} />
//               <Route path="/mock-interviews/:id" element={<PrivateRoute isAuthenticated = {!!user}><MockInterviewDetail /></PrivateRoute>} />

//               <Route path="*" element={<NotFound />} />
//             </Routes>
//           </div>
//           </div>
          
//           <ToastContainer position="bottom-right" />
//         <Footer />
//         </div>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;




import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { createBrowserRouter, RouteProvider } from 'react-router-dom';

// Context
import { AuthContext, AuthProvider } from './context/AuthContext';

// Components
import Navbar from './components/common/Navbar';
import PrivateRoute from './components/common/PrivateRoute';

// Pages
import Home from './components/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import VerifyEmail from './components/auth/VerifyEmail';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import Profile from './components/profile/Profile';
import EditProfile from './components/profile/EditProfile';
import ForumList from './components/forum/ForumList';
import ForumTopic from './components/forum/ForumTopic';
import CreateTopic from './components/forum/CreateTopic';
import FlashcardList from './components/flashcards/FlashcardList';
import CreateFlashcard from './components/flashcards/CreateFlashcard';
import FlashcardDetail from './components/flashcards/FlashcardDetail';
import NotFound from './components/common/NotFound';
import InactiveCardsList from './components/flashcards/InactiveCardsList';
import UserCards from './components/flashcards/UserCards';
import CardSession from './components/flashcards/CardSession/CardSession';
import UpdateCard from './components/flashcards/forms/UpdateCard';
import Footer from './components/common/Footer';
import HomePage from './components/mockInterview/HomePage';
import CodeEditor from './components/mockInterview/CodeEditor';
import FeedbackPage from './components/mockInterview/FeedbackPage';
import Thankyou from './components/mockInterview/Thankyou';

function App() {
 const {user} = useContext(AuthContext);

 


  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <div className="main-content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={user ? <Navigate to ='/' replace /> : <Login />} />
              <Route path="/verify-email/:token" element={<VerifyEmail />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />

              <Route path="/profile" element={<PrivateRoute isAuthenticated = {!!user}><Profile /></PrivateRoute>} />
              <Route path="/edit-profile" element={<PrivateRoute isAuthenticated = {!!user}><EditProfile /></PrivateRoute>} />

              <Route path="/forum" element={<PrivateRoute isAuthenticated = {!!user}><ForumList /></PrivateRoute>} />
              <Route path="/forum/create" element={<PrivateRoute isAuthenticated = {!!user}><CreateTopic /></PrivateRoute>} />
              <Route path="/forum/:id" element={<PrivateRoute isAuthenticated = {!!user}><ForumTopic /></PrivateRoute>} />

              <Route path="/flashcards" element={<PrivateRoute isAuthenticated = {!!user}><FlashcardList /></PrivateRoute>} />
              <Route path="/flashcards/create" element={<PrivateRoute isAuthenticated = {!!user}><CreateFlashcard /></PrivateRoute>} />
              <Route path="/flashcards/:id" element={<PrivateRoute isAuthenticated = {!!user}><UpdateCard /></PrivateRoute>} />
              

              <Route
                exact
                path="/manage-active-cards"
                element={<PrivateRoute isAuthenticated = {!!user}><UserCards /></PrivateRoute>}
              />
              <Route
                exact
                path="/manage-inactive-cards"
                element={<PrivateRoute isAuthenticated = {!!user}><InactiveCardsList /></PrivateRoute>}
              />
              <Route path="/card-session" element={<PrivateRoute isAuthenticated = {!!user}><CardSession/></PrivateRoute>} />

     //FIXME -       {/* <Route path="/mock-interviews" element={<PrivateRoute isAuthenticated = {!!user}><MockInterviewList /></PrivateRoute>} /> */}
              
 
              <Route path="/mock-interviews" element={<PrivateRoute isAuthenticated = {!!user}><HomePage/></PrivateRoute>} />
              <Route path="/mock-interviews/room/:roomId" element={<PrivateRoute isAuthenticated = {!!user}><CodeEditor/></PrivateRoute>} />
              <Route path="/feedback/:roomId" element={<PrivateRoute isAuthenticated = {!!user}><FeedbackPage/></PrivateRoute>} />
              <Route path="feedback/:roomId/thank-you" element={<PrivateRoute isAuthenticated = {!!user}><Thankyou/></PrivateRoute>} />

            


              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          </div>
          
          <ToastContainer position="bottom-right" />
        <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;








