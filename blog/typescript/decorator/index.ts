// import "reflect-metadata";

// function logger(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//   const original = descriptor.value;

//   descriptor.value = function (...args) {
//     console.log('params: ', ...args);
//     const result = original.call(this, ...args);
//     console.log('result: ', result);
//     return result;
//   }
// }

// class C {
//   @logger
//   add(x: number, y:number ) {
//     return x + y;
//   }
// }

// const c = new C();
// c.add(1, 2);

// { new(...args) } 构造函数
// function classDecorator<T extends { new (...args: any[]) }>(constructor: T) {
//   return class extends constructor {
//     title = "classDecorator title";
//     toString() {
//       //...
//     }
//   };
// }

// function myReadonly(target: Object, key: string) {
//   Reflect.defineProperty(target, key, {
//     set(v) {
//       if (this.key === undefined) {
//         this.key = v;
//       } else {
//         throw new Error(`${key} is readonly`);
//       }
//     },
//   });
// }

// class C {
//   @myReadonly
//   foo: string = "a";
// }

// let myC = new C();
// myC.foo = "aaaaaaa";
// console.log(myC.foo);

// let myC = new C();
// myC.x = 1;
// console.log(myC.myX());
// console.log(myC);

// function log(value: string): any {
//   console.log(`log function ${value}`);
//   return function () {
//     //省略参数，因为我不需要
//     console.log(`log return function ${value}`);
//   };
// }

// @log("类")
// @log("类1")
// @log("类2")
// class testLog {
//   @log("属性")
//   @log("属性1")
//   @log("属性2")
//   B: number;

//   @log("静态属性")
//   @log("静态属性1")
//   static C: number;

//   @log("方法")
//   @log("方法1")
//   A() {}

//   @log("静态方法")
//   @log("静态方法1")
//   static D() {}

//   F(@log("参数") i: number, @log("参数1") y: number) {}

//   @log("访问器")
//   @log("访问器1")
//   set X(arg) {}
// }

// function immutable(
//   target: any,
//   propertyKey: string,
//   descriptor: PropertyDescriptor
// ) {
//   const original = descriptor.set;

//   descriptor.set = function (value: any) {
//     console.log(`desc:${JSON.stringify(this._point)}`);
//     let result = original.call(this, { ...value });
//     console.log(`desc:${JSON.stringify(this._point)}`);
//     console.log(result);
//     return result;
//   };
// }

// class C {
//   private _point = { x: 0, y: 0 };

//   @immutable
//   set point(value: { x: number; y: number }) {
//     this._point = value;
//   }

//   get point() {
//     return this._point;
//   }
// }

// const c = new C();
// console.log(c.point);
// const point = { x: 1, y: 1 };
// c.point = point;
// console.log(c.point);
// console.log(c.point === point);

// 1. 属性 > 方法 > 参数 > 访问器 > 静态属性 > 静态方法 > 类
// 2. 装饰器只在解释执行时应用一次
// 3. 所以需要在方法或者类装饰器解析的时候，重载为必包，先验证参数，后调用
// 4. 需要有变量保存验证的函数
// 5. 需要工厂方法，或者抽象类去写清楚各种不同的验证

//验证类型
type Validator = (x: any) => boolean;

//验证方法集合
let validatorMap = new Map<string, Validator>();

//属性验证装饰器工厂
function validatorFactiory(vaildator: Validator) {
  return function (target, key, index) {
    let keyStr = key as string;
    let t = validatorMap[keyStr] ?? [];
    t[index] = vaildator;
    validatorMap.set(key, t);
  };
}

//暂时不需要参数
//
function valid(target: any, key: string, descriptor: PropertyDescriptor) {

  //保存原有方法
  const original = descriptor.value;

  descriptor.value = function (...args) {

    //验证参数
    for (let i in args) {
      let validtors = validatorMap.get(key);
      if (validtors !== undefined) {
        for (let i = 0; i < validtors.length; i++) {
          if(!validtors[i](args[i])) {
            throw new Error(`${key} 值为 ${args[i]}, 验证失败`);
          }
        }
      }
    }

    original.call(this, { ...args });
  };
}

const validString = validatorFactiory((v: any) => {
  return typeof v === "string";
});
const validNumber = validatorFactiory((v: any) => {
  return Number.isInteger(v);
});

class C {
  @valid
  a(@validString a) {
    return a;
  }
}

let myC = new C();
myC.a(1);
