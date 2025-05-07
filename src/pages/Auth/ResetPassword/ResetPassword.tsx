import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../../../api/authServices';
import toast from 'react-hot-toast';
import { AuthLayout } from '../../../components/AuthLayout/AuthLayout';

const ResetPassword = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const queryEmail = new URLSearchParams(search).get('email');

  const [form, setForm] = useState({
    email: '',
    verification_code: '',
    new_password: '',
    new_password_confirmation: '',
  });

  useEffect(() => {
    if (queryEmail) {
      setForm((prev) => ({ ...prev, email: queryEmail }));
    }
  }, [queryEmail]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authService.resetPassword(form);
      toast.success('Password berhasil direset!');
      navigate('/login');
    } catch (error) {
      toast.error('Gagal reset password!');
    }
  };
  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Masukkan kode verifikasi dan buat password baru">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          className="w-full p-2 bg-gray-100 border rounded"
          value={form.email}
          onChange={handleChange}
          readOnly
        />
        <input
          type="text"
          name="verification_code"
          placeholder="Kode Verifikasi"
          className="w-full p-2 border rounded"
          value={form.verification_code}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="new_password"
          placeholder="Password Baru"
          className="w-full p-2 border rounded"
          value={form.new_password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="new_password_confirmation"
          placeholder="Konfirmasi Password"
          className="w-full p-2 border rounded"
          value={form.new_password_confirmation}
          onChange={handleChange}
          required
        />
        <button className="w-full p-2 text-white bg-green-600 rounded hover:bg-green-700">
          Reset Password
        </button>
      </form>
    </AuthLayout>
  );
};

export default ResetPassword;
