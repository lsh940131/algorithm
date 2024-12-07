/**
 * 프로그래머스 레벨1 신고 결과 받기 2022 KAKAO BLIND RECRUITMENT
 *
 * 문제: 불량 이용자를 신고하고, 처리 결과를 메일로 발송
 * 
 * 각 유저는 한 번에 한 명의 유저를 신고할 수 있습니다.
 * - 신고 횟수에 제한은 없습니다. 서로 다른 유저를 계속해서 신고할 수 있습니다.
 * - 한 유저를 여러 번 신고할 수도 있지만, 동일한 유저에 대한 신고 횟수는 1회로 처리됩니다.
 * k번 이상 신고된 유저는 게시판 이용이 정지되며, 해당 유저를 신고한 모든 유저에게 정지 사실을 메일로 발송합니다.
 * - 유저가 신고한 모든 내용을 취합하여 마지막에 한꺼번에 게시판 이용 정지를 시키면서 정지 메일을 발송합니다.
 * 
 * 제한사항

    2 ≤ id_list의 길이 ≤ 1,000
        1 ≤ id_list의 원소 길이 ≤ 10
        id_list의 원소는 이용자의 id를 나타내는 문자열이며 알파벳 소문자로만 이루어져 있습니다.
        id_list에는 같은 아이디가 중복해서 들어있지 않습니다.
    1 ≤ report의 길이 ≤ 200,000
        3 ≤ report의 원소 길이 ≤ 21
        report의 원소는 "이용자id 신고한id"형태의 문자열입니다.
        예를 들어 "muzi frodo"의 경우 "muzi"가 "frodo"를 신고했다는 의미입니다.
        id는 알파벳 소문자로만 이루어져 있습니다.
        이용자id와 신고한id는 공백(스페이스)하나로 구분되어 있습니다.
        자기 자신을 신고하는 경우는 없습니다.
    1 ≤ k ≤ 200, k는 자연수입니다.
    return 하는 배열은 id_list에 담긴 id 순서대로 각 유저가 받은 결과 메일 수를 담으면 됩니다.
 */

const id_list1 = ["muzi", "frodo", "apeach", "neo"],
	report1 = ["muzi frodo", "apeach frodo", "frodo neo", "muzi neo", "apeach muzi"],
	k1 = 2; // [2,1,1,0]
const id_list2 = ["con", "ryan"],
	report2 = ["ryan con", "ryan con", "ryan con", "ryan con"],
	k2 = 3; //[0,0]

function solution(id_list, report, k) {
	var answer = id_list.map(() => 0);

	// 초기화
	const idIndexMap = {}; // {id: index}
	const criminalMap = {}; // {신고받은사람: [신고자]}
	for (let i = 0, len = id_list.length; i < len; i++) {
		const id = id_list[i];
		idIndexMap[id] = i;
		criminalMap[id] = [];
	}

	// 신고 데이터 처리
	const noDupReport = Array.from(new Set(report));
	for (const r of noDupReport) {
		const [reporter, criminal] = r.split(" ");
		criminalMap[criminal].push(reporter);
	}

	for (const key in criminalMap) {
		// 신고가 k건 이상이면 해당 사용자는 정지 & 신고자에게 메일 발송
		if (criminalMap[key].length >= k) {
			const reporters = criminalMap[key];
			for (const r of reporters) {
				const index = idIndexMap[r]; // id_list.indexOf(r)로 index를 구해서 처리해도 가능하지만, id_list가 많이 길어지면 시간이 같이 증가함. indexOf = O(n), Map = O(1)
				answer[index]++;
			}
		}
	}

	console.log(answer);
	return answer;
}
solution(id_list1, report1, k1);

/* 다른 사람 풀이
function solution(id_list, report, k) {
   let reports = [...new Set(report)].map(a=>{return a.split(' ')});
    let counts = new Map();
    for (const bad of reports){
        counts.set(bad[1],counts.get(bad[1])+1||1)
    }
    let good = new Map();
    for(const report of reports){
        if(counts.get(report[1])>=k){
            good.set(report[0],good.get(report[0])+1||1)
        }
    }
    let answer = id_list.map(a=>good.get(a)||0)
    return answer;
}
*/
