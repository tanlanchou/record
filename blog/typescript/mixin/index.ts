import { myTestA, myTestB } from "./other";

class a {
  name: "aaaa";
  sayName() {
    console.log(this.name);
  }
}

class b extends a {
  sayHi() {
    console.log(this.name + " hello");
  }

  sayName(): void {
    console.log("b say name" + this.name);
  }
}

console.log(myTestB);