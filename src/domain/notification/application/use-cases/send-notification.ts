import { Either, right } from "@/core/either";
import { UniqueEntityId } from "@/core/entities";
import { NotificationRepository } from "@domain/notification/application/repositories";
import { Notification } from "@domain/notification/enterprise/entities";

interface SendNotificationUseCaseRequest {
	receiverId: string;
	title: string;
	message: string;
	link?: string | URL;
}

type SendNotificationUseCaseResponse = Either<
	null,
	{
		notification: Notification;
	}
>;

export class SendNotificationUseCase {
	constructor(private notificationRepository: NotificationRepository) {}

	async execute({
		receiverId,
		title,
		message,
		link,
	}: SendNotificationUseCaseRequest): Promise<SendNotificationUseCaseResponse> {
		const notification = Notification.create({
			receiverId: new UniqueEntityId(receiverId),
			title,
			message,
			link,
		});

		await this.notificationRepository.create(notification);

		return right({ notification });
	}
}
