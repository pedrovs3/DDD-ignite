import { Slug } from '@domain/forum/enterprise/entities/value-objects/slug';
import { Question } from '@/domain/forum/enterprise/entities/question';

export interface QuestionsRepository {
  create: (question: Question) => Promise<void>;
  findBySlug: (slug: Slug | string) => Promise<Question | null>;
}
