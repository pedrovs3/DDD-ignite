import { QuestionsRepository } from '@domain/forum/application/repositories/question.repository';
import { Question } from '@domain/forum/enterprise/entities/question';
import { PaginationParams } from '@/core/repositories';

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = [];

  async create(question: Question): Promise<void> {
    this.items.push(question);
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = this.items.find((item) => item.slug.value.includes(slug));

    if (!question) return null;

    return question;
  }

  async delete(question: Question): Promise<void> {
    this.items = this.items.filter((item) => item.id !== question.id);
  }

  async findById(id: string): Promise<Question | null> {
    const question = this.items.find((item) => item.id.toString() === id);

    if (!question) return null;

    return question;
  }

  async update(question: Question): Promise<Question> {
    const itemIndex = this.items.findIndex((item) => item.id === question.id);

    this.items[itemIndex] = question;

    return question;
  }

  async findManyRecent({ page, limit = 20 }: PaginationParams): Promise<Question[]> {
    const offset = (page - 1) * limit;
    const questions = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(offset, offset + limit);

    return questions;
  }
}
