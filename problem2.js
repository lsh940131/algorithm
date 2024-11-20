const input = "022";

function solution(S) {
	const result = [];

	for (let i = 0, length = S.length; i < length; i++) {
		for (let digit = 0; digit <= 9; digit++) {
			const cur = S.slice(0, i) + digit + S.slice(i + 1);

			if (!result.includes(cur) && parseInt(cur) % 3 == 0) {
				result.push(cur);
			}
		}
	}

	return result.length;
}
console.log(solution(input));
