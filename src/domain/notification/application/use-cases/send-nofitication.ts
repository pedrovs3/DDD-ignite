import { Notification } from '@domain/notification/enterprise/entities';
import { NotificationRepository } from '@domain/notification/application/repositories';
import { Either, right } from '@/core/either';
import { UniqueEntityId } from '@/core/entities';

interface SendNotificationUseCaseRequest {
  receiverId: string;
  title: string;
  message: string;
}

type SendNotificationUseCaseResponse = Either<null, {
  notification: Notification;
}>;

export class SendNotificationUseCase {
  constructor(private notificationRepository: NotificationRepository) {
  }

  async execute({
    receiverId,
    title,
    message,
  }: SendNotificationUseCaseRequest): Promise<SendNotificationUseCaseResponse> {
    const notification = Notification.create({
      receiverId: new UniqueEntityId(receiverId),
      title,
      message,
    });

    await this.notificationRepository.create(notification);

    return right({ notification });
  }
}
