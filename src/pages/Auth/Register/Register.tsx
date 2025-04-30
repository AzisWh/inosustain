import { AuthLayout } from '../../../components/AuthLayout/AuthLayout';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { registerUser } from '../../../redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Gender } from '../../../type/auth';

const Register = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<{
    nama_depan: string;
    nama_belakang: string;
    email: string;
    no_hp: string;
    gender: Gender;
    password: string;
  }>({
    nama_depan: '',
    nama_belakang: '',
    email: '',
    no_hp: '',
    gender: 'L',
    password: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { nama_depan, nama_belakang, email, no_hp, gender, password } =
      formData;

    if (
      !nama_depan ||
      !nama_belakang ||
      !email ||
      !no_hp ||
      !gender ||
      !password
    ) {
      toast.error('Semua field wajib diisi!');
      return;
    }
    try {
      const response = await dispatch(registerUser(formData)).unwrap();
      toast.success('Registrasi berhasil!');
      navigate('/login');
      toast.success('User berhasil didaftarkan' + response.user.nama_depan);
    } catch (error: any) {
      if (error?.errors) {
        const firstErrorKey = Object.keys(error.errors)[0];
        toast.error(error.errors[firstErrorKey][0]);
      } else if (typeof error === 'string') {
        toast.error(error);
      } else {
        toast.error('Registrasi gagal.');
      }
    }
  };
  return (
    <AuthLayout title="Create your account">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex gap-2">
          <div className="w-1/2">
            <label className="block mb-1 text-sm">Nama Depan</label>
            <input
              type="text"
              name="nama_depan"
              value={formData.nama_depan}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Ali"
              required
            />
          </div>
          <div className="w-1/2">
            <label className="block mb-1 text-sm">Nama Belakang</label>
            <input
              type="text"
              name="nama_belakang"
              value={formData.nama_belakang}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Topan"
              required
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 text-sm">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="your@email.com"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">No HP</label>
          <input
            type="text"
            name="no_hp"
            value={formData.no_hp}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="0877xxx"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 border rounded-md">
            <option value="L">Laki-Laki</option>
            <option value="P">Perempuan</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="********"
            required
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
