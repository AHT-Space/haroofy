import { useState } from 'react';
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../../redux/user/userSlice';
import axios from 'axios';
import OAuth from './OAuth';

const LoginFormComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return dispatch(signInFailure('Please fill all the fields'));
    }

    try {
      dispatch(signInStart());
      const response = await axios.post('api/v1/users/login', {
        email,
        password,
      });

      if (response.status === 200) {
        console.log('Login successful:', response);
        dispatch(signInSuccess(response.data));
        navigate('/');
      }
    } catch (error) {
      // Handle error
      console.error('Login error:', error);
      if (error.response.data.message) dispatch(signInFailure(error.response.data.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="w-full max-w-full flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Side (Hidden on small screens) */}
        <div className="hidden md:flex md:w-3/5 p-8 flex-col justify-center items-center">
          <h1 className="text-4xl font-bold mb-4 text-center font-serif">Write your Voice</h1>
          <img
            src="https://images.unsplash.com/photo-1626447857058-2ba6a8868cb5?q=80&w=1834&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Ink bottle on desk"
            className="w-full h-auto object-cover rounded-md"
          />
        </div>

        {/* Right Side */}
        <div className="w-full md:w-2/5 lg:w-3/6 p-4 sm:p-8 flex flex-col justify-center justify-self-start">
          <h2 className="text-3xl font-semibold mb-6 text-center font-serif">Login</h2>
          <form className="space-y-4 w-full max-w-md mx-auto" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <Button
              color='dark'
              type='submit'
              disabled={loading}
              className='w-full py-1 text-white rounded-md transition duration-300'
            >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Login'
              )}
            </Button>
            <OAuth />
          </form>
          <div className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Register
            </Link>
          </div>
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginFormComponent;
