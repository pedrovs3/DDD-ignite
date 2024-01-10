import { Slug } from "./slug";

test("should create a new Slug text", () => {
	const slug = Slug.createFromText("An example title");

	expect(slug.value).toEqual("an-example-title");
});
