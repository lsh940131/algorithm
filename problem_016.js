/**
 * 프로그래머스 레벨2 과제 진행하기
 * 
 * 문제: 과제 진행
 * - 과제는 시작 시각이 되면 시작
 * - 새로운 과제 시작 시각이 되면, 기존 진행 중이던 과제 멈추고 새로운 과제 시작
 * - 진행중이던 과제를 끝냈을 때, 잠시 멈춘 과제가 있다면 멈춘 과제 이어서 진행
 * 		- 만약, 과제를 끝낸 시각에 새로운 과제와 멈춰둔 고제 둘 다 있다면, 새로운 과제부터 시작
 * - 멈춰둔 과제가 여러개일 경우, 가장 최근에 멈춘 과제부터 시작
 * 과제 계획을 담은 이차원 문자열 배열 plans가 매개변수로 주어질 때, 과제를 끝낸 순서대로 이름을 배열에 담아 return 하는 solution 함수를 완성
 * 
 * 제한사항
    3 ≤ plans의 길이 ≤ 1,000
        plans의 원소는 [name, start, playtime]의 구조로 이루어져 있습니다.
            name : 과제의 이름을 의미합니다.
                2 ≤ name의 길이 ≤ 10
                name은 알파벳 소문자로만 이루어져 있습니다.
                name이 중복되는 원소는 없습니다.
            start : 과제의 시작 시각을 나타냅니다.
                "hh:mm"의 형태로 "00:00" ~ "23:59" 사이의 시간값만 들어가 있습니다.
                모든 과제의 시작 시각은 달라서 겹칠 일이 없습니다.
                과제는 "00:00" ... "23:59" 순으로 시작하면 됩니다. 즉, 시와 분의 값이 작을수록 더 빨리 시작한 과제입니다.
            playtime : 과제를 마치는데 걸리는 시간을 의미하며, 단위는 분입니다.
                1 ≤ playtime ≤ 100
                playtime은 0으로 시작하지 않습니다.
            배열은 시간순으로 정렬되어 있지 않을 수 있습니다.
    진행중이던 과제가 끝나는 시각과 새로운 과제를 시작해야하는 시각이 같은 경우 진행중이던 과제는 끝난 것으로 판단합니다.

 */

const plans1 = [
	["korean", "11:40", "30"],
	["english", "12:10", "20"],
	["math", "12:30", "40"],
]; // ["korean", "english", "math"]
const plans2 = [
	["science", "12:40", "50"],
	["music", "12:20", "40"],
	["history", "14:00", "30"],
	["computer", "12:30", "100"],
]; // ["science", "history", "computer", "music"]
const plans3 = [
	["aaa", "12:00", "20"],
	["bbb", "12:10", "30"],
	["ccc", "12:40", "10"],
]; // ["bbb", "ccc", "aaa"]

function solution(plans) {
	var answer = [];

	// 과제 시작시각 오름차순 정렬
	const orderedPlans = plans
		.map((v) => ({
			assignment: v[0],
			start: v[1],
			ts: convertTs(v[1]),
			duration: v[2],
		}))
		.sort((a, b) => a.ts - b.ts);

	let thisTs = 0; // 현재 시각
	const pause = []; // 중단한 과제 [{assignment: "과제이름", remain: "남은시간"}, ... ]
	for (let i = 0, len = orderedPlans.length - 1; i < len; i++) {
		const cur = orderedPlans[i];
		const next = orderedPlans[i + 1];

		const endTs = cur.ts + cur.duration * 1; // 현재 과제가 끝나는 시각

		// 완료 시각이 다음 과제 시작 시각보다 클 경우 = 현재 과제 진행 중 다음 과제 시작 시각이 되었을 경우
		if (next.ts < endTs) {
			thisTs = next.ts;
			pause.push({ assignment: cur.assignment, remain: endTs - next.ts });
		}
		// 현재 과제 완료 가능
		else {
			thisTs = endTs;
			answer.push(cur.assignment);

			// 밀린 과제가 있을 경우
			while (pause.length) {
				const { assignment, remain } = pause.pop();
				const puaseEndTs = thisTs + remain; // 밀린 과제가 끝나는 시각

				// 밀린 과제가 다음 과제 시작 시각보다 작을 경우 = 밀린 과제 완료 가능
				if (puaseEndTs <= next.ts) {
					thisTs = puaseEndTs;
					answer.push(assignment);
				}
				// 밀린 과제 완료 불가능 = 다시 미루기
				else {
					thisTs += next.ts;
					pause.push({ assignment, remain: puaseEndTs - next.ts });
					break;
				}
			}
		}
	}

	// 마지막 과제 처리
	answer.push(orderedPlans.pop().assignment);

	// 밀린 과제 모두 처리
	while (pause.length) {
		answer.push(pause.pop().assignment);
	}

	/**
	 * string 시각을 number 타임 스탬프로 변환
	 * @param {string} time "hh:mm"
	 * @returns {number}
	 */
	function convertTs(time) {
		const [hour, min] = time.split(":").map(Number);

		return hour * 60 + min;
	}

	console.log(answer);
	return answer;
}
solution(plans2);
