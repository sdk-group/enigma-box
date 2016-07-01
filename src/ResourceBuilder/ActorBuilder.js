'use strict'

let BasicBuilder = require('./BasicBuilder.js');

class ActorBuilder extends BasicBuilder {
	constructor(resource_builder, builders = []) {
		super(resource_builder, builders);
	}

	// methods
	build(containers, actors, params = {}) {
		let info = {};
		let container = _(containers)
			.map((entity) => {
				info[_.snakeCase(entity.type)] = entity.id;
				let prepared = _.reduce(this.builders, (acc, builder) => {
					return builder(acc, params.container);
				}, entity);
				return prepared && this.resource_builder.build(prepared);
			})
			.compact()
			.reduce((acc, plan) => {
				acc = acc && plan.intersection(acc) || plan;
				return acc;
			}, false);

		let result = _(actors)
			.map((entity) => {
				let prepared = _.reduce(this.builders, (acc, builder) => {
					return builder(acc, params.actor);
				}, entity);
				let plan = this.resource_builder.build(prepared);

				let self_container = _.reduce(this.builders, (acc, builder) => {
					return builder(acc, params.container);
				}, entity);
				let sc_plan = self_container && this.resource_builder.build(self_container);

				plan.parametrize({
					actor: entity.id
				});
				plan = self_container ? plan.intersection(sc_plan) : plan;
				return container ? plan.intersection(container) : plan;
			})
			.value();

		console.log(require('util')
			.inspect(result, {
				depth: null
			}));
		return result;
	}


}

module.exports = ActorBuilder;