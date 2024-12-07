/**
 * 프로그래머스 레벨1 신규 아이디 추천 2021 KAKAO BLIND RECRUITMENT
 *
 * 문제: 카카오 아이디 규칙에 맞지 않는 아이디를 입력했을 때, 입력된 아이디와 유사하면서 규칙에 맞는 아이디를 추천해주는 프로그램을 개발
 * 카카오 아이디의 규칙입니다.
 * - 아이디의 길이는 3자 이상 15자 이하여야 합니다.
 * - 아이디는 알파벳 소문자, 숫자, 빼기(-), 밑줄(_), 마침표(.) 문자만 사용할 수 있습니다.
 * - 단, 마침표(.)는 처음과 끝에 사용할 수 없으며 또한 연속으로 사용할 수 없습니다.
 * 7단계의 순차적인 처리 과정을 통해 신규 유저가 입력한 아이디가 카카오 아이디 규칙에 맞는 지 검사하고 규칙에 맞지 않은 경우 규칙에 맞는 새로운 아이디를 추천
 * 1단계 new_id의 모든 대문자를 대응되는 소문자로 치환합니다.
 * 2단계 new_id에서 알파벳 소문자, 숫자, 빼기(-), 밑줄(_), 마침표(.)를 제외한 모든 문자를 제거합니다.
 * 3단계 new_id에서 마침표(.)가 2번 이상 연속된 부분을 하나의 마침표(.)로 치환합니다.
 * 4단계 new_id에서 마침표(.)가 처음이나 끝에 위치한다면 제거합니다.
 * 5단계 new_id가 빈 문자열이라면, new_id에 "a"를 대입합니다.
 * 6단계 new_id의 길이가 16자 이상이면, new_id의 첫 15개의 문자를 제외한 나머지 문자들을 모두 제거합니다.
 * 		만약 제거 후 마침표(.)가 new_id의 끝에 위치한다면 끝에 위치한 마침표(.) 문자를 제거합니다.
 * 7단계 new_id의 길이가 2자 이하라면, new_id의 마지막 문자를 new_id의 길이가 3이 될 때까지 반복해서 끝에 붙입니다.
 *
 * [제한사항]
 * new_id는 길이 1 이상 1,000 이하인 문자열입니다.
 * new_id는 알파벳 대문자, 알파벳 소문자, 숫자, 특수문자로 구성되어 있습니다.
 * new_id에 나타날 수 있는 특수문자는 -_.~!@#$%^&*()=+[{]}:?,<>/ 로 한정됩니다.
 */

const inputNewId1 = "...!@BaT#*..y.abcdefghijklm"; // "bat.y.abcdefghi"
const inputNewId2 = "z-+.^."; // "z--"
const inputNewId3 = "=.="; // "aaa"
const inputNewId4 = "123_.def"; // "123_.def"
const inputNewId5 = "abcdefghijklmn.p"; // "abcdefghijklmn"

function solution(new_id) {
	var answer = new_id;

	// 1. upper -> lower
	answer = answer.toLowerCase();

	// 2. 소문자, 숫자, 빼기(-), 마침표(.) 를 제외한 모든 문자 제거
	answer = answer.replace(/[^a-z0-9._-]/g, "");

	// 3. 마침표(.)가 2번 이상 연속된 부분을 하나의 마침표(.)로 치환
	answer = answer.replace(/\.{2,}/g, ".");

	// 4. 마침표(.)가 처음이나 끝에 위치한다면 제거
	answer = answer.replace(/^\.+|\.+$/g, "");

	// 5. 빈 문자열이라면, "a" 대입
	answer = answer.length === 0 ? "a" : answer;

	// 6. 16자 이상이면, new_id의 첫 15개의 문자를 제외한 나머지 문자들을 모두 제거합니다. 만약 제거 후 마침표(.)가 new_id의 끝에 위치한다면 끝에 위치한 마침표(.) 문자를 제거
	answer = answer.length > 15 ? answer.slice(0, 15).replace(/\.+$/, "") : answer;

	// 7. 길이가 2자 이하라면, new_id의 마지막 문자를 new_id의 길이가 3이 될 때까지 반복해서 끝에 붙이기
	if (answer.length < 3) {
		const lastChar = answer.charAt(answer.length - 1);
		while (answer.length < 3) {
			answer += lastChar;
		}
	}

	console.log(answer);
	return answer;
}
solution("123_.def");

/* 다른사람 풀이
function solution(new_id) {
    const answer = new_id
        .toLowerCase() // 1
        .replace(/[^\w-_.]/g, '') // 2
        .replace(/\.+/g, '.') // 3
        .replace(/^\.|\.$/g, '') // 4
        .replace(/^$/, 'a') // 5
        .slice(0, 15).replace(/\.$/, ''); // 6
    const len = answer.length;
    return len > 2 ? answer : answer + answer.charAt(len - 1).repeat(3 - len);
}
*/
