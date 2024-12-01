/**
 * 프로그래머스 레벨1 덧칠하기
 *
 * 문제: n 미터인 벽, m 미터인 롤러 길이(한 번에 칠하는 범위), section은 벽을 1미터 단위로 나눔
 * 
 * 롤러가 벽에서 벗어나면 안 됩니다. 
 * 
    1 ≤ m ≤ n ≤ 100,000
    1 ≤ section의 길이 ≤ n
        1 ≤ section의 원소 ≤ n
        section의 원소는 페인트를 다시 칠해야 하는 구역의 번호입니다.
        section에서 같은 원소가 두 번 이상 나타나지 않습니다.
        section의 원소는 오름차순으로 정렬되어 있습니다.
 */

const n1 = 8,
	m1 = 4,
	section1 = [2, 3, 6]; // 2

const n2 = 5,
	m2 = 4,
	section2 = [1, 3]; //1

const n3 = 4,
	m3 = 1,
	section3 = [1, 2, 3, 4]; //	4

function solution(n, m, section) {
	let answer = 0;
	let point = 0;

	for (let i = 0, len = section.length; i < len; i++) {
		const sectionNum = section[i];
		if (point < sectionNum) {
			point = sectionNum + m - 1;
			answer++;
		}
	}

	console.log(answer);
	return answer;
}
solution(n1, m1, section1);
