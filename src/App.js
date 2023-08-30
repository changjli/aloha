import BlogDetail from './BlogDetail';
import './css/index.css';
import Home from './Home';
import Authorization from './Authorization';
import Navbar from './Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './Profile';
import BlogHistory from './BlogHistory';
import EditProfile from './EditProfile';
import CreateBlog from './CreateBlog';
import UpdateBlog from './UpdateBlog';
import Categories from './Categories';
import VerifyRegister from './VerifyRegister';
import Guest from './GuestMiddleware';
import Auth from './AuthMiddleware';
import Semi from './SemiMiddleware';
import Tes from './Tes';
import SearchResult from './SearchResult';
import VerifyUpdateEmail from './VerifyUpdateEmail';
import ResetPassword from './ResetPassword';
import Category from './Category';
import ForgotPassword from './ForgotPassword';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          // home, all blogs
          <Route path='/' element={<Semi children={<Home />} />} />

          <Route path='/search/:q' element={<Semi children={<SearchResult />} />} />

          // blog detail
          <Route path='/blog/:slug' element={<Semi children={<BlogDetail />} />} />

          // login, register
          <Route path='/authorization' element={<Guest children={<Authorization />} />}></Route>

          // verify register
          <Route path='register/:code' element={<Guest children={<VerifyRegister />} />} />

          <Route path='forgot-password' element={<Guest children={<ForgotPassword />} />} />

          // profile
          <Route path='/user/:username' element={<Semi children={<Profile />} />}>
            <Route path='' element={<BlogHistory type='post' />} />
            <Route path='keep' element={<BlogHistory type='keep' />} />
            <Route path='like' element={<BlogHistory type='like' />} />
          </Route>

          // edit profile
          <Route path='/profile/edit' element={<Auth children={<EditProfile />} />} />

          // create blog
          <Route path='/blog/create' element={<Auth children={<CreateBlog />} />} />

          // update blog
          <Route path='/blog/:slug/edit' element={<Auth children={<UpdateBlog />} />} />

          // all categories
          <Route path='/categories' element={<Auth children={<Categories />} />}></Route>

          // all blogs by category
          <Route path='/category/:category' element={<Auth children={<Category />} />} />

          // update email
          <Route path='/profile/email/:code' element={<Semi children={<VerifyUpdateEmail />} />} />

          // forgot password, reset password
          <Route path='/reset-password/:token' element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
