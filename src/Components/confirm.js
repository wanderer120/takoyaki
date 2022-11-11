
import { createConfirmation } from 'react-confirm';
import Confirmation from './Confirmation';

const confirm = createConfirmation(Confirmation);

export default function(confirmation, options = {}) {
  return confirm({ confirmation, ...options });
}