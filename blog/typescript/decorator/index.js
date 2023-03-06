// import "reflect-metadata";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
//验证方法集合
let validatorMap = new Map();
//属性验证装饰器工厂
function validatorFactiory(vaildator) {
    return function (target, key, index) {
        let keyStr = key;
        let t = validatorMap[keyStr] ?? [];
        t[index] = vaildator;
        validatorMap.set(key, t);
    };
}
//暂时不需要参数
//
function valid(target, key, descriptor) {
    //保存原有方法
    const original = descriptor.value;
    descriptor.value = function (...args) {
        //验证参数
        for (let i in args) {
            let validtors = validatorMap.get(key);
            if (validtors !== undefined) {
                for (let i = 0; i < validtors.length; i++) {
                    if (!validtors[i](args[i])) {
                        throw new Error(`${key} 值为 ${args[i]}, 验证失败`);
                    }
                }
            }
        }
        original.call(this, { ...args });
    };
}
const validString = validatorFactiory((v) => {
    return typeof v === "string";
});
const validNumber = validatorFactiory((v) => {
    return Number.isInteger(v);
});
class C {
    a(a) {
        return a;
    }
}
__decorate([
    valid,
    __param(0, validString),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], C.prototype, "a", null);
let myC = new C();
myC.a(1);
