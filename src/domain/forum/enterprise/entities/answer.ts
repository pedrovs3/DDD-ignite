import { Entity } from '@/core/entities/entity';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

export interface AnswerProps {
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

  set content(content: string) {
    this.props.content = content;
    this.touch();
  }

  get excerpt(): string {
    return this.props.content.substring(0, 120).trim().concat('...');
  }

  get questionId(): UniqueEntityId {
    return this.props.questionId;
  }

  get authorId(): UniqueEntityId {
    return this.props.authorId;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  static create(props: Optional<AnswerProps, 'createdAt'>, id?: UniqueEntityId): Answer {
    const answer = new Answer({
      ...props,
      createdAt: props.createdAt ?? new Date(),
    }, id);

    return answer;
  }

  private touch(): void {
    this.props.updatedAt = new Date();
  }
}
