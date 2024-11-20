// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');
const T = {
	x: 9,
	l: {
		x: 9,
		l: { x: 2, l: null, r: null },
		r: { x: 9, l: null, r: null },
	},
	r: {
		x: 5,
		l: {
			x: 9,
			l: {
				x: 5,
				l: null,
				r: { x: 9, l: null, r: null },
			},
			r: { x: 9, l: null, r: null },
		},
		r: { x: 9, l: null, r: null },
	},
};

function solution(T) {
	// Implement your solution here
	const nodes = [];

	function getNode(x) {
		if (!x) return;
		nodes.push(x);

		if (x.l) getNode(x.l);
		if (x.r) getNode(x.r);
	}

	getNode(T);

	const arr = [];
	for (const headNode of nodes) {
		const stack = [[headNode, []]];

		while (stack.length > 0) {
			const [node, path] = stack.shift();
			const curPath = [...path, node.x];
			if (curPath.length == 3) {
				arr.push(curPath.join(""));
				continue;
			}

			if (node.l) stack.push([node.l, curPath]);
			if (node.r) stack.push([node.r, curPath]);
		}
	}

	const result = Array.from(new Set(arr));
	return result.length;
}

console.log(solution(T));
