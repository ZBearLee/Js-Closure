function count() {
    var arr = [];
    for (var i=1; i<=3; i++) {
        arr.push(function () {
            return i * i;
        });
    }
    return arr;
}
var results = count();
var f1 = results[0];
var f2 = results[1];
var f3 = results[2];

f1(); // 16
f2(); // 16
f3(); // 16

//返回的函数引用了变量i，但它并非立刻执行。等到3个函数都返回时，它们所引用的变量i已经变成了4，因此最终结果为16。
//返回闭包时牢记的一点就是：返回函数不要引用任何循环变量，或者后续会发生变化的变量。
//如果一定要引用循环变量怎么办？方法是再创建一个函数，用该函数的参数绑定循环变量当前的值，
//无论该循环变量后续如何更改，已绑定到函数参数的值不变

function count() {
    var arr = [];
    for (var i=1; i<=3; i++) {
        arr.push((function (n) {
            return function () {
                return n * n;
            }
        })(i));
    }
    return arr;
}
var results = count();
var f1 = results[0];
var f2 = results[1];
var f3 = results[2];
f1(); // 1
f2(); // 4
f3(); // 9

//这里用了一个“创建一个匿名函数并立刻执行”的语法：
(function (x) {
    return x * x;
})(3); // 9