'use strict'

let middleware = require('./middleware');

class BasicBuilder {
	constructor(resource_builder, builders = []) {
		if (!resource_builder)
			throw new Error('resource builder required');

		// preserves order
		// builders describe schedule extraction and choice of a particular schedule
		this.builders = _(builders)
			.castArray()
			.map(middleware)
			.value();
		this.resource_builder = resource_builder;
	}
}

module.exports = BasicBuilder;