import {describe, expect} from "vitest";
import {Answer} from "@domain/forum/enterprise/entities/answer";
import {UniqueEntityId} from "@/core/entities";

describe("Answer Entity", () => {
  it("should be able to create a new answer", () => {
    const answer = Answer.create({
      questionId: new UniqueEntityId("questionId"),
      authorId: new UniqueEntityId("authorId"),
      content: "content",
    });

    expect(answer).toBeInstanceOf(Answer);
    expect(answer.domainEvents).toHaveLength(1);
  });

});
