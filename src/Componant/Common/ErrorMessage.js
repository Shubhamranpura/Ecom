import { toast } from 'react-toastify';

export function ErrorMessage(message) {
  if (message) {
    toast.error(message);
  }
}
