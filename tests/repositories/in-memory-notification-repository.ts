import { NotificationRepository } from '@domain/notification/application/repositories';
import { Notification } from '@domain/notification/enterprise/entities';

export class InMemoryNotificationRepository implements NotificationRepository {
  public items: Notification[] = [];

  async create(notification: Notification) {
    this.items.push(notification);
  }

  async findById(id: string): Promise<Notification | null> {
    const notification = this.items.find((item) => item.id.toString() === id);
    return notification ?? null;
  }

  async update(notification: Notification): Promise<void> {
    const index = this.items.findIndex((item) => item.id.toString() === notification.id.toString());
    this.items[index] = notification;
  }
}
