import { Right } from "@/core/either";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { ChooseBestAnswerUseCase } from "@domain/forum/application/use-cases/choose-best-answer-question";
import { Answer, Question } from "@domain/forum/enterprise/entities";
import { makeAnswer } from "@tests/factories/make-answer.factory";
import { InMemoryAnswerRepository } from "@tests/repositories/in-memory-answer-repository";
import { InMemoryAnswersAttachmentsRepository } from "@tests/repositories/in-memory-answers-attachments-repository";
import { InMemoryQuestionsAttachmentsRepository } from "@tests/repositories/in-memory-questions-attachments-repository";
import { makeQuestion } from "tests/factories/make-question.factory";
import { InMemoryQuestionsRepository } from "tests/repositories/in-memory-questions-repository";
import { expect } from "vitest";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionsAttachmentsRepository: InMemoryQuestionsAttachmentsRepository;
let inMemoryAnswerRepository: InMemoryAnswerRepository;
let inMemoryAnswersAttachmentsRepository: InMemoryAnswersAttachmentsRepository;
let sut: ChooseBestAnswerUseCase;

describe("Choose best answer for a question", () => {
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
		sut = new ChooseBestAnswerUseCase(
			inMemoryQuestionsRepository,
			inMemoryAnswerRepository,
		);
	});

	it("should be able to choose the best answer for a question", async () => {
		const question = makeQuestion({ authorId: new UniqueEntityId("author-1") });
		const answer = makeAnswer(
			{ questionId: question.id },
			new UniqueEntityId("answer-1"),
		);

		await inMemoryQuestionsRepository.create(question);
		await inMemoryAnswerRepository.create(answer);

		const result = await sut.execute({
			answerId: answer.id.toString(),
			authorId: question.authorId.toString(),
		});

		expect(result.isRight()).toBe(true);
		expect(result.isLeft()).toBe(false);
		expect(result).toBeInstanceOf(
			Right<{ question: Question; answer: Answer }>,
		);
		// @ts-ignore
		expect(result.value.question.bestAnswerId).toEqual(answer.id);
		expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toEqual(
			answer.id,
		);
	});

	it("should not be able to choose another user question best answer", async () => {
		const question = makeQuestion();
		const answer = makeAnswer(
			{ questionId: question.id },
			new UniqueEntityId("answer-1"),
		);

		const result = await sut.execute({
			answerId: answer.id.toString(),
			authorId: "another-user-id",
		});

		expect(result.isRight()).toBe(false);
		expect(result.isLeft()).toBe(true);
	});
});
