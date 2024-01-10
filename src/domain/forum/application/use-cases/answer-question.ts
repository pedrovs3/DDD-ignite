import { Either, right } from "@/core/either";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { AnswerRepository } from "@domain/forum/application/repositories/answer.repository";
import { Answer } from "@domain/forum/enterprise/entities/answer";
import { AnswerAttachment } from "@domain/forum/enterprise/entities/answer-attachment";
import { AnswerAttachmentList } from "@domain/forum/enterprise/entities/answer-attachment-list";

interface AnswerQuestionUseCaseRequest {
	instructorId: string;
	attachmentIds?: string[];
	questionId: string;
	content: string;
}

type AnswerQuestionUseCaseResponse = Either<any, Answer>;

export class AnswerQuestionUseCase {
	constructor(private answerRepository: AnswerRepository) {}

	async execute({
		instructorId,
		questionId,
		content,
		attachmentIds,
	}: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
		const answer = Answer.create({
			content,
			authorId: new UniqueEntityId(instructorId),
			questionId: new UniqueEntityId(questionId),
		});

		if (attachmentIds) {
			answer.attachments = new AnswerAttachmentList(
				attachmentIds?.map((attachmentId) =>
					AnswerAttachment.create({
						attachmentId: new UniqueEntityId(attachmentId),
						answerId: answer.id,
					}),
				),
			);
		}

		await this.answerRepository.create(answer);

		return right(answer);
	}
}
