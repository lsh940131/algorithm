/**
 * 트리를 따라 길이가 3이 되는 조합의 개수 찾기 (중복 제외)
 */

// const T = {
// 	x: 9,
// 	l: {
// 		x: 9,
// 		l: { x: 2, l: null, r: null },
// 		r: { x: 9, l: null, r: null },
// 	},
// 	r: {
// 		x: 5,
// 		l: {
// 			x: 9,
// 			l: {
// 				x: 5,
// 				l: null,
// 				r: { x: 9, l: null, r: null },
// 			},
// 			r: { x: 9, l: null, r: null },
// 		},
// 		r: { x: 9, l: null, r: null },
// 	},
// };
const T = {
	x: 1,
	l: {
		x: 2,
		l: { x: 5, l: { x: 3, l: null, r: null }, r: null },
		r: { x: 9, l: null, r: null },
	},
	r: {
		x: 7,
		l: { x: 4, l: null, r: null },
		r: null,
	},
};

function solution(T) {
	const result = new Set(); // 중복 방지를 위한 Set 활용

	// 스택 초기화: [노드, 경로]
	const que = [{ node: T, path: [] }];

	while (que.length > 0) {
		const { node, path } = que.shift();

		// 현재 경로 업데이트
		let curPath = [...path, node.x];

		// 길이가 3인 경로를 찾으면 추가
		if (curPath.length === 3) {
			result.add(curPath.join(""));
			curPath.shift();
		}

		// 왼쪽 자식
		if (node.l) {
			que.push({ node: node.l, path: curPath });
		}

		// 오른쪽 자식
		if (node.r) {
			que.push({ node: node.r, path: curPath });
		}
	}

	console.log(Array.from(result)); // 디버그 출력
	return result.size; // 중복 제거된 경로의 수
}

console.log(solution(T));
