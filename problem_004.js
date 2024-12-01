/**
 * 프로그래머스 레벨1 달리기 경주
 *
 * 문제: 해설진들은 선수들이 자기 바로 앞의 선수를 추월할 때 추월한 선수의 이름을 부릅니다.
 * 예를 들어 1등부터 3등까지 "mumu", "soe", "poe" 선수들이 순서대로 달리고 있을 때, 해설진이 "soe"선수를 불렀다면 2등인 "soe" 선수가 1등인 "mumu" 선수를 추월했다는 것입니다.
 * 즉 "soe" 선수가 1등, "mumu" 선수가 2등으로 바뀝니다. => 1.mume, 2.soe 에서 "soe"가 불린다면, 1.soe, 2.mume 순서
 *
 * 선수들의 이름이 1등부터 현재 등수 순서대로 담긴 문자열 배열 players와 해설진이 부른 이름을 담은 문자열 배열 callings가 매개변수로 주어질 때,
 * 경주가 끝났을 때 선수들의 이름을 1등부터 등수 순서대로 배열에 담아 return 하는 solution 함수를 완성해주세요.
 */
const paramPlayers = ["mumu", "soe", "poe", "kai", "mine"];
const paramCallings = ["kai", "kai", "mine", "mine"];

/**
 * 풀이: 불렸을 때마다 원래 순서에서 삭제하고, 그 앞에 다시 삽입하는 방법
 * => 시간 초과로 실패
 */
function solution1(players, callings) {
	for (const calling of callings) {
		const index = players.indexOf(calling); // 원래 순위 찾기
		players.splice(index, 1); // 원래 순위에서 불린 선수의 이름 삭제
		players.splice(index - 1, 0, calling); // 한단계 높은 순위에 불린 선수의 이름 다시 삽입
	}

	console.log(players);
	return players;
}
// solution1(paramPlayers, paramCallings); // ["mumu", "kai", "mine", "soe", "poe"]

/**
 * 풀이: json을 사용해서 array의 index를 저장해서, 해당하는 두개의 인자만 교환. splice는 느림
 */
function solution2(players, callings) {
	const map = {};
	players.forEach((player, index) => {
		map[player] = index;
	});

	for (const calling of callings) {
		const curRank = map[calling];
		if (curRank > 0) {
			const prePlayer = players[curRank - 1];
			const temp = players[curRank];
			players[curRank] = prePlayer;
			players[curRank - 1] = temp;

			map[calling] = curRank - 1;
			map[prePlayer] = curRank;
		}
	}
	console.log(players);
	return players;
}
solution2(paramPlayers, paramCallings);
