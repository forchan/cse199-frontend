import { NotificationManager } from 'react-notifications';

export const INFO = 'info';
export const SUCCESS = 'success';
export const WARNING = 'warning';
export const ERROR = 'error';

// returns a function that can be called
export const createNotification = (message, type) => {
  return () => {
    switch (type) {
      case INFO:
        NotificationManager.info(message, 'Info', 5500);
        break;
      case SUCCESS:
        NotificationManager.success(message, 'Success', 5500);
        break;
      case WARNING:
        NotificationManager.warning(message, 'Warning', 5500);
        break;
      case ERROR:
        NotificationManager.error(message, 'Uh oh..', 5500);
        break;
      default:
        console.log('Wrong message type');
    }
  };
};
