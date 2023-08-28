import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./components/user/SignUp";
import { useEffect, useState } from "react";

//_______________theme_______________
import { responsiveFontSizes } from '@mui/material/styles';
import { Box, CssBaseline, ThemeProvider, } from '@mui/material';
import { createCustomTheme } from './theme';
//_______________ end theme_______________
import Login from "./components/user/Login";
import ForgotPassword from "./components/user/ForgotPassword";
import Message from "./components/user/Message";
import ResetPassword from "./components/user/ResetPassword";
import Navbar from "./components/navbar/Navbar";
import Profile from "./components/user/Profile";
import UpdatePassword from "./components/user/UpdatePassword";
import UserUpdatesInfo from "./components/user/UserUpdatesInfo";
import { useSelector } from "react-redux";
// import { authenticateUser } from "./ReduxToolKit/userSlice";
import Loading from "./components/Loader/Loading";
import Logout from "./components/user/Logout";
import Home from "./components/Home/Home";
import PostList from "./components/Home/PostList";
import VerificationCode from "./components/user/VerificationCode";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import SinglePost from "./components/Home/SinglePost";

import VerificationForm from "./components/user/UpdateEmailVerify";
// import { Interval } from "./components/interval/Interval";
import CreateGroup from "./components/Home/CreateGroup";
import GroupPost from "./components/Home/GroupPost";
// import ReSendVerifyCode from "./components/user/ReSendVerifyCode";
// import Footer from "./components/Footer/Footer";




function App() {
  // const dispatch = useDispatch();


  //_______________theme_______________
  const [mode, setMode] = useState(true);
  let theme = createCustomTheme(mode ? "light" : "dark");
  theme = responsiveFontSizes(theme);
  const themeToggler = () => {
    setMode(!mode);
    // console.log("mode", mode)
  }
  //_______________theme end_____________


  // const isAuthenticated = useSelector((state) => state?.user?.isAuthenticated);

  // console.log('data app .js', isAuthenticated)

  // useEffect(() => {
  //   dispatch(authenticateUser());
  // }, [dispatch]);

  // const token = localStorage.getItem("token");
  // console.log('token', token)
  // useEffect(() => {
  //   dispatch(authenticateUser());
  //   if (token) {
  //     setIsAuthenticated(true);
  //   } else {
  //     setIsAuthenticated(false);
  //   }
  // }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const data = useSelector((state) => state?.user?.user?.user);




  useEffect(() => {
    setLoading(true);
    setIsAuthenticated(data?._id);
    setLoading(false);
  }, [data]);



  // const onClinkHandler = () => {
  //   setLoading(true);
  //   dispatch(authenticateUser());
  //   setLoading(false);

  // }


  // _______________Loading State________________
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Loading isLoading={loading} />
      {/* <Interval /> */}
      {/* //_______________theme_______________ */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar mode={mode} themeToggler={themeToggler} />
        {/* <NavWeb mode={mode} themeToggler={themeToggler} /> */}
        {/* //_______________end theme_______________ */}


        {/* <ToastContainer /> */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 3

        }}>
          {/* <Button variant="gradient" onClick={onClinkHandler}>Refresh</Button> */}
          {/* <Button variant="gradient" onClick={onClinkHandlerLogout}>Logout</Button> */}
        </Box>

        <Routes>

          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />

          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/message" element={<Message />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/UserUpdatesInfo" element={<UserUpdatesInfo />} />
          <Route path="/updatePassword" element={<UpdatePassword />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/postList" element={<PostList />} />
          <Route path="/verificationCode" element={<VerificationCode />} />

          {/* <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} /> */}
          <Route path="/about" element={isAuthenticated ? <About /> : <Navigate to="/login" />} />
          <Route path="/contact" element={isAuthenticated ? <Contact /> : <Navigate to="/login" />} />
          <Route path="/singlePost/:postId" element={<SinglePost />} />
          <Route path="/VerificationForm/:userId" element={<VerificationForm />} />
          <Route path="/createGroup" element={<CreateGroup />} />
          <Route path="/GroupPost/:id" element={<GroupPost />} />


        </Routes>


        {/* <Footer /> */}

      </ThemeProvider>
    </>
  );
}

export default App;
