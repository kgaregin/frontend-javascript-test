/**
 * Created by Garegin on 30.08.2016.
 * For tutu.ru frontend-js-test.
 */

// refactored drawRating:
function drawRating(vote) {
    return '★'.repeat(Math.ceil(vote/20) === 0 ? 1 : Math.ceil(vote/20)) + '☆'.repeat(Math.ceil(vote/20) === 0 ? 4 : 5 - Math.ceil(vote/20));
}

// проверка работы результата:
console.log(drawRating(0) ); // ★☆☆☆☆
console.log(drawRating(1) ); // ★☆☆☆☆
console.log(drawRating(19)); // ★☆☆☆☆
console.log(drawRating(20)); // ★☆☆☆☆
console.log(drawRating(21)); // ★★☆☆☆
console.log(drawRating(50)); // ★★★☆☆
console.log(drawRating(99)); // ★★★★★
console.log(drawRating(100));// ★★★★★
