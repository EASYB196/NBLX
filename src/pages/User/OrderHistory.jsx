import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../firebase';
import AccountLayout from './AccountLayout';

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        if (isMounted) {
          setOrders([]);
          setLoading(false);
        }
        return;
      }

      try {
        setLoading(true);

        const ordersRef = collection(
          db,
          'userOrders',
          user.uid,
          'orders'
        );

        const snapshot = await getDocs(ordersRef);

        const userOrders = snapshot.docs.map((doc) => ({
          ...doc.data(),
          reference: doc.id,
        }));

        userOrders.sort((a, b) => {
          const dateA = a.createdAt?.toDate
            ? a.createdAt.toDate().getTime()
            : new Date(a.createdAt || 0).getTime();

          const dateB = b.createdAt?.toDate
            ? b.createdAt.toDate().getTime()
            : new Date(b.createdAt || 0).getTime();

          return dateB - dateA;
        });

        if (isMounted) setOrders(userOrders);
      } catch (error) {
        console.error('Unable to load orders from Firestore:', error);
        if (isMounted) setOrders([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  return (
    <AccountLayout
      title="My Orders"
      description="View your purchases and track deliveries."
    >
      <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-8">
        <h2 className="text-xl font-bold">Order history</h2>

        {loading ? (
          <div className="py-12 text-center text-sm text-gray-500">
            Loading your orders...
          </div>
        ) : !orders.length ? (
          <div className="py-12 text-center">
            <p className="text-lg font-semibold">No orders yet</p>
            <p className="mt-2 text-sm text-gray-500">
              Your purchases will appear here when your orders are saved.
            </p>

            <Link
              to="/category"
              className="mt-5 inline-block rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white!"
            >
              Explore collections
            </Link>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {orders.map((order) => {
              const orderId =
                order.orderId || order.id || order.reference;

              const createdAt = order.createdAt?.toDate
                ? order.createdAt.toDate()
                : order.createdAt
                  ? new Date(order.createdAt)
                  : null;

              return (
                <article
                  key={order.reference}
                  className="rounded-xl border border-gray-200 p-4"
                >
                  <div className="flex flex-wrap justify-between gap-3">
                    <div>
                      <p className="font-semibold">
                        Order #{orderId || 'NBLX'}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        {createdAt && !Number.isNaN(createdAt.getTime())
                          ? createdAt.toLocaleDateString('en-NG')
                          : 'Date unavailable'}
                      </p>
                    </div>

                    <span className="h-fit rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">
                      {order.status || 'Processing'}
                    </span>
                  </div>

                  <p className="mt-4 font-semibold">
                    {order.total != null
                      ? `₦${Number(order.total).toLocaleString('en-NG')}`
                      : 'Total unavailable'}
                  </p>

                  {order.items?.length > 0 && (
                    <p className="mt-1 text-sm text-gray-500">
                      {order.items.length} item(s)
                    </p>
                  )}

                  <Link
                    to="/track-order"
                    className="mt-4 inline-block text-sm font-semibold underline"
                  >
                    Track an order
                  </Link>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </AccountLayout>
  );
}