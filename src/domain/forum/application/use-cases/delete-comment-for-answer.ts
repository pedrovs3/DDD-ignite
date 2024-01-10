import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError, Unauthorized } from "@/core/errors/";
import { AnswerCommentsRepository } from "@domain/forum/application/repositories";

interface DeleteCommentForAnswerUseCaseRequest {
	answerId: string;
	commentId: string;
	authorId: string;
}

type DeleteCommentForAnswerUseCaseResponse = Either<
	ResourceNotFoundError | Unauthorized,
	object
>;

export class DeleteCommentForAnswerUseCase {
	constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

	async execute({
		answerId,
		commentId,
		authorId,
	}: DeleteCommentForAnswerUseCaseRequest): Promise<DeleteCommentForAnswerUseCaseResponse> {
		const comment = await this.answerCommentsRepository.findById(commentId);
		if (!comment) return left(new ResourceNotFoundError());
		if (comment.authorId.toString() !== authorId)
			return left(new Unauthorized());

		if (comment.answerId.toString() !== answerId)
			return left(new ResourceNotFoundError());
		await this.answerCommentsRepository.delete(comment);

		return right({});
	}
}
