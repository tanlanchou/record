/// <reference path="node_modules/reflect-metadata/Reflect.d.ts" />

let key = "myKey";

class a {
  constructor() {}
}

Reflect.defineMetadata(key, { flag: 1 }, a);

console.log(Reflect.getOwnMetadata(key, a));
