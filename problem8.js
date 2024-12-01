/**
 * 프로그래머스 레벨1 추억 점수
 *
 * 문제: 사진 속에 나오는 인물의 그리움 점수를 모두 합산한 값이 해당 사진의 추억 점수가 됩니다.
 * 예를 들어 사진 속 인물의 이름이 ["may", "kein", "kain"]이고
 * 각 인물의 그리움 점수가 [5점, 10점, 1점]일 때 해당 사진의 추억 점수는 16(5 + 10 + 1)점이 됩니다.
 * 다른 사진 속 인물의 이름이 ["kali", "mari", "don", "tony"]이고 ["kali", "mari", "don"]의 그리움 점수가 각각 [11점, 1점, 55점]]이고,
 * "tony"는 그리움 점수가 없을 때, 이 사진의 추억 점수는 3명의 그리움 점수를 합한 67(11 + 1 + 55)점입니다
 * 
제한사항

    3 ≤ name의 길이 = yearning의 길이≤ 100
        3 ≤ name의 원소의 길이 ≤ 7
        name의 원소들은 알파벳 소문자로만 이루어져 있습니다.
        name에는 중복된 값이 들어가지 않습니다.
        1 ≤ yearning[i] ≤ 100
        yearning[i]는 i번째 사람의 그리움 점수입니다.
    3 ≤ photo의 길이 ≤ 100
        1 ≤ photo[i]의 길이 ≤ 100
        3 ≤ photo[i]의 원소(문자열)의 길이 ≤ 7
        photo[i]의 원소들은 알파벳 소문자로만 이루어져 있습니다.
        photo[i]의 원소들은 중복된 값이 들어가지 않습니다.

 */

const name1 = ["may", "kein", "kain", "radi"];
const yearning1 = [5, 10, 1, 3];
const photo1 = [
	["may", "kein", "kain", "radi"],
	["may", "kein", "brin", "deny"],
	["kon", "kain", "may", "coni"],
];
// [19, 15, 6]

function solution(name, yearning, photo) {
	var answer = [];

	const nameScoreMap = {};
	for (let i = 0, len = name.length; i < len; i++) {
		nameScoreMap[name[i]] = yearning[i];
	}

	for (const p of photo) {
		const scoreSum = p.reduce((acc, cur) => (acc += nameScoreMap[cur] ? nameScoreMap[cur] : 0), 0);
		answer.push(scoreSum);
	}

	console.log(answer);
	return answer;
}
solution(name1, yearning1, photo1);
