'use strict'

let Plan = require("./Plan.js");

//builds single timeline objects
class TimelineBuilder {
	constructor(qualifier_fields = ['id']) {
		this.qualifier_fields = _.castArray(qualifier_fields);
	}

	build(entity) {
		if (!entity.has_time_description)
			throw new Error('No resource field');
		let plan = new Plan();
		plan.build(_.castArray(entity.has_time_description));
		plan.parametrize(_.pick(entity, this.qualifier_fields));
		return plan;
	}
}