import { useState } from 'react';
import { AuthLayout } from '../../../components/AuthLayout/AuthLayout';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../redux/store';
import { loginUser } from '../../../redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const loading = useSelector((state: RootState) => state.auth.loading);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await dispatch(loginUser({ email, password })).unwrap();

      toast.success('Login successful!');

      if (response.user.role_type === 2) {
        navigate('/dashboard-admin');
        // console.log(response.user);
      } else if (response.user.role_type === 1) {
        navigate('/');
        console.log(response.user);
      } else {
        toast.error('Unknown role');
      }
    } catch (error: any) {
      const errorMessage = typeof error === 'string' ? error : 'Login gagal.';
      toast.error(errorMessage);
      console.log(errorMessage);
    }
  };

  return (
    <AuthLayout title="Welcome back">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1 text-sm">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded-md"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 text-sm">Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded-md"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded" />
            Remember me
          </label>
          <a href="#" className="text-blue-600 hover:underline">
            Forgot password?
          </a>
        </div> */}

        <button
          type="submit"
          className="bg-[#0D4883] text-white py-2 rounded-md hover:bg-[#0D4883] transition"
          disabled={loading}>
          {loading ? 'Loading...' : 'Sign in to your account'}
        </button>
      </form>

      <p className="mt-4 text-sm">
        Don't have an account?{' '}
        <a href="/register" className="text-[#0D4883] hover:underline">
          Sign up
        </a>
      </p>
    </AuthLayout>
  );
};

export default Login;
