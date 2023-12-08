import {beforeEach, describe} from "vitest";
import {OnAnswerCreatedSubscriber} from "@domain/notification/application/subscribers/on-answer-created.subscriber";
import {makeAnswer} from "@tests/factories/make-answer.factory";
import {InMemoryAnswerRepository} from "@tests/repositories/in-memory-answer-repository";
import {InMemoryAnswersAttachmentsRepository} from "@tests/repositories/in-memory-answers-attachments-repository";

let inMemoryAnswerRepository: InMemoryAnswerRepository;
let inMemoryAnswersAttachmentsRepository: InMemoryAnswersAttachmentsRepository;


describe("On Answer Created", () => {
  beforeEach(() => {
    inMemoryAnswersAttachmentsRepository = new InMemoryAnswersAttachmentsRepository();
    inMemoryAnswerRepository = new InMemoryAnswerRepository(inMemoryAnswersAttachmentsRepository);
  })
  it("should be able to send notification when an answer is created", async () => {
    new OnAnswerCreatedSubscriber();

    const answer = makeAnswer()
    await inMemoryAnswerRepository.create(answer);
  });
});
