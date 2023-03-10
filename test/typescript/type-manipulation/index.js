let o2 = { x: 1, y: "2" };
function a(arg) {
    return o2[arg];
}
a("x");
function a1(arg) {
    return arg;
}
a1("x");
let o = "";
let n;
function a3() {
    return "";
}
function a4() {
    return { a: 1 };
}
const T3 = {
    a: false,
    b: false,
};
class mobileFunc {
}
class newPhone extends mobileFunc {
    sms(number, text) {
        //...
    }
    call(number) {
        //...
    }
    videoCall(number) {
        //..
    }
}
class oldPhone extends mobileFunc {
    sms(number, text) {
        //...
    }
    call(number) {
        //...
    }
}
class baseFunc {
    constructor() { }
    sms(number, text) {
        //text处理，验证
        //T.send(number, text);
    }
    call(number) { }
}
function A(arg) {
    return arg.length;
}
let O = {
    a: 1,
    b: 2,
    c: 3,
};
function F() {
    return "";
}
function F1() {
    return {
        name: "tommy",
        age: "99",
    };
}
function F2(arg) {
    return arg();
}
function F3() {
    return "F3";
}
F2(F3);
class C {
    getName() { }
    getAge() {
        return 1;
    }
}
let L = "getName";
// type MappedTypeWithNewProperties<Type> = {
//   [Properties in keyof Type as NewKeyType]: Type[Properties]
// }
let L1 = "1";
let L2 = L1;
class C4 {
    constructor() {
        this.name = "tommy";
    }
}
class C5 {
    constructor() {
        this.name = "lisa";
        this.age = 99;
    }
}
let L3 = "Hello word";
let L4 = {
    getName: () => "",
    getAge: () => 99,
    getLocation: () => "",
};
console.log(L4);
