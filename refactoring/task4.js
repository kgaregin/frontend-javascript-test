/**
 * Created by Garegin on 30.08.2016.
 * For tutu.ru frontend-js-test.
 */

// refactored func:
function anyLastIndexOf(baseString, sub1, sub2) {
    if ((Math.max(baseString.lastIndexOf(sub1), baseString.lastIndexOf(sub2)) === 0) || baseString.length <= 1 || (sub1.length != 1 && sub2.length != 1)) {
        return -1;
    } else {
        return Math.max(baseString.lastIndexOf(sub1), baseString.lastIndexOf(sub2));
    }
}

// можно записать решение в одну строку, но читабельность утратится:
// return (Math.max(baseString.lastIndexOf(sub1), baseString.lastIndexOf(sub2)) === 0 || baseString.length <= 1 || (sub1.length != 1 && sub2.length != 1)) ? -1 : Math.max(baseString.lastIndexOf(sub1), baseString.lastIndexOf(sub2));

// original func:
function func(s, a, b) {

    if (s.match(/^$/)) {// s.match(/^$/) эквивалентно s == ''
        return -1;      // подразумевается, что s - строка
    }

    var i = s.length - 1;// № последнего символа в строке-массиве
    var aIndex = -1;// для поиска первого вхождения подстроки a
    var bIndex = -1;// для поиска первого вхождения подстроки b

    while ((aIndex == -1) && (bIndex == -1) && (i > 0)) {// пока не найден хотя бы один индекс и не дошли до 1го символа
        if (s.substring(i, i + 1) == a) {                // если строка из 1 символа в цикл даже не попадем.
                                                         // явный выход за пределы массива. Хорошо, что JS такой терпеливый ;)
            aIndex = i;                                  // проверки s.substring(0, 1) не будет => баг-фичу придется реализовать
        }
        if (s.substring(i, i + 1) == b) {
            bIndex = i;
        }
        i = i - 1; // следующая итерация
    }
    //заметим, что единственный шанс найти и a и b - если они равны, но тогда нет смысла искать максимум (return ниже)

    if (aIndex != -1) {// если найден a
        if (bIndex == -1) {// и не найден b
            return aIndex;// возвращаем a
        }
        else {// если b тоже найден - возвращаем максимум из a || b
            return Math.max(aIndex, bIndex);
        }
    }

    if (bIndex != -1) {// если a не найден, но b найден
        return bIndex; // возвращаем b
    }
    else {
        return -1;     // иначе возвращаем код фейла
    }
}

// Итог:
// * учесть баг-фичу поиск с позиции 1 в строке s
// * длины a и b не равны 1 - выход с -1
// * длина s <= 1           - выход с -1
// * длина a или b равна 1  - выход с max(s.lastIndexOf(a), lastIndexOf(b))


/* Тестирование: */
QUnit.test("func refactoring test", function (assert) {
    assert.equal(func('', '', ''), anyLastIndexOf('', '', ''));
    assert.equal(func(' ', '', ''), anyLastIndexOf(' ', '', ''));
    assert.equal(func(' ', ' ', ''), anyLastIndexOf(' ', ' ', ''));
    assert.equal(func(' ', ' ', ' '), anyLastIndexOf(' ', ' ', ' '));
    assert.equal(func('a', 'a', 'b'), anyLastIndexOf('a', 'a', 'b'));
    assert.equal(func('a', 'b', 'a'), anyLastIndexOf('a', 'b', 'a'));
    assert.equal(func('A', 'a', 'b'), anyLastIndexOf('A', 'a', 'b'));
    assert.equal(func('A', 'b', 'a'), anyLastIndexOf('A', 'b', 'a'));
    assert.equal(func('hello world', 'he', 'h'), anyLastIndexOf('hello world', 'he', 'h'));
    assert.equal(func('hello world', 'ld', 'd'), anyLastIndexOf('hello world', 'ld', 'd'));
    assert.equal(func('hello world', ' w', 'o '), anyLastIndexOf('hello world', ' w', 'o '));
    assert.equal(func('hello world!', '!', 'd'), anyLastIndexOf('hello world!', '!', 'd'));
    assert.equal(func('hello world!', 'd', '!'), anyLastIndexOf('hello world!', 'd', '!'));
    assert.equal(func('[A-a]', '[', ']'), anyLastIndexOf('[A-a]', '[', ']'));
    assert.equal(func('[A-a]', ']', '['), anyLastIndexOf('[A-a]', ']', '['));
    assert.equal(func('Lets try more', 'ore', 'try'), anyLastIndexOf('Lets try more', 'ore', 'try'));
    assert.equal(func('Lets try more', 'le', 'ore'), anyLastIndexOf('Lets try more', 'le', 'ore'));
    assert.equal(func('Lets try more', 'more', 'Lets'), anyLastIndexOf('Lets try more', 'more', 'Lets'));
    assert.equal(func('Lets try more', 'Lets try more', 'Lets try more'), anyLastIndexOf('Lets try more', 'Lets try more', 'Lets try more'));
});