module.exports = function (entity, params = {}) {
	let schedule = entity.has_schedule || {};
	let mode = params.mode || 'resource';
	if (params.resource_test && params.resource_test(entity))
		mode = 'resource';
	return schedule[mode];
}