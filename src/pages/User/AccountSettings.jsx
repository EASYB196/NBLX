import { sendPasswordResetEmail, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { auth } from '../../firebase';
import AccountLayout from './AccountLayout';

export default function AccountSettings() {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const resetPassword = async () => {
    if (!user?.email) {
      toast.error('No email address found.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, user.email);
      toast.success('Password reset email sent.');
    } catch (error) {
      console.error(error);
      toast.error('Unable to send the reset email.');
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      navigate('/auth/login', { replace: true });
    } catch (error) {
      console.error(error);
      toast.error('Unable to log out.');
    }
  };

  return (
    <AccountLayout
      title="Account Settings"
      description="Manage your security and account preferences."
    >
      <div className="space-y-5">
        <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-8">
          <h2 className="text-xl font-bold">Password and security</h2>
          <p className="mt-2 text-sm text-gray-500">
            Send a password reset link to {user?.email || 'your account email'}.
          </p>

          <button
            type="button"
            onClick={resetPassword}
            className="mt-5 rounded-xl border border-gray-300 px-5 py-3 text-sm font-semibold transition hover:bg-black hover:text-white"
          >
            Send password reset email
          </button>
        </section>

        <section className="rounded-2xl border border-red-100 bg-white p-5 sm:p-8">
          <h2 className="text-xl font-bold">Sign out</h2>
          <p className="mt-2 text-sm text-gray-500">
            Sign out of your NBLX account on this device.
          </p>

          <button
            type="button"
            onClick={logout}
            className="mt-5 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white"
          >
            Log out
          </button>
        </section>
      </div>
    </AccountLayout>
  );
}