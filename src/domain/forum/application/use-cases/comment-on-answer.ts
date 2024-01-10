import { Either, left, right } from "@/core/either";
import { UniqueEntityId } from "@/core/entities";
import {
	AnswerCommentsRepository,
	AnswerRepository,
} from "@domain/forum/application/repositories";
import { ResourceNotFoundError } from "@domain/forum/application/use-cases/errors/resource-not-found.error";
import { AnswerComment } from "@domain/forum/enterprise/entities";

interface CommentOnAnswerUseCaseRequest {
	authorId: string;
	answerId: string;
	content: string;
}

type CommentOnAnswerUseCaseResponse = Either<
	ResourceNotFoundError,
	{ answerComment: AnswerComment }
>;

export class CommentOnAnswerUseCase {
	constructor(
		private answerRepository: AnswerRepository,
		private answerCommentRepository: AnswerCommentsRepository,
	) {}

	async execute({
		answerId,
		content,
		authorId,
	}: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
		const answer = await this.answerRepository.findById(answerId);

		if (!answer)
			return left(new ResourceNotFoundError({ fieldName: "answer" }));

		const answerComment = AnswerComment.create({
			authorId: new UniqueEntityId(authorId),
			answerId: new UniqueEntityId(answerId),
			content,
		});

		await this.answerCommentRepository.create(answerComment);
		return right({
			answerComment,
		});
	}
}
