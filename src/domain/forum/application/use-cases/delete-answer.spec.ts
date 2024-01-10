import { UniqueEntityId } from "@/core/entities";
import { DeleteAnswerUseCase } from "@domain/forum/application/use-cases/delete-answer";
import { makeAnswerAttachment } from "@tests/factories/make-answer-attachment";
import { makeAnswer } from "@tests/factories/make-answer.factory";
import { InMemoryAnswerRepository } from "@tests/repositories/in-memory-answer-repository";
import { InMemoryAnswersAttachmentsRepository } from "@tests/repositories/in-memory-answers-attachments-repository";

let inMemoryAnswersRepository: InMemoryAnswerRepository;
let inMemoryAnswerAttachmentsRepository: InMemoryAnswersAttachmentsRepository;
let sut: DeleteAnswerUseCase;

describe("Delete Answer based on ID", () => {
	beforeEach(() => {
		inMemoryAnswerAttachmentsRepository =
			new InMemoryAnswersAttachmentsRepository();
		inMemoryAnswersRepository = new InMemoryAnswerRepository(
			inMemoryAnswerAttachmentsRepository,
		);
		sut = new DeleteAnswerUseCase(inMemoryAnswersRepository);
	});

	it("should be able to delete a register based on his ID", async () => {
		const newAnswer = makeAnswer(
			{ authorId: new UniqueEntityId("author-1") },
			new UniqueEntityId("answer-1"),
		);
		await inMemoryAnswersRepository.create(newAnswer);

		inMemoryAnswerAttachmentsRepository.items.push(
			makeAnswerAttachment({
				answerId: newAnswer.id,
				attachmentId: new UniqueEntityId("attachment-1"),
			}),
			makeAnswerAttachment({
				answerId: newAnswer.id,
				attachmentId: new UniqueEntityId("attachment-2"),
			}),
		);

		const result = await sut.execute({
			answerId: "answer-1",
			authorId: "author-1",
		});

		expect(result.isRight()).toBe(true);
		expect(
			inMemoryAnswersRepository.items.find(
				(value) => value.id === new UniqueEntityId("123"),
			),
		).toBe(undefined);
		expect(inMemoryAnswersRepository.items).toHaveLength(0);
		expect(inMemoryAnswerAttachmentsRepository.items).toHaveLength(0);
	});

	it("should not be able to delete a register from another user", async () => {
		const newAnswer = makeAnswer(
			{ authorId: new UniqueEntityId("author-1") },
			new UniqueEntityId("Answer-1"),
		);
		await inMemoryAnswersRepository.create(newAnswer);

		const result = await sut.execute({
			answerId: "Answer-1",
			authorId: "author-2",
		});

		expect(result.isLeft()).toBe(true);
		expect(inMemoryAnswersRepository.items).toHaveLength(1);
	});
});
