import { Comment, CommentProps } from '@domain/forum/enterprise/entities/comment';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

export interface QuestionCommentProps extends CommentProps {
  questionId: UniqueEntityId;
}

export class QuestionComment extends Comment<QuestionCommentProps> {
  get questionId(): UniqueEntityId {
    return this.props.questionId;
  }

  static create(props: Optional<QuestionCommentProps, 'createdAt'>, id?: UniqueEntityId): QuestionComment {
    return new QuestionComment({
      ...props,
      createdAt: props.createdAt ?? new Date(),
    }, id);
  }
}
