/**
 * 프로그래머스 레벨1 개인정보 수집 유효기간(2023 KAKAO BLIND RECRUITMENT)
 *
 * 문제: 개인정보 1~n 개
 * 약관 종류 여러개 & 약관마다 유효기간 상이
 * 유효기간이 지났다면 반드시 파기
 * 오늘 파기해야할 개인정보들의 번호를 구하라
 * ex) 입력-출력 예시
 * 	today = 2022.05.19
 * 	terms = ["A 6", "B 12", "C 3"]
 * 	privacies = ["2021.05.02 A", "2021.07.01 B", "2022.02.19 C", "2022.02.20 C"]
 * 	일 경우, [1, 3] 번째(인덱스 상 0, 2) 개인정보를 파기해야한다
 * 
 제한사항
    today는 "YYYY.MM.DD" 형태로 오늘 날짜를 나타냅니다.
    1 ≤ terms의 길이 ≤ 20
        terms의 원소는 "약관 종류 유효기간" 형태의 약관 종류와 유효기간을 공백 하나로 구분한 문자열입니다.
        약관 종류는 A~Z중 알파벳 대문자 하나이며, terms 배열에서 약관 종류는 중복되지 않습니다.
        유효기간은 개인정보를 보관할 수 있는 달 수를 나타내는 정수이며, 1 이상 100 이하입니다.
    1 ≤ privacies의 길이 ≤ 100
        privacies[i]는 i+1번 개인정보의 수집 일자와 약관 종류를 나타냅니다.
        privacies의 원소는 "날짜 약관 종류" 형태의 날짜와 약관 종류를 공백 하나로 구분한 문자열입니다.
        날짜는 "YYYY.MM.DD" 형태의 개인정보가 수집된 날짜를 나타내며, today 이전의 날짜만 주어집니다.
        privacies의 약관 종류는 항상 terms에 나타난 약관 종류만 주어집니다.
    today와 privacies에 등장하는 날짜의 YYYY는 연도, MM은 월, DD는 일을 나타내며 점(.) 하나로 구분되어 있습니다.
        2000 ≤ YYYY ≤ 2022
        1 ≤ MM ≤ 12
        MM이 한 자릿수인 경우 앞에 0이 붙습니다.
        1 ≤ DD ≤ 28
        DD가 한 자릿수인 경우 앞에 0이 붙습니다.
    파기해야 할 개인정보가 하나 이상 존재하는 입력만 주어집니다.
 */

const inputToday1 = "2022.05.19";
const inputTerms1 = ["A 6", "B 12", "C 3"];
const inputPrivacies1 = ["2021.05.02 A", "2021.07.01 B", "2022.02.19 C", "2022.02.20 C"]; // [1, 3]

const inputToday2 = "2020.01.01";
const inputTerms2 = ["Z 3", "D 5"];
const inputPrivacies2 = ["2019.01.01 D", "2019.11.15 Z", "2019.08.02 D", "2019.07.01 D", "2018.12.28 Z"]; // [1, 4, 5]

function solution(today, terms, privacies) {
	const answer = [];

	const termMap = {};
	for (const term of terms) {
		const [t, v] = term.split(" ");
		termMap[t] = Number(v);
	}
	// console.log(termMap);

	// 오늘 날짜를 Date 객체로 변환
	const [todayYear, todayMonth, todayDay] = today.split(".").map(Number);
	const todayDate = new Date(todayYear, todayMonth - 1, todayDay);

	for (let i = 0, len = privacies.length; i < len; i++) {
		const privacy = privacies[i];
		const [d, t] = privacy.split(" ");
		const [year, month, day] = d.split(".").map(Number);

		// 유효기간
		const expiryDate = new Date(year, month - 1 + termMap[t], day);

		// console.log({ todayDate, expiryDate });
		if (expiryDate <= todayDate) {
			answer.push(i + 1);
		}
	}

	console.log(answer);
	return answer;
}
solution(inputToday2, inputTerms2, inputPrivacies2);

/**
 * 다른사람 풀이
function solution(today, terms, privacies) {
	var answer = [];
	var [year, month, date] = today.split(".").map(Number);
	var todates = year * 12 * 28 + month * 28 + date; -- tip!
	var t = {};
	terms.forEach((e) => {
	  let [a, b] = e.split(" ");
	  t[a] = Number(b);
	});
	privacies.forEach((e, i) => {
	  var [day, term] = e.split(" ");
	  day = day.split(".").map(Number);
	  var dates = day[0] * 12 * 28 + day[1] * 28 + day[2] + t[term] * 28; -- tip!
	  if (dates <= todates) answer.push(i + 1);
	});
	return answer;
  }
*/
