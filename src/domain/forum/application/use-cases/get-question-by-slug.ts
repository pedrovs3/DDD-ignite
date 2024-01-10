import { Either, left, right } from "@/core/either";
import { QuestionsRepository } from "@domain/forum/application/repositories/question.repository";
import { ResourceNotFoundError } from "@domain/forum/application/use-cases/errors/resource-not-found.error";
import { Question } from "@domain/forum/enterprise/entities/question";
import { Slug } from "@domain/forum/enterprise/entities/value-objects/slug";

interface GetQuestionBySlugUseCaseRequest {
	slug: Slug | string;
}

type GetQuestionBySlugUseCaseResponse = Either<
	ResourceNotFoundError,
	{
		question: Question;
	}
>;

export class GetQuestionBySlugUseCase {
	constructor(private questionsRepository: QuestionsRepository) {}

	async execute({
		slug,
	}: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
		const question = await this.questionsRepository.findBySlug(slug.toString());

		if (!question)
			return left(new ResourceNotFoundError({ fieldName: "question" }));

		return right({
			question,
		});
	}
}
