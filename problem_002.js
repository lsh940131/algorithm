const input = "022";
// const input = "23";

function solution(S) {
	const results = new Set();

	for (let i = 0, length = S.length; i < length; i++) {
		for (let digit = 0; digit <= 9; digit++) {
			const cur = S.slice(0, i) + digit + S.slice(i + 1);

			if (parseInt(cur) % 3 == 0) {
				results.add(cur);
			}
		}
	}

	return results.size;
}
console.log(solution(input));
