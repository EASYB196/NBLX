
import { useEffect, useState } from 'react';
import { updateProfile } from 'firebase/auth';
import toast from 'react-hot-toast';
import { auth } from '../../firebase';
import AccountLayout from './AccountLayout';

export default function ProfileDetails() {
  const user = auth.currentUser;
  const [name, setName] = useState(user?.displayName || '');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setName(user?.displayName || '');
  }, [user]);

  const showToast = (type, message) => {
    toast.dismiss('nblx-global-toast');

    toast[type](message, {
      id: 'nblx-global-toast',
      duration: 3000,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      showToast('error', 'Please log in to update your details.');
      return;
    }

    if (saving) return;

    const cleanName = name.trim();

    if (cleanName.length < 2) {
      showToast('error', 'Please enter a valid name.');
      return;
    }

    try {
      setSaving(true);

      await updateProfile(user, {
        displayName: cleanName,
      });

      setName(cleanName);
      showToast('success', 'Personal details updated.');
    } catch (error) {
      console.error('Profile update failed:', error);
      showToast('error', 'Unable to update your details.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AccountLayout
      title="Personal Details"
      description="Manage your account information."
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl border border-gray-200 bg-white p-5 sm:p-8"
      >
        <h2 className="text-xl font-bold">Your information</h2>

        <div>
          <label
            htmlFor="fullName"
            className="mb-2 block text-sm font-medium"
          >
            Full name
          </label>

          <input
            id="fullName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            required
            disabled={saving}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-black disabled:opacity-60"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium"
          >
            Email address
          </label>

          <input
            id="email"
            type="email"
            value={user?.email || ''}
            readOnly
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-500"
          />

          <p className="mt-2 text-xs text-gray-500">
            Your email is managed by Firebase Authentication.
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? 'Saving...' : 'Save changes'}
        </button>
      </form>
    </AccountLayout>
  );
}