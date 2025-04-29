import { AuthLayout } from '../../../components/AuthLayout/AuthLayout';

const Register = () => {
  return (
    <AuthLayout title="Create your account">
      <form className="flex flex-col gap-4">
        <div className="flex gap-2">
          <div className="w-1/2">
            <label className="block mb-1 text-sm">Nama Depan</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              placeholder="Ali"
            />
          </div>
          <div className="w-1/2">
            <label className="block mb-1 text-sm">Nama Belakang</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              placeholder="Topan"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 text-sm">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded-md"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">No HP</label>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            placeholder="0877xxx"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Gender</label>
          <select className="w-full p-2 border rounded-md">
            <option value="L">Laki-Laki</option>
            <option value="P">Perempuan</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm">Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded-md"
            placeholder="********"
          />
        </div>

        <button
          type="submit"
          className="bg-[#0D4883] text-white py-2 rounded-md hover:bg-[#0D4883] transition">
          Create Account
        </button>
      </form>

      <p className="text-sm mt-4">
        Already have an account?{' '}
        <a href="/login" className="text-[#0D4883] hover:underline">
          Sign in
        </a>
      </p>
    </AuthLayout>
  );
};

export default Register;
