/**
 * 프로그래머스 레벨1 붕대 감기
 *
 * t초동안 붕대를 감으면서 1초마다 x의 체력 회복
 * t초 연속으로 붕대감는데 성공하면 y만큼 체력을 추가회복
 *
 * 최대 체력 이상 회복 불가
 * 공격 받으면 체력이 줄어들고, 붕대 감기 캔슬, 현재 체력이 0이하가 되면 체력 회복 불가
 * 붕대 감기는 계속 재사용
 *
 * bandage = [시전 시간, 초당 회복량, 추가 회복량]
 * health = 최대 체력
 * attacks = [[공격 시간, 피해량], ...]
 *
 * 모든 공격이 끝난 직후 남은 체력을 return 하도록 solution 함수를 완성해 주세요.
 * 몬스터의 공격을 받고 캐릭터의 체력이 0 이하가 되어 죽는다면 -1을 return 해주세요.
 */

const bandage1 = [5, 1, 5],
	health1 = 30,
	attacks1 = [
		[2, 10],
		[9, 15],
		[10, 5],
		[11, 5],
	]; // 5
const bandage2 = [3, 2, 7],
	health2 = 20,
	attacks2 = [
		[1, 15],
		[5, 16],
		[8, 6],
	]; //-1
const bandage3 = [4, 2, 7],
	health3 = 20,
	attacks3 = [
		[1, 15],
		[5, 16],
		[8, 6],
	]; //-1
const bandage4 = [1, 1, 1],
	health4 = 5,
	attacks4 = [
		[1, 2],
		[3, 2],
	]; //	3

function solution(bandage, health, attacks) {
	let answer = health; // 체력

	const attackMap = {};
	for (const attack of attacks) {
		const [time, damage] = attack;
		attackMap[time] = damage;
	}

	const [goal, heal, bonus] = bandage;
	let count = 0; // 시전시간
	const len = attacks[attacks.length - 1][0];
	for (let i = 1; i <= len; i++) {
		const attack = attackMap[i];
		if (attack) {
			count = 0;
			answer -= attack;
			if (answer < 1) {
				// console.log("Game over. i:", i);
				answer = -1;
				break;
			}
		} else {
			let totalHeal = heal;
			if (++count === goal) {
				totalHeal += bonus;
				count = 0;
			}
			answer += totalHeal;

			if (health < answer) answer = health;
		}

		// console.log({ i, answer, count });
	}

	console.log(answer);
	return answer;
}
solution(bandage3, health3, attacks3);

/* 다른사람 풀이
function solution(bandage, health, attacks) {
	let currHealth = health;
	let currTime = 0;
  
	for (let [attackTime, damage] of attacks) {
	  let diffTime = attackTime - currTime - 1;
	  currHealth += diffTime * bandage[1] + Math.floor(diffTime / bandage[0]) * bandage[2];
  
	  if (currHealth > health) currHealth = health;
	  currHealth -= damage;
	  if (currHealth <= 0) return -1;
	  currTime = attackTime;
	}
  
	return currHealth;
  }
*/
