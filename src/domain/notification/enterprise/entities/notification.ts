import { Entity, UniqueEntityId } from '@/core/entities';
import { Optional } from '@/core/types/optional';

export interface NotificationProps {
  receiverId: UniqueEntityId;
  title: string;
  message: string;
  link?: string | URL;
  readAt?: Date;
  createdAt: Date;
}

export class Notification extends Entity<NotificationProps> {
  get title(): string {
    return this.props.title;
  }

  get message(): string {
    return this.props.message;
  }

  get readAt(): Date | undefined {
    return this.props.readAt;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get receiverId(): UniqueEntityId {
    return this.props.receiverId;
  }

  static create(props: Optional<NotificationProps, 'createdAt' | 'link'>, id?: UniqueEntityId): Notification {
    return new Notification({
      ...props,
      createdAt: props.createdAt ?? new Date(),
    }, id);
  }

  read() {
    this.props.readAt = new Date();
  }
}
