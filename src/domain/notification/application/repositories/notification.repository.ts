import { Notification } from '@domain/notification/enterprise/entities';

export interface NotificationRepository {
  create: (notification: Notification) => Promise<void>;
  findById: (id: string) => Promise<Notification | null>;
  update: (notification: Notification) => Promise<void>;
}
