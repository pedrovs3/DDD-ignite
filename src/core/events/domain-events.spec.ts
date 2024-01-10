import { UniqueEntityId } from "@/core/entities";
import { AggregateRoot } from "@/core/entities/aggregate-root";
import { DomainEvent } from "@/core/events/domain-event";
import { DomainEvents } from "@/core/events/domain-events";
import { describe, expect, vi } from "vitest";

class CustomAggregateCreated implements DomainEvent {
	public ocurredAt: Date;
	private aggregate: CustomAggregate;

	constructor(aggregate: CustomAggregate) {
		this.aggregate = aggregate;
		this.ocurredAt = new Date();
	}

	public getAggregateId(): UniqueEntityId {
		return this.aggregate.id;
	}
}

class CustomAggregate extends AggregateRoot<null> {
	static create(): CustomAggregate {
		const aggregate = new CustomAggregate(null);

		aggregate.addDomainEvent(new CustomAggregateCreated(aggregate));
		return aggregate;
	}
}

describe("Domain Events", () => {
	it("should be able to dispatch events", () => {
		const callbackSpy = vi.fn();

		// Listen to events
		DomainEvents.register(callbackSpy, CustomAggregateCreated.name);

		const aggregate = CustomAggregate.create();

		expect(aggregate.domainEvents).toHaveLength(1);

		// Save in DB and Dispatch events
		DomainEvents.dispatchEventsForAggregate(aggregate.id);

		expect(callbackSpy).toHaveBeenCalledTimes(1);
		expect(aggregate.domainEvents).toHaveLength(0);
	});
});
