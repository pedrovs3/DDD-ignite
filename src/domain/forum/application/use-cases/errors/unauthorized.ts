import { UseCaseError } from '@/core/errors/use-case-error';
import { Optional } from '@/core/types/optional';

export class Unauthorized extends Error implements UseCaseError {
  constructor(props?: Optional<UseCaseError, 'message'>) {
    super(props?.message ?? 'Unauthorized.');
    this.name = 'UnauthorizedError';
  }
}
