import dayjs from 'dayjs';
import { QuestionAttachmentList } from '@domain/forum/enterprise/entities/question-attachment-list';
import { Slug } from './value-objects/slug';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';
import { AggregateRoot } from '@/core/entities/aggregate-root';

export interface QuestionProps {
  authorId: UniqueEntityId;
  bestAnswerId?: UniqueEntityId;
  attachments?: QuestionAttachmentList;
  title: string;
  content: string;
  slug: Slug;
  createdAt: Date;
  updatedAt?: Date;
}

export class Question extends AggregateRoot<QuestionProps> {
  get content(): string {
    return this.props.content;
  }

  set content(content: string) {
    this.props.content = content;
    this.touch();
  }

  get isNew(): boolean {
    return dayjs().diff(this.createdAt, 'day') <= 3;
  }

  get title(): string {
    return this.props.title;
  }

  set title(title: string) {
    this.props.title = title;
    this.props.slug = Slug.createFromText(title);

    this.touch();
  }

  get slug(): Slug {
    return this.props.slug;
  }

  get bestAnswerId(): UniqueEntityId | undefined {
    return this.props.bestAnswerId;
  }

  set bestAnswerId(id: UniqueEntityId) {
    this.props.bestAnswerId = id;

    this.touch();
  }

  get attachments(): QuestionAttachmentList | undefined {
    return this.props.attachments;
  }

  set attachments(attachments: QuestionAttachmentList) {
    this.props.attachments = attachments;
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

  get excerpt(): string {
    return this.props.content.substring(0, 120).trim().concat('...');
  }

  static create(props: Optional<QuestionProps, 'createdAt' | 'slug' | 'attachments'>, id?: UniqueEntityId): Question {
    return new Question({
      ...props,
      slug: props.slug ?? Slug.createFromText(props.title),
      createdAt: props.createdAt ?? new Date(),
    }, id);
  }

  private touch(): void {
    this.props.updatedAt = new Date();
  }
}
