abstract class commonMobileFunc {
  abstract call(ph: number): void;
  abstract sms(ph: number, text: string): void;
}

class oldMobile extends commonMobileFunc {
  call(ph: number): void {}
  sms(ph: number, text: string): void {}
}

class newMobile extends commonMobileFunc {
  call(ph: number): void {}
  sms(ph: number, text: string): void {}
  videoCall(ph: number) {}
}

// class exec<T> {

//   model: T;
//   constructor(arg: T) {
//     this.model = new T();
//   }

//   sms(ph: number, text: string) {
//     this.model.sms(ph, text);
//   }
// }

// 抽象出一个通用的手机功能类型
// 新手机 call sms videoCall
// 旧手机 call sms
// 如果我想实例化对象，可以通过工厂方法，依赖注入等等方式
// 这次想通过泛型的方法去实例化，但是报错了。

interface I1 {
  new (): commonMobileFunc;
}

interface T2<T> {
  new (): T;
}

class C5<T> implements T2<T> {
    constructor(arg: T) {
        
    }
}

class C2<T> {
  model: commonMobileFunc;
  constructor(arg: I1) {
    this.model = new arg();
  }
}

interface T3<T> {
  new (): T;
}

interface T4 {
  sms(ph: number, text: string): void;
  call(ph: number): void;
}

class C3<T> implements T4 {
  model: T;
  constructor(arg: T3<T>) {
    this.model = new arg();
  }

  sms(ph: number, text: string): void {
    //..
  }

  call(ph: number): void {}
}

class C4 {
  constructor(arg: { new (): commonMobileFunc }) {}
}

function F1<T>(arg: { new():T }) {
    return new arg();
}
