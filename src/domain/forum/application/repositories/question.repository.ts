import { PaginationParams } from "@/core/repositories";
import { Question } from "@/domain/forum/enterprise/entities/question";

export interface QuestionsRepository {
	create: (question: Question) => Promise<void>;
	findBySlug: (slug: string) => Promise<Question | null>;
	findById: (id: string) => Promise<Question | null>;
	findManyRecent: (params: PaginationParams) => Promise<Question[]>;
	delete: (question: Question) => Promise<void>;
	update: (question: Question) => Promise<Question>;
}
