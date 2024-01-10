import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError, Unauthorized } from "@/core/errors";
import { QuestionsCommentsRepository } from "@domain/forum/application/repositories";

interface DeleteCommentForQuestionUseCaseRequest {
	questionId: string;
	commentId: string;
	authorId: string;
}

type DeleteCommentForQuestionUseCaseResponse = Either<
	ResourceNotFoundError | Unauthorized,
	object
>;

export class DeleteCommentForQuestionUseCase {
	constructor(
		private questionCommentsRepository: QuestionsCommentsRepository,
	) {}

	async execute({
		questionId,
		commentId,
		authorId,
	}: DeleteCommentForQuestionUseCaseRequest): Promise<DeleteCommentForQuestionUseCaseResponse> {
		const comment = await this.questionCommentsRepository.findById(commentId);
		if (!comment)
			return left(new ResourceNotFoundError({ fieldName: "comment" }));
		if (comment.authorId.toString() !== authorId)
			return left(new Unauthorized());

		if (comment.questionId.toString() !== questionId)
			return left(new ResourceNotFoundError({ fieldName: "question" }));
		await this.questionCommentsRepository.delete(comment);

		return right({});
	}
}
