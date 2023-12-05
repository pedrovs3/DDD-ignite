import { Comment, CommentProps } from '@domain/forum/enterprise/entities/comment';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

export interface AnswerCommentProps extends CommentProps {
  answerId: UniqueEntityId;
}

export class AnswerComment extends Comment<AnswerCommentProps> {
  get answerId(): UniqueEntityId {
    return this.props.answerId;
  }

  static create(props: Optional<AnswerCommentProps, 'createdAt'>, id?: UniqueEntityId): AnswerComment {
    return new AnswerComment({
      ...props,
      createdAt: props.createdAt ?? new Date(),
    }, id);
  }
}
