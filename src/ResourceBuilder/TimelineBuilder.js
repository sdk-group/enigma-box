'use strict'

let Plan = require("../ResourceExtension/Plan.js");

//builds single timeline objects
class TimelineBuilder {
	constructor() {}

	static build(entity) {
		if (!entity.has_time_description)
			throw new Error('No resource field');
		let plan = new Plan();
		plan.build(_.castArray(entity.has_time_description));
		return plan;
	}

	static parametrize(timeline, params) {
		timeline.parametrize(params);
	}
}

module.exports = TimelineBuilder;