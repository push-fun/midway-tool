"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Id = void 0;
const decorator_1 = require("@midwayjs/decorator");
const nanoid_1 = require("nanoid");
let Id = class Id {
    /**
     * 生成雪花算法id
     * ```ts
     * const id = this.generateId.id // 6783427573234413569
     * ```
     */
    get ID() {
        if (this.ctx.id) {
            return this.ctx.id;
        }
        else {
            this.logger.warn('生成雪花算法ID需要引用PUSH.FUN上层框架!');
            return this.SetUUID();
        }
    }
    /**
     * 生成随机唯一id
     * @param length 生成id长度 default[21]
     */
    UUID(length) {
        if (!length)
            length = 21;
        let id = nanoid_1.nanoid(length);
        return id;
    }
    /**
     * 生成随机id 可指定范围生成
     * ```ts
     * // 例1 默认范围：1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ
     * this.tool.setId(6)
     * ```
     * ```ts
     * // 例2
     * this.tool.setId(6, '123456abcdef') // AB2edf
     * ```
     * @param length 生成id长度 default[21]
     * @param alphabet 指定范围生成id的字符串
     */
    SetUUID(length, alphabet) {
        if (!length)
            length = 21;
        if (!alphabet)
            alphabet = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const nanoid = nanoid_1.customAlphabet(alphabet, length);
        return nanoid();
    }
};
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", Object)
], Id.prototype, "ctx", void 0);
__decorate([
    decorator_1.Logger(),
    __metadata("design:type", Object)
], Id.prototype, "logger", void 0);
Id = __decorate([
    decorator_1.Provide()
], Id);
exports.Id = Id;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWQuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL1F1bi9VbmNsdXR0ZXIvbWlkd2F5LWxlcm5hL3BhY2thZ2VzL21pZHdheS10b29sL3NyYy8iLCJzb3VyY2VzIjpbInNlcnZpY2UvaWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsbURBQThEO0FBRTlELG1DQUErQztBQUcvQyxJQUFhLEVBQUUsR0FBZixNQUFhLEVBQUU7SUFRWDs7Ozs7T0FLRztJQUNILElBQUksRUFBRTtRQUNGLElBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUU7WUFDWixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFBO1NBQ3JCO2FBQU07WUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxDQUFBO1lBQzdDLE9BQU8sSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO1NBQ3hCO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRztJQUNJLElBQUksQ0FBQyxNQUFlO1FBQ3ZCLElBQUcsQ0FBQyxNQUFNO1lBQUUsTUFBTSxHQUFHLEVBQUUsQ0FBQTtRQUN2QixJQUFJLEVBQUUsR0FBVyxlQUFNLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDL0IsT0FBTyxFQUFFLENBQUE7SUFDYixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0ksT0FBTyxDQUFDLE1BQWUsRUFBRSxRQUFpQjtRQUM3QyxJQUFHLENBQUMsTUFBTTtZQUFFLE1BQU0sR0FBRyxFQUFFLENBQUE7UUFDdkIsSUFBRyxDQUFDLFFBQVE7WUFBRSxRQUFRLEdBQUcsZ0VBQWdFLENBQUE7UUFDekYsTUFBTSxNQUFNLEdBQVEsdUJBQWMsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUE7UUFDcEQsT0FBTyxNQUFNLEVBQUUsQ0FBQTtJQUNuQixDQUFDO0NBQ0osQ0FBQTtBQWpERztJQURDLGtCQUFNLEVBQUU7OytCQUNEO0FBR1I7SUFEQyxrQkFBTSxFQUFFOztrQ0FDTTtBQU5OLEVBQUU7SUFEZCxtQkFBTyxFQUFFO0dBQ0csRUFBRSxDQW9EZDtBQXBEWSxnQkFBRSJ9