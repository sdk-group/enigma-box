'use strict'

let fragment = {
	id: 'String',
	content: {
		main: 'value'
		param1: 'value',
		param999: 'value'
	},
	priority: 0 //@NOTE: i think it's important param
};

let solver = {
	default: function (fragment, destination) {
		return Boolean;
	},
	main: function (fragment, destination) {
		return Boolean;
	}
}

class SoAbstractStorage {
	constructor(solvers) {
		this.ready = false;
		//@NOTE: may be it should be object with access rotation, ex. first store starts from first element, n-th from n-th % count
		this.storage = [];
		//@NOTE: may be we should also split it by priority?
		this.stored = {};
		this.solvers = solvers;
	}
	fill(fragment) {
		//@NOTE: push to stored without any regrets and remorse
	}
	update(fragment_id, diff) {
		//DO STUFF
		this.recalc = true;
	}
	eject(fragment_id) {
		//DO STUFF
		this.recalc = true;
	}
	snapshot() {
		//@NOTE: returns fully assembled storage
		return {
			thisObject: 'soCool',
			disable: function (fragment) {
				//@NOTE: when fragment unwanted for some reason, ex. quota has been exceeded
				//@NOTE: or should we implement quotas in another way, like some "watermark"
			}
		}
	}
	expand(fragment) {

	}
	reduce(path) {
		return _.unset(this.storage, path);
	}
	check(fragment) {
		let snap = this.snapshot();

		return snapshot.check(fragment)
	}
	sotre(fragment) {
		if (!this.check(fragment)) return false;

		let id = fragment.id;

		if (this.stored[id]) throw new Error('Already stored');
		this.stored[id] = fragment;
	}
}

class Plan {
	constructor() {

	}
	query() {

	}
	put(chunk) {

	}
}

class Snapshot {
	constructor(parent) {
		this.conflicts = [];
		this.fragments = [];
		this.content = [
			{
				id: String,
				service1: Plan([chunks]),
				quota: Number
			}
    ];
	}
	isConflict() {
		return !this.conflicts.length
	}
	tryToPut(fragment) {
		return {
			conflicts: [linkToFragment],
			success: Boolean
		}
	}
	countToPut(fragment_image) {
		//loop of this.tryToPut(fragment_image)
		return this.availableToPut(fragment_image)
			.length
	}
	availableToPut(fragment_image) {
		return [fragment_places];
	}
}