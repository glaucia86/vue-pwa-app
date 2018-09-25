/**
 * arquivo: push-notification.js
 * Data: 25/09/2018
 * Descrição:
 */

const hasSupportNotification = typeof window !== 'undefined' && ('Notification' in window);

export default class NotificationService {
  static privateNotify(title, body, icon, otherOptions = {}) {
    const options = {
      body,
      icon,
      ...otherOptions,
    };

    return new Notification(title, options);
  }

  static askPermission(messageOnAccept = 'Thank you for accepting') {
    if (hasSupportNotification) {
      Notification.requestPermission((permission) => {
        // If the user accepts, let's create a notification
        if (permission === 'granted') {
          NotificationService.privateNotify('Permission Ok', messageOnAccept);
        }
      });
    }
  }

  static isGratedPermission() {
    return Notification.permission === 'granted';
  }

  static notify(title, body) {
    if (hasSupportNotification) {
      return NotificationService.isGratedPermission() ?
        NotificationService.privateNotify(title, body) :
        NotificationService.askPermission(title, body);
    }

    console.error('The user browser has no support for Notification');
    return '';
  }
}
