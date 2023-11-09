import { Entity } from '../core/entities/entity';
import { UniqueEntityId } from './value-objects/unique-entity-id';
import { Optional } from '../core/types/optional';

interface AnswerProps {
  questionId: UniqueEntityId;
  authorId: UniqueEntityId;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class Answer extends Entity<AnswerProps> {
  get content(): string {
    return this.props.content;
  }

  static create(props: Optional<AnswerProps, 'createdAt'>, id?: UniqueEntityId): Answer {
    const answer = new Answer({
      ...props,
      createdAt: new Date(),
    }, id);

    return answer;
  }
}
