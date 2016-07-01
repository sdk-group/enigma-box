'use strcit'

class Storage {
	constructor(solvers) {
		this.ready = false;
		this.storage = [];
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

	store(fragment) {
		if (!this.check(fragment)) return false;

		let id = fragment.id;

		if (this.stored[id]) throw new Error('Already stored');
		this.stored[id] = fragment;
	}
}

module.exports = Storage;