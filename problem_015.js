/**
 * 프로그래머스 레벨2 피보나치
 *
 * 문제: 피보나치 수는 F(0) = 0, F(1) = 1일 때, 1 이상의 n에 대하여 F(n) = F(n-1) + F(n-2) 가 적용되는 수 입니다.
 * 예를들어
 * 		F(2) = F(0) + F(1) = 0 + 1 = 1
 * 		F(3) = F(1) + F(2) = 1 + 1 = 2
 * 		F(4) = F(2) + F(3) = 1 + 2 = 3
 * 		F(5) = F(3) + F(4) = 2 + 3 = 5
 * 와 같이 이어집니다.
 * 2 이상의 n이 입력되었을 때, n번째 피보나치 수를 1234567으로 나눈 나머지를 리턴하는 함수, solution을 완성해 주세요.
 *
 * 제한 사항
 * 		n은 2 이상 100,000 이하인 자연수입니다.
 */

const n1 = 3; // 2
const n2 = 5; // 5

/* 배열 버전. 배열 길이가 너무 길어지지 않도록 신경 썼는데, 사실 배열이 필요 없었음
function solution1(n) {
	var answer = 0;

	let ppIndex = 0; // 2번째 전 인덱스
	let pIndex = 1; // 1번째 전 인덱스
	const arr = [0, 1];

	for (let i = 2; i <= n; i++) {
		const index = i % 3;
		arr[index] = (arr[ppIndex] + arr[pIndex]) % 1234567;
		ppIndex = pIndex;
		pIndex = index;
	}

	answer = arr[pIndex] % 1234567;
	// console.log(answer);

	return answer;
}
solution1(n1);
*/

function solution2(n) {
	var answer = 0;

	let pp = 0; // 2번째 전 값
	let p = 1; // 1번째 전 값
	let cur = 1;

	for (let i = 2; i <= n; i++) {
		cur = (pp + p) % 1234567;
		pp = p;
		p = cur;
	}

	answer = cur % 1234567;
	console.log(answer);

	return answer;
}
solution2(n2);
