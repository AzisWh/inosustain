import { useState } from 'react';
import { authService } from '../../../api/authServices';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../../../components/AuthLayout/AuthLayout';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [loading, isLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    isLoading(true);
    try {
      await authService.sendVerificationCode({ email });
      toast.success('Kode verifikasi telah dikirim!');
      navigate(`/reset-password?email=${encodeURIComponent(email)}`);
    } catch (error) {
      toast.error('Gagal mengirim kode verifikasi');
    } finally {
      isLoading(false);
    }
  };
  return (
    <AuthLayout
      title="Lupa Password"
      subtitle="Masukkan email Anda untuk menerima kode verifikasi">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          className="w-full p-2 border rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 text-white rounded transition 
                ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-[#0D4883] hover:bg-[#0D4883]'
                }`}>
          {loading ? 'Memproses...' : 'Kirim Kode'}
        </button>
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;
