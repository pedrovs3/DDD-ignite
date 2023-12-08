import { faker } from '@faker-js/faker';
import { Notification, NotificationProps } from '@domain/notification/enterprise/entities';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

export const makeNotification = (
  override: Partial<NotificationProps> = {},
  id?: UniqueEntityId,
) => Notification.create({
  receiverId: new UniqueEntityId(),
  title: faker.lorem.sentence(),
  message: faker.lorem.paragraph(),
  ...override,
}, id);
