/**
 * 프로그래머스 레벨1 동영상 재생기
 *
 * 10초 전 이동, 10초 후 이동, 오프닝 건너뛰기 3가지 기능
 *
 * prev: 10초 이전으로 이동, 현재 위치가 10초 미만일 경우 처음 위치(0분 0초)
 * next: 10초 후로 이동, 남은 시간이 10초 미만일 경우 마지막 위치(동영상 길이)
 * 오프닝 건너뛰기: ep_start <= 현재 위치 <= op_end 인 경우 자동으로 오프닝이 끝나는 위치로 이동
 *
 * 동영상의 길이를 나타내는 문자열 video_len
 * 기능이 수행되기 직전의 재생위치를 나타내는 문자열 pos
 * 오프닝 시작 시각을 나타내는 문자열 op_start
 * 오프닝이 끝나는 시각을 나타내는 문자열 op_end
 * 사용자의 입력을 나타내는 1차원 문자열 배열 commands가 매개변수로 주어집니다.
 * 이때 사용자의 입력이 모두 끝난 후 동영상의 위치를 "mm:ss" 형식으로 return 하도록 solution 함수를 완성해 주세요.
 */

const video_len1 = "34:33",
	pos1 = "13:00",
	op_start1 = "00:55",
	op_end1 = "02:55",
	commands1 = ["next", "prev"]; // 	"13:00"
const video_len2 = "10:55",
	pos2 = "00:05",
	op_start2 = "00:15",
	op_end2 = "06:55",
	commands2 = ["prev", "next", "next"]; // 	"06:55"
const video_len3 = "07:22",
	pos3 = "04:05",
	op_start3 = "00:15",
	op_end3 = "04:07",
	commands3 = ["next"]; // "04:17"

function solution(video_len, pos, op_start, op_end, commands) {
	var answer = "";

	const commandMap = { prev: -10, next: 10 };

	const p = convertTime(pos);
	const os = convertTime(op_start);
	const oe = convertTime(op_end);
	const end = convertTime(video_len);
	// console.log({ p, os, oe, end });

	let cur = os <= p && p <= oe ? oe : p;

	for (const command of commands) {
		cur += commandMap[command];

		if (cur < 0) cur = 0;
		if (os <= cur && cur <= oe) cur = oe;
		if (end < cur) cur = end;
	}

	// console.log({ cur });
	answer = `${String(Math.floor(cur / 60)).padStart(2, "0")}:${String(cur % 60).padStart(2, "0")}`;

	console.log(answer);
	return answer;

	/**
	 * 'HH:mm' 형태를 timestamp 형식으로 변환
	 * Number(HH*60 + mm)
	 */
	function convertTime(strHHmm) {
		const [HH, mm] = strHHmm.split(":");
		return HH * 60 + Number(mm);
	}
}

solution(video_len3, pos3, op_start3, op_end3, commands3);
