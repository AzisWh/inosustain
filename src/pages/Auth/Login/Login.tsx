import { AuthLayout } from '../../../components/AuthLayout/AuthLayout';

const Login = () => {
  return (
    <AuthLayout title="Welcome back">
      <div className="flex flex-col gap-4">
        <button className="flex items-center justify-center border rounded-md p-2 w-full">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="w-5 h-5 mr-2"
            alt="Google"
          />
          Sign in with Google
        </button>
        <button className="flex items-center justify-center border rounded-md p-2 w-full">
          <img
            src="https://www.svgrepo.com/show/475699/apple-color.svg"
            className="w-5 h-5 mr-2"
            alt="Apple"
          />
          Sign in with Apple
        </button>
      </div>

      <div className="flex items-center my-6">
        <hr className="flex-grow border-gray-300" />
        <span className="mx-2 text-gray-400">or</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      <form className="flex flex-col gap-4">
        <div>
          <label className="block mb-1 text-sm">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded-md"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm">Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded-md"
            placeholder="Enter your password"
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded" />
            Remember me
          </label>
          <a href="#" className="text-blue-600 hover:underline">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
          Sign in to your account
        </button>
      </form>

      <p className="text-sm mt-4">
        Don't have an account?{' '}
        <a href="/register" className="text-blue-600 hover:underline">
          Sign up
        </a>
      </p>
    </AuthLayout>
  );
};

export default Login;
