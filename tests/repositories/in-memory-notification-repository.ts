import { NotificationRepository } from '@domain/notification/application/repositories';
import { Notification } from '@domain/notification/enterprise/entities';

export class InMemoryNotificationRepository implements NotificationRepository {
  public items: Notification[] = [];

  async create(notification: Notification) {
    this.items.push(notification);
  }
}
