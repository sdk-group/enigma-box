'use strict'

class ActorBuilder {
	constructor(builders) {
		// preserves order
		this.builders = _(builders)
			.castArray()
			.filter(_.isFunction)
			.value();
	}

	// methods
	build(actors) {
		let result = _.reduce(this.builders, (acc, builder) => {
			return builder({
				initial: actors,
				result: acc
			});
		}, false);
		if (!result)
			throw new Error("Failed to build an actor");
	}

}

module.exports = ActorBuilder;