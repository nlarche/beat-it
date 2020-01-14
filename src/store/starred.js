import { writable, derived } from 'svelte/store';

function createStarred() {
    const init = JSON.parse(localStorage.getItem('starred')) || [];
	const { subscribe, set, update } = writable(init);

	return {
		subscribe,
		add: (item) => update(n  => ([ ...n, item])),
		remove: (item) => update(n => n.filter(n => n !== item)),
		reset: () => set([])
	};
}
export const starred = createStarred();

starred.subscribe((value) => {
    localStorage.setItem("starred", JSON.stringify(value));
})


