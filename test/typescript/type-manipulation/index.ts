type Point = { x: number; y: string };

let o2: Point = { x: 1, y: "2" };
function a<T extends keyof Point>(arg: T): Point[T] {
  return o2[arg];
}
a("x");

type P = keyof Point;
function a1(arg: P) {
  return arg;
}
a1("x");

let o = "";
let n: typeof o;

function a3() {
  return "";
}

function a4() {
  return { a: 1 };
}

type n1 = ReturnType<typeof a3>;
type n2 = ReturnType<typeof a4>;

//索引
type User = { name: string; age: number };
type Age = User["age"];
type T1 = User[keyof User];
type T2 = keyof User;

type OptionsFlags<T> = {
  [Property in keyof T]: boolean;
};

const T3: OptionsFlags<{ a: string; b: number }> = {
  a: false,
  b: false,
};

interface IMoblieFunc {
  sms(number, text);
  call(number);
}

abstract class mobileFunc implements IMoblieFunc {
  abstract sms(number, text);
  abstract call(number);
  //... other func
}

class newPhone extends mobileFunc {
  sms(number, text) {
    //...
  }

  call(number: any) {
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

  call(number: any) {
    //...
  }
}

class baseFunc<T> {
  constructor() {}

  sms(number, text) {
    //text处理，验证
    //T.send(number, text);
  }

  call(number) {}
}

function A<T extends string>(arg: T) {
  return arg.length;
}

interface ITree {
  value: Object;
  parent: ITree;
  children: ITree[];
}

type A1 = { [x: string]: ITree };
type A2 = keyof A1;
let O = {
  a: 1,
  b: 2,
  c: 3,
};
type A3 = typeof O;
type A4 = typeof O["a"];

function F(): string {
  return "";
}

function F1() {
  return {
    name: "tommy",
    age: "99",
  };
}

type T3 = typeof F;
type T4 = typeof F1;

function F2<T extends T3>(arg: T) {
  return arg();
}

function F3() {
  return "F3";
}

F2(F3);

type T5 = ReturnType<typeof F>;
type T6 = ReturnType<typeof F1>;

type T7 = {
  getName(): void;
  getAge(): number;
};

class C implements T7 {
  getName(): void {}
  getAge(): number {
    return 1;
  }
}

type T8 = C extends T7 ? string : number;

type T9 = keyof T7;
let L: T9 = "getName";

type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
};

type CreateMutable1<Type> = {
  +readonly [P in keyof Type]: P;
};

type LockedAccount = {
  readonly id: string;
  name: string;
};

type T10 = CreateMutable1<LockedAccount>;
type T11 = CreateMutable<LockedAccount>;

type T12 = {
  name: string;
  age: number;
  sex: string;
};

type T14 = {
  name1: string;
  age1: number;
  sex1: string;
};

type T13 = Exclude<T12, T14>;

type T15 = "a" | "b" | "c";
type T16 = "a" | "d";

type T17 = Exclude<T15, T16>;

// type MappedTypeWithNewProperties<Type> = {
//   [Properties in keyof Type as NewKeyType]: Type[Properties]
// }

let L1 = "1";
let L2 = L1 as unknown as Number;

class C4 {
  name: string = "tommy";
}

class C5 {
  name: string = "lisa";
  age: number = 99;
}

// type MappedTypeWithNewProperties<Type> = {
//   [Properties in keyof Type as C4]: Type[Properties]
// }

type T20 = Capitalize<"hello word">;
let L3: T20 = "Hello word";

type Getters<T> = {
  [P in keyof T as `get${Capitalize<string & P>}`]: () => T[P];
};

interface Person {
  name: string;
  age: number;
  location: string;
}

type LazyPerson = Getters<Person>;

let L4: LazyPerson = {
  getName: () => "",
  getAge: () => 99,
  getLocation: () => "",
};

console.log(L4);

type Fruits = "apple" | "banana" | 'peach' | 'orange';
type DislikeFruits = "apple" | "banana";

type T21 = "apple" extends "apple" | "banana" ? never : "apple";
type T22 = "banana" extends "apple" | "banana" ? never : "banana";
type T23 = "peach" extends "apple" | "banana" ? never : "peach";
type T24 = "orange" extends "apple" | "banana" ? never : "orange";


type T25 = Extract<Fruits, DislikeFruits>;

interface IPerson {
  name: string,
  age: number,
  sex: 0 | 1,
}

interface IMan {
  name: string,
  age: number,
}

type T26 = Exclude<IPerson, IMan>;
type T27 = Extract<IPerson, IMan>;

// 原始类型
interface TState {
	name: string;
	age: number;
	like: string[];
}
// 如果我只想要name和age怎么办，最粗暴的就是直接再定义一个（我之前就是这么搞得）
interface TSingleState {
	name: string;
	age: number;
}
// 这样的弊端是什么？就是在Tstate发生改变的时候，TSingleState并不会跟着一起改变，所以应该这么写
interface TSingleState extends Pick<TState, "name" | "age"> {};

type T28 = Pick<TState, "name" | "age">;