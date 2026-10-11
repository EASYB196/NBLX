
import toast from 'react-hot-toast';

export const showToast = (type, message) => {
  toast.dismiss();

  toast[type](message, {
    id: 'nblx-global-toast',
    duration: 3000,
  });
};