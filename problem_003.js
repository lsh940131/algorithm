// const input = [10, 1, 3, 1, 2, 2, 1, 0, 4];
const input = [1, 5, 2, 4, 3, 3];
// const input = [9, 9, 9, 9, 9];

function solution(A) {
	const sumMap = {};

	for (let i = 0, length = A.length - 1; i < length; i++) {
		const sum = A[i] + A[i + 1];
		if (!sumMap[sum]) {
			sumMap[sum] = [];
		}
		sumMap[sum].push(i);
	}

	let result = 0;
	for (const key of Object.keys(sumMap)) {
		let count = 0;
		let lastEnd = -1;

		for (const index of sumMap[key]) {
			if (index > lastEnd) {
				count++;
				lastEnd = index + 1;
			}
		}

		result = result < count ? count : result;
	}

	return result;
}
console.log(solution(input));
