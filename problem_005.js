/**
 * 프로그래머스 레벨1 공원산책
 *
 * 문제: 공원은 좌측상단(0,0), 우측하단(H-1,W-1)
 * park의 S = 시작지점, O = 통과가능, X = 막힌길
 *
 * 주어진 예시3 (park3, routes3)의 좌표는 아래와 같음
 * O S O
 * O O O
 * O X O
 * O O O
 * 명령 1은 공원 밖을 나가게되고, 명령 2는 지날 수 없는 길이기 때문에 무시. 최종적으로 3번째 명령만 수행. 따라서 결과값이 [0,0]이 되는 것
 */
// const park1 = ["SOO", "OOO", "OOO"], routes1 = ["E 2", "S 2", "W 1"]; // [2,1]
// const park2 = ["SOO","OXX","OOO"], routes2 = ["E 2","S 2","W 1"] // [0,1]
const park3 = ["OSO", "OOO", "OXO", "OOO"],
	routes3 = ["E 2", "S 3", "W 1"]; // [0,0]

// 내가 무식하게 푼 것
function solution1(park, routes) {
	let x = 0,
		y = 0;
	let xMax = park[0].split("").length,
		yMax = park.length;
	const yArr = [];
	for (let i = 0; i < yMax; i++) {
		const p = park[i];
		const xArr = p.split("");
		for (let j = 0; j < xMax; j++) {
			if (xArr[j] == "S") {
				[x, y] = [j, i];
			}
		}
		yArr.push(xArr);
	}

	for (const route of routes) {
		let [direct, move] = route.split(" ");
		move = Number(move);
		/**
		 * (0,0)이 왼쪽 하단이 아니라 상단에 있기 때문에, 그래프의 y축이 아래로 그려지기 때문에, N와 S의 이동을 역전
		 * E = x+move
		 * W = x-move
		 * N = y-move
		 * S = y+move
		 */
		let xGoal = x,
			yGoal = y;
		switch (direct) {
			case "E":
				xGoal += move;
				break;
			case "W":
				xGoal -= move;
				break;
			case "N":
				yGoal -= move;
				break;
			case "S":
				yGoal += move;
				break;
		}

		/* 공원을 벗어나면 명령 무시 */
		if (xGoal < 0 || yGoal < 0) {
			continue;
		}
		if (xGoal >= xMax || yGoal >= yMax) {
			continue;
		}

		/* 길목에 X가 있으면 명령 무시 */
		// x가 다름
		let canMove = true;
		if (x != xGoal) {
			if (x < xGoal) {
				for (let i = x; i <= xGoal; i++) {
					if (yArr[y][i] == "X") {
						canMove = false;
					}
				}
			} else {
				for (let i = x; i >= xGoal; i--) {
					if (yArr[y][i] == "X") {
						canMove = false;
					}
				}
			}
		}
		// y가 다름
		else {
			if (y < yGoal) {
				for (let i = y; i <= yGoal; i++) {
					if (yArr[i][x] == "X") canMove = false;
				}
			} else {
				for (let i = y; i >= yGoal; i--) {
					if (yArr[i][x] == "X") canMove = false;
				}
			}
		}

		if (canMove) {
			x = xGoal;
			y = yGoal;
		}
	}

	return [y, x];
}
// solution1(park3, routes3);

// 남이 푼 것
function solution(park, routes) {
	const dirs = { E: [0, 1], W: [0, -1], S: [1, 0], N: [-1, 0] };
	let [x, y] = [0, 0];
	for (let i = 0; i < park.length; i++) {
		if (park[i].includes("S")) {
			[x, y] = [i, park[i].indexOf("S")];
			break;
		}
	}

	routes.forEach((route) => {
		const [r, n] = route.split(" ");
		let [nx, ny] = [x, y];
		let cnt = 0;
		while (cnt < n) {
			[nx, ny] = [nx + dirs[r][0], ny + dirs[r][1]];
			if (!park[nx] || !park[nx][ny] || park[nx][ny] === "X") break;
			cnt++;
		}
		if (cnt == n) [x, y] = [nx, ny];
	});
	console.log([x, y]);
	return [x, y];
}
solution(park3, routes3);
