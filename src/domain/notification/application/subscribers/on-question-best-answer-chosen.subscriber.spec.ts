import {SendNotificationUseCase} from "@domain/notification/application/use-cases/send-notification";
import {makeAnswer} from "@tests/factories/make-answer.factory";
import {makeQuestion} from "@tests/factories/make-question.factory";
import {InMemoryAnswerRepository} from "@tests/repositories/in-memory-answer-repository";
import {InMemoryAnswersAttachmentsRepository} from "@tests/repositories/in-memory-answers-attachments-repository";
import {InMemoryNotificationRepository} from "@tests/repositories/in-memory-notification-repository";
import {InMemoryQuestionsAttachmentsRepository} from "@tests/repositories/in-memory-questions-attachments-repository";
import {InMemoryQuestionsRepository} from "@tests/repositories/in-memory-questions-repository";
import {waitFor} from "@tests/utils/wait-for";
import {beforeEach, describe, expect, MockInstance} from "vitest";
import {
	OnQuestionBestAnswerChosenSubscriber
} from "@domain/notification/application/subscribers/on-question-best-answer-chosen.subscriber";

let inMemoryAnswerRepository: InMemoryAnswerRepository;
let inMemoryAnswersAttachmentsRepository: InMemoryAnswersAttachmentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionsAttachmentsRepository: InMemoryQuestionsAttachmentsRepository;
let inMemoryNotificationRepository: InMemoryNotificationRepository;
let sendNotificationUseCase: SendNotificationUseCase;

let sendNotificationExecuteSpy: Required<SendNotificationUseCase>["execute"] extends
	| {
			new (...args: infer A): infer R;
	  }
	| ((...args: infer A) => infer R)
	? MockInstance<A, R>
	: never;

describe("On Answer choosed as the best", () => {
	beforeEach(() => {
		inMemoryAnswersAttachmentsRepository =
			new InMemoryAnswersAttachmentsRepository();
		inMemoryQuestionsAttachmentsRepository =
			new InMemoryQuestionsAttachmentsRepository();
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
			inMemoryQuestionsAttachmentsRepository,
		);
		inMemoryAnswerRepository = new InMemoryAnswerRepository(
			inMemoryAnswersAttachmentsRepository,
		);
		inMemoryNotificationRepository = new InMemoryNotificationRepository();
		sendNotificationUseCase = new SendNotificationUseCase(
			inMemoryNotificationRepository,
		);

		sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, "execute");

		new OnQuestionBestAnswerChosenSubscriber(
			inMemoryAnswerRepository,
			sendNotificationUseCase,
		);
	});

	it("should be able to send notification when an answer is selected as the best", async () => {
		const question = makeQuestion();
		const answer = makeAnswer({
			questionId: question.id,
		});

		await inMemoryQuestionsRepository.create(question);
		await inMemoryAnswerRepository.create(answer);

		question.bestAnswerId = answer.id;
		await inMemoryQuestionsRepository.update(question);
		
		await waitFor(() => {
			expect(sendNotificationExecuteSpy).toHaveBeenCalled();
		});
	});
});
