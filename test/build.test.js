'use strict'

let ActorBuilder = require('../src/ResourceBuilder/ActorBuilder.js');
let TimelineBuilder = require('../src/ResourceBuilder/TimelineBuilder.js')

describe('build', () => {
	let data;
	let human, ws, office, dept, act;
	let builder = new ActorBuilder(TimelineBuilder, ['extract-schedule', 'choose-schedule']);

	before((done) => {

		Couchbird.getMulti(['pc-1', 'pc-2', 'pc-3', 'pc-4', 'pc-5', 'human-1', 'human-2', 'human-3', 'human-4', 'global_org_structure'])
			.then(res => {
				data = _(res)
					.map('value')
					.concat(res.global_org_structure.value.content)
					.map(t => {
						t.id = t['@id'];
						t.type = t['@type'];
						return t;
					})
					.keyBy('id')
					.value();
				let schedules = _(data)
					.flatMap(d => _.values(d.has_schedule))
					.flattenDeep()
					.compact()
					.uniq()
					.value();
				return Couchbird.getMulti(schedules);
			})
			.then(res => {
				let sch = _(res)
					.map('value')
					.map(t => {
						t.id = t['@id'];
						t.type = t['@type'];
						return t;
					})
					.keyBy('id')
					.value();
				data = _.mapValues(data, (entry) => {
					entry.has_schedule = entry.has_schedule && _.mapValues(entry.has_schedule, v => _.pick(sch, v))
					return entry;
				});
				[ws, office, dept] = act = [data['pc-1'], _.merge(data['office-1'], data['department-1'])];
				done();
			})
	});


	//set of merged orgs -> find theirs humans and ws -> define resource entity -> form timelines
	it('build all from actors', () => {
		builder.build(act, _.pickBy(data, (v, k) => _.startsWith(k, 'human')), {
			container: {
				mode: 'live',
				day: moment.tz(data['office-1'].org_timezone)
			},
			actor: {
				mode: 'resource',
				day: moment.tz(data['office-1'].org_timezone)
			}
		});
	})


})