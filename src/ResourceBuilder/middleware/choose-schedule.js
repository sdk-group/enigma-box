module.exports = function (schedules, params) {
	return _(schedules)
		.values()
		.find(s => {
			let days = s.has_day || [];
			let exclude = s.exclude_day || [];
			let day = params.day.format('dddd');
			return !!~_.indexOf(days, day);
		});
}