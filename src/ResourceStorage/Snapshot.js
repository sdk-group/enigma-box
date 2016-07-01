'use strict'

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

module.exports = Snapshot;