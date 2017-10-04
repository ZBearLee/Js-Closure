var n = 999;
　　function f1() {
    alert(n);
　　}
　　f1(); // 999
//函数内部可以直接读取全局变量



function f1() {
    var n = 999;
}
alert(n); // error
//函数外部自然无法读取函数内的局部变量



　function f1() {
    n = 999;
}
f1();
alert(n); // 999
//函数内部声明变量的时候，一定要使用var命令。如果不用的话，实际上声明了一个全局变量！


　function f1() {
    n = 999;
    function f2() {
        alert(n); // 999
    }
}
//函数f2就被包括在函数f1内部，这时f1内部的所有局部变量，对f2都是可见的。
//但是反过来就不行，f2内部的局部变量，对f1 就是不可见的
//这就是Javascript语言特有的“链式作用域”结构（chain scope）


function f1() {
    n = 999;
    function f2() {
        alert(n);
    }
    return f2;
}
var result = f1();
result(); // 999
//把f2作为返回值，就可以在f1外部读取它的内部变量了



　function f1() {
    var n = 999;
    nAdd = function () { n += 1 }
    function f2() {
        alert(n);
    }
    return f2;
}
var result = f1();
result(); // 999
nAdd();
result(); // 1000
//result实际上就是闭包f2函数。它一共运行了两次，第一次的值是999，第二次的值是1000
//函数f1中的局部变量n一直保存在内存中，并没有在f1调用后被自动清除
//原因就在于f1是f2的父函数，而f2被赋给了一个全局变量，这导致f2始终在内存中，而f2的存在依赖于f1，
//因此f1也始终在内存中，不会在调用结束后，被垃圾回收机制（garbage collection）回收。



//　　var name = "The Window";   
　　var object = {
    name: "My Object",
    getNameFunc: function () {
        return function () {
            return this.name;
        };
    }
};
alert(object.getNameFunc()());  //The Window




function outerFun() {
    var a = 0;
    function innerFun() {
        a++;
        alert(a);
    }
}
innerFun()
//innerFun()的作用域在outerFun()内部,所在outerFun()外部调用它是错误的



function outerFun()
{
 var a=0;
 function innerFun()
 {
  a++;
  alert(a);
 }
 return innerFun;  //注意这里
}
var obj=outerFun();
obj();  //结果为1
obj();  //结果为2
var obj2=outerFun();
obj2();  //结果为1
obj2();  //结果为2



function outerFun()
{
 var a =0;
 alert(a);  
}
var a=4;
outerFun();
alert(a);
//结果是 0,4 .  因为在函数内部使用了var关键字 维护a的作用域在outFun()内部



function outerFun()
{
 //没有var 
 a =0;
 alert(a);  
}
var a=4;
outerFun();
alert(a);
//结果为 0,0 ,作用域链是描述一种路径的术语,沿着该路径可以确定变量的值 
//当执行a=0时,因为没有使用var关键字,因此赋值操作会沿着作用域链到var a=4;  并改变其值.