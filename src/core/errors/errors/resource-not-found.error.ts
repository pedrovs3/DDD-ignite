import { UseCaseError } from "@/core/errors/use-case-error";
import { Optional } from "@/core/types/optional";

export class ResourceNotFoundError extends Error implements UseCaseError {
	constructor(props?: Optional<UseCaseError, "message">) {
		super(props?.message ?? `Resource ${props?.fieldName} not found.`);
		this.name = "ResourceNotFoundError";
	}
}
