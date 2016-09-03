/**
 * Created by Garegin on 30.08.2016.
 * For tutu.ru frontend-js-test.
 */

/* Код реализации функции checkSyntax: */
function checkSyntax(str) {
    var i, j, lastBracket = [];
    var BRACKET_OPEN = ["<", "[", "{", "("];
    var BRACKET_CLOSE = [">", "]", "}", ")"];
    for (i = 0; i <= str.length-1; i++) {
        for (j = 0; j <= BRACKET_OPEN.length-1; j++) {
            if (str[i] === BRACKET_OPEN[j]){
                lastBracket.push(BRACKET_OPEN[j]);
            }
            if (str[i] === BRACKET_CLOSE[j]){
                if (lastBracket.length <= 0 || BRACKET_OPEN.indexOf(lastBracket[lastBracket.length-1]) != j) {
                    return 1;
                }
                lastBracket.pop();
            }
        }
    }
    return lastBracket.length === 0 ? 0 : 1;
}
// ответ на вопрос:
// можно было бы убрать BRACKET_CLOSE, так как почти у всех скобок юникод левой = правая + 2. Исключение только у скобки "(". Так что если ее убрать, то код сократится минимум на 1 строчку.

/* Тестирование: */
QUnit.test("checkSyntax test", function (assert) {
    /* original tests */
    assert.equal(checkSyntax("---(++++)----"), 0);
    assert.equal(checkSyntax(""), 0);
    assert.equal(checkSyntax("before"), 0);
    assert.equal(checkSyntax(") ("), 1);
    assert.equal(checkSyntax("} {"), 1);
    assert.equal(checkSyntax("<(   >)"), 1);
    assert.equal(checkSyntax("(  [  <>  ()  ]  <>  )"), 0);
    assert.equal(checkSyntax("   (      [)"), 1);
    /* additional tests */
    assert.equal(checkSyntax("[ [  "), 1);
    assert.equal(checkSyntax("[ [ ]"), 1);
    assert.equal(checkSyntax("[ [ ] ]"), 0);
    assert.equal(checkSyntax("[ [ ] ] < [ { } ] > [] [] [] [] <> {}"), 0);
    assert.equal(checkSyntax("]"), 1);
    assert.equal(checkSyntax("}"), 1);
    assert.equal(checkSyntax(")"), 1);
    assert.equal(checkSyntax("("), 1);
    assert.equal(checkSyntax("["), 1);
});

