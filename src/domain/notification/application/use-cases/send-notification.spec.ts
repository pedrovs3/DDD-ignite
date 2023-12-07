import {beforeEach, describe} from "vitest";
import {InMemoryNotificationRepository} from "@tests/repositories/in-memory-notification-repository";
import {SendNotificationUseCase} from "@domain/notification/application/use-cases/send-nofitication";

let inMemoryNotificationRepository: InMemoryNotificationRepository;
let sut: SendNotificationUseCase;

describe("Send Notification", () => {
	beforeEach(() => {
		inMemoryNotificationRepository = new InMemoryNotificationRepository();
		sut = new SendNotificationUseCase(inMemoryNotificationRepository);
	})
	it("should be able to send a notification", async () => {
		const result = await sut.execute({
			receiverId: "123",
			title: "Nova notificação",
			message: "Uma mensagem qualquer",
		});

		expect(result.isRight()).toBeTruthy();
		expect(result.value).toHaveProperty("notification");
		if (result.isRight()) {
			expect(inMemoryNotificationRepository.items[0].id).toEqual(result.value.notification.id);
		}
	})
})