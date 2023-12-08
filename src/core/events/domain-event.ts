import { UniqueEntityId } from '@/core/entities';

export interface DomainEvent {
  ocurredAt: Date

  getAggregateId(): UniqueEntityId
}
