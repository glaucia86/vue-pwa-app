/**
 * arquivo: push-notification.js
 * Data: 25/09/2018
 * Descrição:
 */

const hasSupportNotification = typeof window !== 'undefined' && ('Notification' in window);

export default class NotificationService {
  static privateNotify(message) {
    return new Notification(message);
  }

  static askPermission(messageOnAccept = 'Thank you for accepting') {
    if (hasSupportNotification) {
      Notification.requestPermission((permission) => {
        // If the user accepts, let's create a notification
        if (permission === 'granted') {
          NotificationService.privateNotify(messageOnAccept);
        }
      });
    }
  }

  static isGratedPermission() {
    return Notification.permission === 'granted';
  }

  static notify(message) {
    if (hasSupportNotification) {
      return NotificationService.isGratedPermission() ?
        NotificationService.privateNotify(message) :
        NotificationService.askPermission(message);
    }

    console.error('The user browser has no support for Notification');
    return '';
  }
}
