/**
 * 프로그래머스 레벨1 가장 많이 받은 선물
 * 
 * 문제: 이번 달까지 선물을 주고받은 기록을 바탕으로 다음 달에 누가 선물을 많이 받을지 예측
 * 
 * 두 사람이 선물을 주고받은 기록이 있다면, 이번 달까지 두 사람 사이에 더 많은 선물을 준 사람이 다음 달에 선물을 하나 받습니다.
 * 		예를 들어 A가 B에게 선물을 5번 줬고, B가 A에게 선물을 3번 줬다면 다음 달엔 A가 B에게 선물을 하나 받습니다.
 * 두 사람이 선물을 주고받은 기록이 하나도 없거나 주고받은 수가 같다면, 선물 지수가 더 큰 사람이 선물 지수가 더 작은 사람에게 선물을 하나 받습니다.
 * 		선물 지수는 이번 달까지 자신이 친구들에게 준 선물의 수에서 받은 선물의 수를 뺀 값입니다.
 * 		예를 들어 A가 친구들에게 준 선물이 3개고 받은 선물이 10개라면 A의 선물 지수는 -7입니다. B가 친구들에게 준 선물이 3개고 받은 선물이 2개라면 B의 선물 지수는 1입니다. 만약 A와 B가 선물을 주고받은 적이 없거나 정확히 같은 수로 선물을 주고받았다면, 다음 달엔 B가 A에게 선물을 하나 받습니다.
 * 		만약 두 사람의 선물 지수도 같다면 다음 달에 선물을 주고받지 않습니다.
 * 
 * 제한사항
    2 ≤ friends의 길이 = 친구들의 수 ≤ 50
        friends의 원소는 친구의 이름을 의미하는 알파벳 소문자로 이루어진 길이가 10 이하인 문자열입니다.
        이름이 같은 친구는 없습니다.
    1 ≤ gifts의 길이 ≤ 10,000
        gifts의 원소는 "A B"형태의 문자열입니다. A는 선물을 준 친구의 이름을 B는 선물을 받은 친구의 이름을 의미하며 공백 하나로 구분됩니다.
        A와 B는 friends의 원소이며 A와 B가 같은 이름인 경우는 존재하지 않습니다.

 * 다음달에 가장 많은 선물을 받는 친구가 받을 선물의 수를 return 하도록 solution 함수를 완성
 */
const friends1 = ["muzi", "ryan", "frodo", "neo"],
	gifts1 = ["muzi frodo", "muzi frodo", "ryan muzi", "ryan muzi", "ryan muzi", "frodo muzi", "frodo ryan", "neo muzi"]; // 2
const friends2 = ["joy", "brad", "alessandro", "conan", "david"],
	gifts2 = ["alessandro brad", "alessandro joy", "alessandro conan", "david alessandro", "alessandro david"]; // 4
const friends3 = ["a", "b", "c"],
	gifts3 = ["a b", "b a", "c a", "a c", "a c", "c a"]; // 0

function solution(friends, gifts) {
	var answer = 0;

	// 초기화
	const logMap = {}; // 선물을 주고 받은 기록 및 선물지수 계산용 맵, {친구 이름: {준 기록: {친구이름: 개수, ...}, 선물지수: 0}}
	const expectMap = {}; // 기대 선물 개수 맵, {받을 친구 이름: 개수}
	for (const f of friends) {
		logMap[f] = { give: {}, point: 0 };
		expectMap[f] = 0;
	}

	// 선물 기록
	for (const g of gifts) {
		const [giver, taker] = g.split(" ");

		// 선물을 준 친구
		const giveFriend = logMap[giver];
		if (!giveFriend.give[taker]) giveFriend.give[taker] = 1;
		else giveFriend.give[taker]++;
		giveFriend.point++;

		// 선물을 받은 친구
		const takeFriend = logMap[taker];
		takeFriend.point--;
	}

	// 기대 선물 계산
	for (let i = 0, ilen = friends.length; i < ilen; i++) {
		for (let j = i + 1, jlen = friends.length; j < jlen; j++) {
			const iName = friends[i];
			const jName = friends[j];

			const iFriend = logMap[iName];
			const jFriend = logMap[jName];

			const iGive = iFriend.give[jName] || 0;
			const jGive = jFriend.give[iName] || 0;
			if (iGive < jGive) {
				expectMap[jName]++;
			} else if (iGive > jGive) {
				expectMap[iName]++;
			} else {
				const iPoint = iFriend.point;
				const jPoint = jFriend.point;

				if (iPoint < jPoint) {
					expectMap[jName]++;
				} else if (iPoint > jPoint) {
					expectMap[iName]++;
				}
			}
		}
	}

	// console.log(expectMap);

	answer = Math.max(...Object.values(expectMap));
	// console.log(answer);

	return answer;
}
solution(friends1, gifts1);
