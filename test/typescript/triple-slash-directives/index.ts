/// <reference types="reflect-metadata" />

let key = "myKey";

class a {
  constructor() {}
}

Reflect.defineMetadata(key, { flag: 1 }, a);

console.log(Reflect.getOwnMetadata(key, a));
