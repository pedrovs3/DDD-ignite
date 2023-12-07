import { Notification } from '@domain/notification/enterprise/entities';

export interface NotificationRepository {
  create: (notification: Notification) => Promise<void>;
}
