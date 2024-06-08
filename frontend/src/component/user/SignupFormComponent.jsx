import { useState } from 'react';
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import OAuth from './OAuth';

const SignupFormComponent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      return setErrorMessage('Please fill out all fields.');
    }

    try {
      setLoading(true);
      setErrorMessage('');
      setSuccessMessage('');
      const response = await axios.post('api/v1/users/register', {
        name,
        email,
        password,
      });
      setLoading(false);
      if (response.status === 200) {
        // console.log('Signup successful:', response);
        setSuccessMessage("Successfully logged in, redirecting to login page...");
        navigate('/login');
      }
    } catch (error) {
      // Handle error
      // console.error('Signup error:', error);
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="w-full max-w-full flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Side (Hidden on small screens) */}
        <div className="hidden md:flex md:w-3/5 p-8 flex-col justify-center items-center">
          <h1 className="text-4xl font-bold mb-4 text-center font-serif">Write your Voice</h1>
          <img
            src="https://images.unsplash.com/photo-1478641300939-0ec5188d3802?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Ink bottle on desk"
            className="w-full h-auto rounded-md"
          />
        </div>

        {/* Right Side */}
        <div className="w-full md:w-2/5 lg:w-3/6 p-4 sm:p-8 flex flex-col justify-center justify-self-start">
          <h2 className="text-3xl font-semibold mb-6 text-center font-serif">Register</h2>
          <form className="space-y-4 w-full max-w-md mx-auto" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
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
              className='w-full text-white py-1 rounded-md transition duration-300'
            >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Sign Up'
              )}
            </Button>
            <OAuth />
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
          {successMessage && (
            <Alert className='mt-5' color='success'>
              {successMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupFormComponent;
