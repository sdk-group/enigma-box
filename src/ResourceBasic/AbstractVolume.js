'use strict'


class AbstractVolume {
	constructor(parent = false) {
		this.parent = parent.parent || parent;
	}
	set description(value) {}
	get description() {
		throw new Error('Abstract Volume method "description"');
	}
	getContent() {
		throw new Error('Abstract function');
	}
	serialize() {
		throw new Error('Abstract function');
	}
	build() {
		throw new Error('Abstract function');
	}
	extend() {
		throw new Error('Abstract function');
	}
	union() {
		throw new Error('Abstract function');
	}
	intersection() {
		throw new Error('Abstract function');
	}
	negative() {
		throw new Error('Abstract function');
	}
	observe(params) {
		throw new Error('Abstract function');
	}
	reserve(params) {
		throw new Error('Abstract function');
	}
}

module.exports = AbstractVolume;