export type Either<L, R> = Left<L> | Right<R>;

// Error
export class Left<L> {
  readonly value: L;

  constructor(value: L) {
    this.value = value;
  }

  isRight(): this is Right<never> {
    return false;
  }

  isLeft(): this is Left<L> {
    return true;
  }
}

export const left = <L, R>(value: L): Either<L, R> => new Left(value);

// Success
export class Right<R> {
  readonly value: R;

  constructor(value: R) {
    this.value = value;
  }

  isRight(): this is Right<R> {
    return true;
  }

  isLeft(): this is Left<never> {
    return false;
  }
}

export const right = <L, R>(value: R): Either<L, R> => new Right(value);
