/**
 * 프로그래머스 레벨1 바탕화면 정리
 *
 * 문제: 바탕화면은 정사각인 격자판.
 * 바탕화면의 상태를 나타낸 문자열 배열 wallpaper
 * 바탕화면 좌측상단 (0,0)
 * 빈칸은 ".", 파일이 있는 칸은 "#"
 * 최소한의 이동거리를 갖는 한 번의 드래그로 모든 파일을 선택해서 삭제
 * 드래그로 파일들을 선택하는 방법은
 * 드래그 시작위치 S(lux, luy), 종료위치 E(rdx, rdy)
 * 그래그를 한 거리는 |rdx -lux|+|rdy-luy|
 * 드래그 범위 안에 있는 모든 파일이 선택됨
 * 주어진 wallpaper = [".#...", "..#..", "...#."] 에 대해 최소의 이동으로 모든 파일을 선택할 수 있는 [lux, luy, rdx, rdy]를 반환하라
 * 1 ≤ wallpaper의 길이 ≤ 50
 * 1 ≤ wallpaper[i]의 길이 ≤ 50
 */

const input1 = [".#...", "..#..", "...#."]; // [0, 1, 3, 4]
const input2 = ["..........", ".....#....", "......##..", "...##.....", "....#....."]; // [1, 3, 5, 8]
const input3 = [".##...##.", "#..#.#..#", "#...#...#", ".#.....#.", "..#...#..", "...#.#...", "....#...."]; // [0, 0, 7, 9]
const input4 = ["..", "#."]; // [1, 0, 2, 1]
function solution(wallpaper) {
	let [lx, ly, rx, ry] = [50, 50, 0, 0]; // 좌측x,y는 값이 작을수록, 우측x,y는 값이 클수록

	for (let i = 0, iLen = wallpaper.length; i < iLen; i++) {
		const xArr = wallpaper[i].split("");
		// console.log(xArr);

		for (let j = 0, jLen = xArr.length; j < jLen; j++) {
			if (wallpaper[i][j] === "#") {
				// console.log({ j, i });
				if (j < lx) lx = j;
				if (i < ly) ly = i;
				if (j > rx) rx = j;
				if (i > ry) ry = i;
			}
		}
	}

	// console.log({ ly, lx, ry: ry + 1, rx: rx + 1 });
	return [ly, lx, ry + 1, rx + 1];
}
solution(input3);

/**
 * 다른사람 풀이
function solution(wallpaper) {
    let left = [];
    let top = [];
    let right = []
    let bottom = [];
    wallpaper.forEach((v,i) => {
        [...v].forEach((val,ind) => {
            if(val === "#") {
                left.push(i)
                top.push(ind)
                right.push(i + 1)
                bottom.push(ind + 1)
            }
        })
    })
    return [Math.min(...left), Math.min(...top), Math.max(...right), Math.max(...bottom)]
}
*/
