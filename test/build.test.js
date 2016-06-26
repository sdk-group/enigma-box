'use strict'

let ActorBuilder = require('../src/ResourceBuilder/ActorBuilder.js');

describe('build', () => {
	let data;
	let human, ws, office, dept, act;
	let builder = new ActorBuilder();

	before((done) => {
		Couchbird.getMulti(['pc-1', 'human-1', 'global_org_structure'])
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
				console.log(data);
				[human, ws, office, dept] = act = [data['human-1'], data['pc-1'], data['office-1'], data['department-1']];
				done();
			})
	});


	it('build from actors', (done) => {
		builder.build(act);
	})

})