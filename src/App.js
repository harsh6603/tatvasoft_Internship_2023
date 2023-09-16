import './App.css';
import Home from './components/Home';
import User from './components/User';
import Book from './components/Book';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Registration from './components/Registration';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';
import Footer from './components/Footer';
import BookState from './context/BookState';
import EditBook from './components/EditBook';
import EditUser from './components/EditUser';
import Category from './components/Category';
import EditCategory from './components/EditCategory';
import Cart from './components/Cart';
import CartState from './context/CartState';
// import BookOperation from './components/Book';

function App() {
  return (
    <div className="App">
      <Router>
        <BookState>
          <CartState>
            <ToastContainer />
            <Navbar />
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/user' element={<User />} />
              <Route exact path='/book' element={<Book />} />
              <Route exact path='/category' element={<Category />} />
              <Route exact path='edit-book/:id' element={<EditBook />} />
              <Route exact path='add-book/' element={<EditBook />} />
              <Route exact path='edit-user/:id' element={<EditUser />} />
              <Route exact path='edit-category/:id' element={<EditCategory />} />
              <Route exact path='add-category/' element={<EditCategory />} />
              <Route exact path='cart/' element={<Cart />} />
              {/* <Route exact path='/bookOperation' element={<BookOperation />} /> */}
              <Route exact path='/register' element={<Registration />} />
              <Route exact path='/login' element={<Login />} />
            </Routes>
            <Footer />
          </CartState>
        </BookState>
      </Router>
    </div>
  );
}

export default App;
