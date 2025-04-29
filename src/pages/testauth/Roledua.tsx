import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../redux/store';
import { authService } from '../../api/authServices';
import { logout } from '../../redux/auth/authSlice';
import toast from 'react-hot-toast';
import { UserType } from '../../type/auth';

const Roledua = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await authService.getProfile();
        setUser(response.user);
      } catch (error) {
        toast.error('Gagal mengambil profil user');
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await authService.logout();
      dispatch(logout());
      toast.success('Logout berhasil');
      navigate('/login');
    } catch (error) {
      toast.error('Gagal logout. Silakan coba lagi.');
      console.error(error);
    }
  };

  return (
    <div>
      <h1>role 0</h1>

      {user ? (
        <div className="mb-4">
          <p>
            <strong>Nama:</strong> {user.nama_depan} {user.nama_belakang}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
        Logout
      </button>
    </div>
  );
};

export default Roledua;
