import { toast } from 'react-toastify';

export function SuccessMessage(message) {
  if (message) {
    toast.success(message);
  }
}
