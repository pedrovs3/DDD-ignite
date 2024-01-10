import { UniqueEntityId } from "@/core/entities";
import { Unauthorized } from "@/core/errors/errors/unauthorized";
import { ReadNotificationUseCase } from "@domain/notification/application/use-cases/read-notification";
import { makeNotification } from "@tests/factories/make-notification.factory";
import { InMemoryNotificationRepository } from "@tests/repositories/in-memory-notification-repository";
import { beforeEach, describe, it } from "vitest";

let inMemoryNotificationRepository: InMemoryNotificationRepository;
let sut: ReadNotificationUseCase;

describe("Read Notification", () => {
	beforeEach(() => {
		inMemoryNotificationRepository = new InMemoryNotificationRepository();
		sut = new ReadNotificationUseCase(inMemoryNotificationRepository);
	});
	it("should be able to Read a notification", async () => {
		const notification = makeNotification({
			receiverId: new UniqueEntityId("receiver-1"),
		});

		await inMemoryNotificationRepository.create(notification);

		const result = await sut.execute({
			receiverId: notification.receiverId.toString(),
			notificationId: notification.id.toString(),
		});

		expect(result.isRight()).toBeTruthy();
		expect(result.value).toHaveProperty("notification");
		if (result.isRight()) {
			expect(inMemoryNotificationRepository.items[0].readAt).toBeInstanceOf(
				Date,
			);
		}
	});

	it("should not be able to read notification from another user", async () => {
		const notification = makeNotification({
			receiverId: new UniqueEntityId("receiver-1"),
		});

		await inMemoryNotificationRepository.create(notification);

		const result = await sut.execute({
			receiverId: "receiver-2",
			notificationId: notification.id.toString(),
		});

		expect(result.isLeft()).toBeTruthy();
		expect(result.value).toBeInstanceOf(Unauthorized);
	});
});
