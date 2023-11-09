import { Slug } from './value-objects/slug';
import { Entity } from '../core/entities/entity';
import { UniqueEntityId } from './value-objects/unique-entity-id';
import { Optional } from '../core/types/optional';

interface QuestionProps {
  authorId: UniqueEntityId;
  bestAnswerId?: UniqueEntityId
  title: string;
  content: string;
  slug: Slug;
  createdAt: Date;
  updatedAt?: Date;
}

export class Question extends Entity<QuestionProps> {
  static create(props: Optional<QuestionProps, 'createdAt'>, id?: UniqueEntityId): Question {
    const question = new Question({
      ...props,
      createdAt: new Date(),
    }, id);

    return question;
  }
}
