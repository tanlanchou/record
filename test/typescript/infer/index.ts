type Blank = " " | "\n" | "\t";
type MyTrimLeft<S extends string> = S extends `${Blank}${infer R}`
  ? MyTrimLeft<R>
  : S;
let o: MyTrimLeft<"test">;
o = "test";

type F<T> = (...arg: any) => T;
type ReturnType1<T> = T extends F<infer R> ? R : any;

type T1 = F<string>;
type T10 = ReturnType1<string>;
type T11 = ReturnType1<() => string>;

type T12<T> = (arg: T) => string;
type T13<T> = T extends T12<infer R> ? R : any;
type T14 = T13<(arg: number) => string>;

type T15<T> = T extends (a: infer P, b: infer P) => void ? P : boolean;
type T16 = T15<() => string>; //any
type T17 = T15<(a: string, b: number) => void>; // string & number
type User = { name: string; age: number };
type OtherInfo = { sex: string };
type T7 = T15<(a: User, b: OtherInfo) => void>;
let L1: T7 = {
  name: "tommy",
  age: 99,
  sex: "male",
};

type getIntersection<T> = T extends (a: infer P, b: infer P) => void
  ? P
  : never;
type Intersection = getIntersection<(a: string, b: number) => void>; // string & number

type T18 = string & number;
type T19 = string | number;
type T20 = { a: string; b: number } & { a: string; c: number };
let L2: T20 = { a: "o", b: 1, c: 1 };

type T21<T> = T extends ((a: infer P) => void) ? P : any;
type T22 = T21<(a: string) => void>
