import {describe, expect, test} from "vitest";
import {Either, left, right} from "@/core/either";

function doSomething(shouldSuccess: boolean): Either<string, string> {
  if (shouldSuccess) {
    return right("success");
  } else {
    return left("error");
  }
}

describe("Either", () => {
  test("should be able to create a success result", () => {
    const result = doSomething(true);
    expect(result.isRight()).toBe(true);
    expect(result.isLeft()).toBe(false);
  })

  test("should be able to create a error result", () => {
    const result = doSomething(false);
    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
  })
})
