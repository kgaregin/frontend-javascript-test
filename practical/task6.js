/**
 * Created by Garegin on 30.08.2016.
 * For tutu.ru frontend-js-test.
 */

// Вариант ответа в 1 строчку:
function parseUrl(url) {
    return new URL(url);
}

// Еще вариант ответа:
// function parseUrl(URL) {
//     var a = document.createElement('a');
//     a.setAttribute("href", URL);
//  return a;
// }

// Проверка работы результата
var a = parseUrl('http://tutu.ru:8080/do/any.php?a=1&b[]=a&b[]=b#foo');

// Вернет объект, в котором будут следующие свойства:
console.log( a );
console.log( a.hash );
console.log( a.port );
console.log( a.host );
console.log( a.protocol );
console.log( a.hostname );
console.log( a.pathname );
console.log( a.origin);