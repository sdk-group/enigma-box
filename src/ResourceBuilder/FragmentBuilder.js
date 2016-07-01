'use strict'

let TimeChunk = require('../ResourceExtension/Primitive/TimeChunk.js');

class FragmentBuilder {
	constructor() {

	}

	static build(ticket) {
		let tc = new TimeChunk([ticket.has_time_description], 'r');
	}
}