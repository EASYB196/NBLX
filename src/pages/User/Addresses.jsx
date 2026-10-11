import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { auth } from '../../firebase';
import AccountLayout from './AccountLayout';

export default function Addresses() {
  const uid = auth.currentUser?.uid;
  const storageKey = uid ? `nblx_addresses_${uid}` : null;

  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
  });

  useEffect(() => {
    if (!storageKey) return;

    try {
      const saved = localStorage.getItem(storageKey);
      setAddresses(saved ? JSON.parse(saved) : []);
    } catch {
      setAddresses([]);
    }
  }, [storageKey]);

  const persist = (next) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
      setAddresses(next);
      return true;
    } catch (error) {
      console.error(error);
      toast.error('Unable to save your address.');
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!storageKey) return;

    const next = [
      ...addresses,
      { ...form, id: crypto.randomUUID() },
    ];

    if (persist(next)) {
      setForm({
        fullName: '',
        phone: '',
        address: '',
        city: '',
        state: '',
      });
      toast.success('Address saved.');
    }
  };

  const removeAddress = (id) => {
    if (persist(addresses.filter((address) => address.id !== id))) {
      toast.success('Address removed.');
    }
  };

  return (
    <AccountLayout
      title="Delivery Addresses"
      description="Manage your shipping information."
    >
      <div className="space-y-6">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-gray-200 bg-white p-5 sm:p-8"
        >
          <h2 className="text-xl font-bold">Add an address</h2>

          {[
            ['fullName', 'Full name'],
            ['phone', 'Phone number'],
            ['address', 'Street address'],
            ['city', 'City'],
            ['state', 'State'],
          ].map(([key, label]) => (
            <div key={key}>
              <label className="mb-2 block text-sm font-medium">
                {label}
              </label>
              <input
                required
                value={form[key]}
                onChange={(e) =>
                  setForm({ ...form, [key]: e.target.value })
                }
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-black"
              />
            </div>
          ))}

          <button className="rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white">
            Save address
          </button>
        </form>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-8">
          <h2 className="text-xl font-bold">Saved addresses</h2>

          {addresses.length === 0 ? (
            <p className="py-8 text-sm text-gray-500">
              You haven't saved a delivery address yet.
            </p>
          ) : (
            <div className="mt-5 space-y-3">
              {addresses.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-wrap justify-between gap-4 rounded-xl border border-gray-200 p-4"
                >
                  <div>
                    <p className="font-semibold">{item.fullName}</p>
                    <p className="mt-1 text-sm text-gray-600">{item.phone}</p>
                    <p className="mt-1 text-sm text-gray-600">
                      {item.address}, {item.city}, {item.state}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeAddress(item.id)}
                    className="text-sm font-semibold text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AccountLayout>
  );
}