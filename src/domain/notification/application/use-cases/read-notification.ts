import { NotificationRepository } from '@domain/notification/application/repositories';
import { Notification } from '@domain/notification/enterprise/entities';
import { Either, left, right } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found.error';
import { Unauthorized } from '@/core/errors/errors/unauthorized';

interface ReadNotificationUseCaseRequest {
  receiverId: string;
  notificationId: string;
}

type ReadNotificationUseCaseResponse = Either<ResourceNotFoundError | Unauthorized, {
  notification: Notification;
}>;

export class ReadNotificationUseCase {
  constructor(private notificationRepository: NotificationRepository) {
  }

  async execute({
    receiverId,
    notificationId,
  }: ReadNotificationUseCaseRequest): Promise<ReadNotificationUseCaseResponse> {
    const notification = await this.notificationRepository.findById(notificationId);

    if (!notification) return left(new ResourceNotFoundError({ fieldName: 'notification' }));

    if (notification.receiverId.toString() !== receiverId) return left(new Unauthorized());

    notification.read();
    await this.notificationRepository.update(notification);

    return right({
      notification,
    });
  }
}
