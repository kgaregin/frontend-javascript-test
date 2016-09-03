/**
 * Created by Garegin on 30.08.2016.
 * For tutu.ru frontend-js-test.
 */

/* Код реализации функции dscount: */
function dscount(str, s1, s2) {
    var i, count = 0;
    str = str.toLowerCase();
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();
    for (i = 0; i < str.length; i++) {
        if (str[i] == s1) {
            if (str[i + 1] == s2) {
                count++;
            }
        }
    }
    return count;
}
// PS: реализовать можно и другими способами. Этот показался наиболее оптимальным. //

/* Тестирование: */
QUnit.test("dscount test", function (assert) {
    /* original tests */
    assert.strictEqual(dscount('ab___ab__', 'a', 'b'), 2);
    assert.strictEqual(dscount('___cd____', 'c', 'd'), 1);
    assert.strictEqual(dscount('de_______', 'd', 'e'), 1);
    assert.strictEqual(dscount('12_12__12', '1', '2'), 3);
    assert.strictEqual(dscount('_ba______', 'a', 'b'), 0);
    assert.strictEqual(dscount('_a__b____', 'a', 'b'), 0);
    assert.strictEqual(dscount('-ab-аb-ab', 'a', 'b'), 2);
    assert.strictEqual(dscount('aAa', 'a', 'a'), 2);
    /* additional tests */
    assert.strictEqual(dscount('`1234567890-=\\qwertyuiop[]asdfgh  ;\'zxcvbnm,./!@#$%^&*()_--+||', ' ', ' '), 1);
    assert.strictEqual(dscount('`1234567890-=\\qwertyuiop[]asdfgh  ;\'zxcvbnm,./!@#$%^&*()_--+||', '\\', '\\'), 0);
    assert.strictEqual(dscount('zzz', 'Z', 'z'), 2);
    assert.strictEqual(dscount('ZZZZ', 'z', 'Z'), 3);
});