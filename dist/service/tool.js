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
exports.crypto = exports.moment = exports.time = exports.is = exports.array = exports.string = exports.number = exports.Tool = void 0;
const decorator_1 = require("@midwayjs/decorator");
const mathjs_1 = require("mathjs");
const moment = require("moment");
exports.moment = moment;
const cry = require("crypto");
const NodeRSA = require("node-rsa");
const CryptoJS = require("crypto-js");
// create a mathjs instance with configuration
const config = {
    epsilon: 1e-12,
    matrix: 'Matrix',
    number: 'number',
    precision: 64,
    predictable: false,
    randomSeed: null
};
const math = mathjs_1.create(mathjs_1.all, config);
function print(value) {
    let precision = 14;
    return math.format(value, { precision });
}
/**
 * <数值有关工具方法>
 * ```ts
 * // 引用组件
 * import { number } from '@push.fun/midway-tool'
 * // 使用方法
 * let n = number.  // 输入number.(点)智能联想提示！
 * ```
 * @key $count() 公式混合运算方法 + - * / (支持浮点数)
 * @key $add() 加法计算（支持大数）
 * @key $subtract() 减法计算（支持大数）
 * @key $multiply() 乘法计算（支持大数）
 * @key $ceil() 向上取整
 * @key $floor() 向下取整
 * @key $round() 四舍五入
 * @key $big() 大数（配合取整和四舍五入使用）
 * @key toFixedNum() 保留指定位小数 同时不四舍五入
 */
const number = {
    /**
     * 公式混合运算方法 + - * / (支持浮点数)
     * ```ts
     * // 例1
     * let n = number.$count(0.1 + 0.2) // 0.3
     * ```
     * @param num 计算公式
     */
    $count(num) {
        let ans = math.evaluate(num);
        return print(ans);
    },
    /**
     * 加法计算（支持大数）
     * ```ts
     * let n = number.$add(9007199254740992, 1) // 9007199254740993
     * ```
     * @param a
     * @param b
     */
    $add(a, b) {
        let ans = math.add(math.bignumber(a), math.bignumber(b));
        return print(ans);
    },
    /**
     * 减法计算（支持大数）
     * ```ts
     * let n = number.$add(9007199254740992, 1) // 9007199254740991
     * ```
     * @param a
     * @param b
     */
    $subtract(a, b) {
        return print(math.subtract(math.bignumber(a), math.bignumber(b)));
    },
    /**
     * 乘法计算（支持大数）
     * @param a
     * @param b
     */
    $multiply(a, b) {
        return print(math.multiply(math.bignumber(a), math.bignumber(b)));
    },
    /**
     * 向上取整
     * @param num
     */
    $ceil(num) {
        return print(math.ceil(num));
    },
    /**
     * 向下取整
     * @param num
     */
    $floor(num) {
        return print(math.floor(num));
    },
    /**
     * 四舍五入
     * @param num
     */
    $round(num) {
        return print(math.round(num));
    },
    /**
     * 大数（配合取整和四舍五入使用）
     * @param num
     */
    $big(num) {
        return math.bignumber(num);
    },
    /**
     * 保留指定位小数 同时不四舍五入
     * ```ts
     * // 例1
     * let n = number.toFixedNum(129.226) // 129.22
     * // 例2
     * let n = number.toFixedNum(129.226, 3) // 129.226
     * ```
     * @param number
     * @param num 默认值为2
     */
    toFixedNum(number, num) {
        const type = typeof (number);
        if (!num)
            num = 2;
        let number_arr = [];
        if (type === 'number') {
            const str = number.toString();
            number_arr = str.split('.');
        }
        else if (type === 'string') {
            number_arr = number.split('.');
        }
        if (number_arr.length > 1) {
            number = number_arr[0] + '.' + number_arr[1].substr(0, num);
        }
        return parseFloat(number);
    },
};
exports.number = number;
/**
 * <字符串有关工具方法>
 * ```ts
 * // 引用组件
 * import { string } from '@push.fun/midway-tool'
 * // 使用方法
 * let s = string.  // 输入number.(点)智能联想提示！
 * ```
 * @key containsWhitespace() 检查是否给定的字符串中有空格
 * @key compactWhitespace() 压缩字符串中的空白 (多个空格转换为单个空格)
 * @key byteSize() 返回字节单位字符串长度
 * @key ToDBC() 半角转换为全角函数
 * @key ToCDB() 全角转换为半角函数
 * @key parseClassName() 获取class类名称&转换为小写
 * @key parseFunctionName() 打印函数名称
 * @key getUrlParam() 获取URL上的参数
 */
const string = {
    /**
     * 检查是否给定的字符串中有空格
     * ```ts
     * // 例1
     * let str_a = 'abcd  efgh izk'
     * let str_b = 'abcdefghizk'
     * let s1 = string.containsWhitespace(str_a) // true
     * let s2 = string.containsWhitespace(str_b) // false
     * ```
     * @param str
     */
    containsWhitespace(str) {
        return /\s/.test(str);
    },
    /**
     * 压缩字符串中的空白 (多个空格转换为单个空格)
     * @param str
     */
    compactWhitespace(str) {
        return str.replace(/\s{2,}/g, ' ');
    },
    /**
     * 返回字节单位字符串长度
     * @param str
     */
    byteSize(str) {
        return new Blob([str]).size;
    },
    /**
     * 半角转换为全角函数
     * @param str
     */
    ToDBC(str) {
        var result = '';
        for (var i = 0; i < str.length; i++) {
            let code = str.charCodeAt(i);
            if (code >= 33 && code <= 126) {
                result += String.fromCharCode(str.charCodeAt(i) + 65248);
            }
            else if (code == 32) {
                result += String.fromCharCode(str.charCodeAt(i) + 12288 - 32);
            }
            else {
                result += str.charAt(i);
            }
        }
        return result;
    },
    /**
     * 全角转换为半角函数
     * @param str
     */
    ToCDB(str) {
        var result = '';
        for (var i = 0; i < str.length; i++) {
            let code = str.charCodeAt(i);
            if (code >= 65281 && code <= 65374) {
                result += String.fromCharCode(str.charCodeAt(i) - 65248);
            }
            else if (code == 12288) {
                result += String.fromCharCode(str.charCodeAt(i) - 12288 + 32);
            }
            else {
                result += str.charAt(i);
            }
        }
        return result;
    },
    /**
     * 获取class类名称&转换为小写
     * @param entity Class实体
     */
    parseClassName(entity) {
        let className = entity.toString();
        className = className.substr('class '.length);
        className = className.replace(/\s+/g, "");
        return className.substr(0, className.indexOf('{')).toLowerCase();
    },
    /**
     * 打印函数名称
     * @param fn
     */
    parseFunctionName(fn) {
        return (console.debug(fn.name), fn);
    },
    /**
     * 获取URL上的参数
     * @param param 参数名
     */
    getUrlParam(param) {
        const result = window.location.href.match(new RegExp('(\\?|&)' + param + '(\\[\\])?=([^&#]*)'));
        return result ? result[3] : undefined;
    }
};
exports.string = string;
/**
 * <数组有关工具方法>
 */
const array = {
    /**
     * 移除数组中的假值
     * @param arr
     */
    compact(arr) {
        return arr.filter(Boolean);
    },
    /**
     * 将数字转为数字数组 (移除符号 - )
     * @param n
     */
    digitize(n) {
        return [...`${Math.abs(n)}`].map(i => parseInt(i));
    },
    /**
     * 如果提供的值不是数组 则将它转为数组
     * @param val
     */
    castArray(val) {
        return (Array.isArray(val) ? val : [val]);
    },
    /**
     * 对数组中的对象进行排序
     * ```ts
     * // 调用方法：
     * const arr = [{"id":2,"name":"2"},{"id":1,"name":"1"}]
     * arr.sort(keysort('name', 'desc'));
     * ```
     * @param key
     * @param desc
     */
    keysort(key, desc) {
        return function (a, b) {
            return desc ? (a[key] < b[key]) : (a[key] > b[key]);
        };
    },
    /**
     * 查询指定key 返回数组内index下标
     * ```ts
     * let arr = [{ name: 'lee' }, { name: 'wang' }]
     * let index = array.arrIndex(arr, 'name', 'wang')
     * console.log(index) // 1
     * ```
     * @param {数组} arr 查询数组对象
     * @param {键} key 查询的键
     * @param {值} value 查询的值
     */
    async arrIndex(arr, key, value) {
        return arr.findIndex((data) => {
            return data[key] === value;
        });
    },
    /**
     * 多条件查询数组对象 直接返回结果
     * ```ts
     * let arr = [{name: 'lee', age: 12}, {name: 'wang', age: 20}]
     * let get = array.arrFind(arr, {name: 'wang', age: 20})
     * console.log(get) // {name: 'wang', age: 20}
     * ```
     * @param {数组对象} arr 查询数组对象
     * @param {值} value { id: 22, name: 'lee' }
     */
    async arrFind(arr, value) {
        let result = arr.filter(item => {
            for (let key in value) {
                if (value.hasOwnProperty(key) && (item[key] !== value[key])) {
                    return false;
                }
            }
            return true;
        });
        return result;
    },
    /**
     * 数组A和数组B合并 返回合并后数组
     * @param {原数组} thisArr 需要合并的数组A
     * @param {合并数组} argArr 被合并的数组B
     */
    async arrUnite(thisArr, argArr) {
        return thisArr.push.apply(thisArr, argArr);
    },
    /**
     * 数组数字排序
     * @param {*} arr
     */
    ArrayRank(arr) {
        for (var i = 0; i < arr.length; i++) {
            arr[i] = Number(arr[i]);
            for (var j = i + 1; j < arr.length; j++) {
                arr[j] = Number(arr[j]);
                if (arr[i] > arr[j]) {
                    var tmp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = tmp;
                }
            }
        }
        return arr;
    },
    /**
     * 数组根据数组内对象属性排序
     * @param {*} arr
     * @param {*} key
     * @param {*} rev 排序规则 默认ASC false为DESC
     */
    ArrayRankObj(arr, key, rev) {
        // function sortId(a, b) {
        //     return Number(a[key]) - Number(b[key])
        // }
        function sortId(attr, rev) {
            //第二个参数没有传递 默认升序排列
            if (rev == undefined) {
                rev = 1;
            }
            else {
                rev = (rev) ? 1 : -1;
            }
            return function (a, b) {
                a = a[attr];
                b = b[attr];
                if (a < b) {
                    return rev * -1;
                }
                if (a > b) {
                    return rev * 1;
                }
                return 0;
            };
        }
        arr.sort(sortId(key, rev));
        return arr;
    }
};
exports.array = array;
/**
 * <判断有关工具方法>
 */
const is = {
    /**
     * <判断是否为null或者undefined>
     * @param data
     */
    null(data) {
        if (['', null, undefined, 'undefined'].includes(data)) {
            return true;
        }
        else {
            return false;
        }
    },
    /**
     * <判断是否是 Float 浮点>
     * @param num
     */
    Float(num) {
        return num !== parseInt(num);
    },
    /**
     * <判断是否为数字>
     * @param {*} num
     */
    Number(num) {
        num = num - 0;
        return num === +num;
    },
    /**
     * <判断是否为布尔值>
     * @param {*} data
     */
    Boolean(data) {
        return typeof data === 'boolean';
    },
    /**
     * <判断是否为字符串>
     * @param {*} str
     */
    String(str) {
        return typeof str === 'string';
    },
    /**
     * <判断是否为undefined>
     * @param {*} data
     */
    Undefined(data) {
        return typeof data === 'undefined';
    },
    /**
     * 判断是否为数组
     * @param {*} arr
     */
    Array(arr) {
        return Array.isArray(arr);
    },
    /**
     * <判断是否为对象 （非数组）>
     * @param {*} obj
     */
    Object(obj) {
        return typeof obj === 'object' && !this.Array(obj);
    },
    /**
     * <判断是否为函数>
     * @param {*} fn
     */
    Function(fn) {
        return typeof fn === 'function';
    },
    /**
     * <判断是否为正确金额>
     * ```ts
     * console.log(is.Price('12.37')); // true
     * console.log(is.Price('12&37')); // false
     * ```
     * @param {*} num
     */
    Price(num) {
        let reg = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
        return reg.test(num);
    },
    /**
     * <判断数组是否有重复值>
     * @param arr 需要判断的数组
     * @param strict： 严格模式true，非严格false
     * @returns {boolean} ture: 有重复值  false: 没有重复值
     */
    ArrayRepeat(arr, strict = false) {
        var hash = {};
        for (var i in arr) {
            if (strict === true) {
                if (hash[arr[i]] && hash[arr[i]] === arr[i]) {
                    return true;
                }
                hash[arr[i]] = arr[i];
            }
            else {
                if (hash[arr[i]]) {
                    return true;
                }
                hash[arr[i]] = true;
            }
        }
        return false;
    },
    /**
     * <检测数据是否满足指定格式>
     * @param str 需要检测的数据
     * @example
     * ```ts
     * is.test('13304162222', 'mobile') // true
     * ------------------------
     * ```
     * @param type 检测类型
     * @example
     * ```ts
     * 'mobile' 手机号码
     * 'tel' 座机电话
     * 'card' 身份证
     * 'username' 用户名校验，4到16位（字母，数字，下划线，减号）
     * 'password' 密码强度校验，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
     * 'postal' 邮政编码
     * 'QQ' QQ号码
     * 'wx' 微信号(wx)，6至20位，以字母开头，字母，数字，减号，下划线
     * 'email' email邮箱
     * 'URL' URL网址(url,支持端口和"?+参数"和"#+参数)
     * 'IPv4' IP地址 ip-v4[:端口]
     * 'IPv6' IP地址 ip-v6[:端口]
     * 'date' 日期 2021-04-05
     * 'time12' 时间 12小时制时间（hh:mm:ss）
     * 'time24' 时间 24小时制时间（HH:mm:ss）
     * 'dateTime' 日期+时间 2021-04-05 12:22:22
     * 'number' 数字
     * 'english' 英文
     * 'MaxEnglish' 大写英文字母
     * 'MinEnglish' 小写英文字母组成
     * 'chinese' 中文
     * 'HTML' HTML标记
     * 'numberPlate' 车牌号(新能源+非新能源)
     * 'credit' 统一社会信用代码(宽松匹配)(15位/18位/20位数字/字母)
     * 'base64' 是否为base64格式字符串
     * 'base64Str' base64格式（data:...;base64开头）严格模式
     * 'md5' md5格式(32位)
     * ------------------------
     * ```
     */
    test(str, type) {
        // 正则匹配
        const rule = {
            // 手机号码
            mobile: /^(?:(?:\+|00)86)?1\d{10}$/,
            // 座机电话
            tel: /^(?:(?:\d{3}-)?\d{8}|^(?:\d{4}-)?\d{7,8})(?:-\d+)?$/,
            // 身份证
            card: /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0[1-9]|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/,
            // 用户名校验，4到16位（字母，数字，下划线，减号）
            username: /^[a-zA-Z0-9_-]{4,16}$/,
            // 密码强度校验，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
            password: /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/,
            // 邮政编码
            postal: /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/,
            // QQ号码
            QQ: /^[1-9][0-9]{4,10}$/,
            // 微信号(wx)，6至20位，以字母开头，字母，数字，减号，下划线
            wx: /^[a-zA-Z][-_a-zA-Z0-9]{5,19}$/,
            // email邮箱
            email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            // URL网址(url,支持端口和"?+参数"和"#+参数)
            URL: /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/,
            // IP地址 ip-v4[:端口]
            IPv4: /^((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]).){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])(?::(?:[0-9]|[1-9][0-9]{1,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]))?$/,
            // IP地址 ip-v6[:端口]
            IPv6: /^(?:(?:(?:[0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))|\[(?:(?:(?:[0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))\](?::(?:[0-9]|[1-9][0-9]{1,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]))?$/i,
            // 日期 2021-04-05
            date: /^\d{4}(-)(1[0-2]|0?\d)\1([0-2]\d|\d|30|31)$/,
            // 时间 12小时制时间（hh:mm:ss）
            time12: /^(?:1[0-2]|0?[1-9]):[0-5]\d:[0-5]\d$/,
            // 时间 24小时制时间（HH:mm:ss）
            time24: /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/,
            // 日期+时间 2021-04-05 12:22:22
            dateTime: /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/,
            // 数字
            number: /^\d{1,}$/,
            // 英文
            english: /^[a-zA-Z]+$/,
            // 大写英文字母
            MaxEnglish: /^[A-Z]+$/,
            // 小写英文字母组成
            MinEnglish: /^[a-z]+$/,
            // 中文
            chinese: /^(?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])+$/,
            // HTML标记
            HTML: /<(\w+)[^>]*>(.*?<\/\1>)?/,
            // 车牌号(新能源+非新能源)
            numberPlate: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4,5}[A-HJ-NP-Z0-9挂学警港澳]$/,
            // 统一社会信用代码(宽松匹配)(15位/18位/20位数字/字母)
            credit: /^(([0-9A-Za-z]{15})|([0-9A-Za-z]{18})|([0-9A-Za-z]{20}))$/,
            // 是否为base64格式字符串
            base64: /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/,
            // base64格式（data:...;base64开头）严格模式
            base64Str: /^\s*data:(?:[a-z]+\/[a-z0-9-+.]+(?:;[a-z-]+=[a-z0-9-]+)?)?(?:;base64)?,([a-z0-9!$&',()*+;=\-._~:@/?%\s]*?)\s*$/i,
            // md5格式(32位)
            md5: /^([a-f\d]{32}|[A-F\d]{32})$/
        };
        return rule[type].test(str);
    }
};
exports.is = is;
/**
 * <日期时间有关工具方法>
 * ```ts
 * // 引用组件
 * import { time } from '@push.fun/midway-tool'
 * // 使用方法
 * let s = time.  // 输入time.(点)智能联想提示！
 * ```
 * @key get() 获取(转换)常用日期时间格式
 * @key format() 时间格式转换
 */
const time = {
    /**
     * 获取(转换)常用日期时间格式
     * @param type 转换方式
     * @example
     * ```ts
     * // 默认0
     * time.get()
     * // 2021-08-03 12:12:12
     * time.get(0)
     * // 20210803121212
     * time.get(1)
     * // { YYYY, MM, DD, hh, mm, ss }
     * time.get(2)
     * ------------------------
     * ```
     * @param time 需要转化的时间
     * @example
     * ```ts
     * '不指定则取当前时间，指定则转换指定时间'
     * ```
     */
    get(type, time) {
        type = type && !is.Undefined(type) ? type : 0;
        time = time && !is.Undefined(time) ? time : undefined;
        const index = {
            0: () => {
                return moment(time).format('YYYY-MM-DD HH:mm:ss');
            },
            1: () => {
                return moment(time).format('YYYYMMDDHHmmss');
            },
            2: () => {
                return {
                    YYYY: moment(time).format('YYYY'),
                    MM: moment(time).format('MM'),
                    DD: moment(time).format('DD'),
                    HH: moment(time).format('HH'),
                    mm: moment(time).format('mm'),
                    ss: moment(time).format('ss')
                };
            }
        };
        return index[type]();
    },
    /**
     * 时间格式转换
     * @param time 需要转换的时间
     * @param format 转换规则
     */
    format(time, format) {
        time = time && !is.Undefined(time) ? time : undefined;
        format = format && !is.Undefined(format) ? format : 'YYYY-MM-DD HH:mm:ss';
        return moment(time).format(format);
    }
};
exports.time = time;
/**
 * <加密解密有关工具方法>
 * ```ts
 * // 引用组件
 * import { crypto } from '@push.fun/midway-tool'
 * // 使用方法
 * let s = crypto.  // 输入crypto.(点)智能联想提示！
 * ```
 * @key base64() base64编码&解码（自动识别类型）
 * @key random() 生成随机或字符串函数(支持字典)
 * @key md5() MD5加密
 * @key AES() AES加密解密
 * @key RSA() RSA加密解密
 */
const crypto = {
    /**
     * base64编码&解码（自动识别类型）
     * @param str 要编码或者解码的字符串
     * @example
     * ```ts
     * // 将字符串编码为base-64的ASCII码
     * encrypt.base64('abc')
     * ------------------------
     * ```
     * @param type 【编码类型】--> 默认编码[encrypt] 解码[decode]
     * @example
     * ```ts
     * // 将字符串编码为base-64的ASCII码
     * encrypt.base64('abc', 'encrypt')
     * // 解码用base-64编码的字符串数据
     * encrypt.base64('MTMzMDQwNjEyMjI=', 'decode')
     * ```
     * @param URI 【URI编码】--> 默认启用[true]  禁用[false]
     */
    base64(str, type, URI) {
        let ue = null;
        if (is.Undefined(URI) || URI)
            ue = decodeURIComponent(str);
        if (is.test(ue, 'base64') || (type && type === 'decode')) {
            let data = Buffer.from(ue, 'base64').toString('binary');
            return data;
        }
        if (!type)
            type = 'encrypt';
        if (type && type === 'encrypt') {
            let data = Buffer.from(str + '', 'binary').toString('base64');
            if (is.Undefined(URI) || URI)
                return encodeURIComponent(data);
            return data;
        }
    },
    /**
     * 生成随机或字符串函数
     * @param len [number]指定固定随机数位数
     * @param max [number]最大位数区间，如此参数已指定，则len参数为最小位数区间
     * @param key [array]随机字典字段
     */
    random(len, max, key) {
        // 定义随机数组
        const keys = !is.Undefined(key) ? key : (!is.Undefined(max) && is.Array(max)) ? max : [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
        ];
        let R = '';
        let min = len;
        // default 4-10位随机数
        if (is.Undefined(len)) {
            min = 4;
            max = 10;
        }
        // 指定位数区间随机
        if (!is.Undefined(max) && !is.Array(max)) {
            let x = max;
            min = Math.round(Math.random() * (x - min)) + min;
        }
        // 固定位数随机
        for (let i = 0; i < min; i++) {
            let dom = Math.round(Math.random() * (keys.length - 1));
            R += keys[dom];
        }
        return R;
    },
    /**
     * MD5加密
     * @param data 加密数据
     */
    md5(data) {
        return cry.createHash('md5').update(JSON.stringify(data), 'utf8').digest('hex').toUpperCase();
    },
    /**
     * AES加密解密
     * @param action AES方法 [encrypt]加密   [decrypt]解密
     * @param data.data 待加密解密数据
     * @param data.key 加密解密密钥  [default] 默认为md5('TIAN0515')
     * @param URI 【URI编码】--> 默认启用[true]  禁用[false]
     */
    AES(action, data, URI) {
        const key = !is.Undefined(data.key) ? data.key : this.md5('TIAN0515');
        let DATA = null; // return
        switch (action) {
            case 'encrypt': {
                console.log('JSON.stringify(data.data)', JSON.stringify(data.data));
                let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data.data), CryptoJS.enc.Utf8.parse(key), {
                    mode: CryptoJS.mode.ECB,
                    padding: CryptoJS.pad.Pkcs7
                });
                DATA = ciphertext.toString();
                if (is.Undefined(URI) || URI)
                    DATA = encodeURIComponent(ciphertext.toString());
                break;
            }
            case 'decrypt': {
                try {
                    if (is.Undefined(URI) || URI)
                        data.data = decodeURIComponent(data.data);
                    let bytes = CryptoJS.AES.decrypt(data.data.toString(), CryptoJS.enc.Utf8.parse(key), {
                        mode: CryptoJS.mode.ECB,
                        padding: CryptoJS.pad.Pkcs7
                    });
                    DATA = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
                }
                catch (err) {
                    DATA = false;
                }
                break;
            }
        }
        return DATA;
    },
    /**
     * RSA加密解密
     * @param action RSA方法 [encrypt]加密  [decrypt]解密  [sign]加签  [verify]验签
     * @param data.data 待加密数据
     * @param data.type [default] [public]
     * @param data.sign? 加签签名
     */
    RSA(action, data) {
        // TODO: RSA加密解密this取不到，需要修复
        const thls = this;
        let DATA = null; // return
        switch (action) {
            // data.type [default]私钥加密  [public]公钥加密 
            case 'encrypt': {
                if (!is.Undefined(data.type) && data.type === 'public') {
                    // 公钥加密
                    const keyPublic = new NodeRSA(thls.app.config.encrypt.public.toString());
                    keyPublic.setOptions({ encryptionScheme: 'pkcs1' });
                    const encryptPublic = keyPublic.encrypt(Buffer.from(JSON.stringify(data.data)), 'base64', 'utf8');
                    DATA = encryptPublic;
                }
                else {
                    // 获取私钥
                    const keyPrivate = new NodeRSA(thls.app.config.encrypt.private.toString());
                    keyPrivate.setOptions({ encryptionScheme: 'pkcs1' });
                    // 私钥加密
                    const encryptPass = keyPrivate.encryptPrivate(Buffer.from(JSON.stringify(data.data)), 'base64', 'utf8');
                    DATA = encryptPass;
                }
                break;
            }
            // data.type [default]私钥解密  [public]公钥解密
            case 'decrypt': {
                if (!is.Undefined(data.type) && data.type === 'public') {
                    // 获取公钥
                    const keyPublic = new NodeRSA(thls.app.config.encrypt.public.toString());
                    keyPublic.setOptions({ encryptionScheme: 'pkcs1' });
                    try {
                        // 公钥解密
                        const decryptPublic = keyPublic.decryptPublic(data.data, 'utf8');
                        DATA = JSON.parse(decryptPublic);
                    }
                    catch (err) {
                        DATA = false;
                    }
                }
                else {
                    // 获取私钥
                    const keyPrivate = new NodeRSA(thls.app.config.encrypt.private.toString());
                    keyPrivate.setOptions({ encryptionScheme: 'pkcs1' });
                    try {
                        // 私钥解密
                        const decryptPrivate = keyPrivate.decrypt(data.data, 'utf8');
                        DATA = JSON.parse(decryptPrivate);
                    }
                    catch (err) {
                        DATA = false;
                    }
                }
                break;
            }
            // [default]私钥加签
            case 'sign': {
                const keyPrivate = new NodeRSA(thls.app.config.encrypt.private.toString());
                keyPrivate.setOptions({ encryptionScheme: 'pkcs1' });
                // 私钥加签
                const signPrivate = keyPrivate.sign(Buffer.from(JSON.stringify(data.data)), 'base64', 'utf8');
                DATA = signPrivate;
                break;
            }
            // [default]私钥验证签名   [public]公钥验证签名
            // data.data 加签数据
            // data.sign 加签签名
            case 'verify': {
                if (!is.Undefined(data.type) && data.type === 'public') {
                    // 获取公钥
                    const keyPublic = new NodeRSA(thls.app.config.encrypt.public.toString());
                    keyPublic.setOptions({ encryptionScheme: 'pkcs1' });
                    // 公钥验签
                    const verifyPublic = keyPublic.verify(Buffer.from(JSON.stringify(data.data)), data.sign, 'utf8', 'base64');
                    DATA = verifyPublic;
                }
                else {
                    // 获取私钥
                    const keyPrivate = new NodeRSA(thls.app.config.encrypt.private.toString());
                    keyPrivate.setOptions({ encryptionScheme: 'pkcs1' });
                    // 私钥验签
                    const verifyPrivate = keyPrivate.verify(Buffer.from(JSON.stringify(data.data)), data.sign, 'utf8', 'base64');
                    DATA = verifyPrivate;
                }
            }
        }
        return DATA;
    },
};
exports.crypto = crypto;
let Tool = class Tool {
    get number() {
        return number;
    }
    get string() {
        return string;
    }
    get array() {
        return array;
    }
    get is() {
        return is;
    }
    get time() {
        return time;
    }
    get crypto() {
        return crypto;
    }
};
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", Object)
], Tool.prototype, "ctx", void 0);
Tool = __decorate([
    decorator_1.Provide()
], Tool);
exports.Tool = Tool;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvUXVuL1VuY2x1dHRlci9taWR3YXktbGVybmEvcGFja2FnZXMvbWlkd2F5LXRvb2wvc3JjLyIsInNvdXJjZXMiOlsic2VydmljZS90b29sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFzRDtBQUN0RCxtQ0FBb0M7QUFDcEMsaUNBQWdDO0FBMjVCVSx3QkFBTTtBQTE1QmhELDhCQUE2QjtBQUM3QixvQ0FBbUM7QUFDbkMsc0NBQXFDO0FBRXJDLDhDQUE4QztBQUM5QyxNQUFNLE1BQU0sR0FBRztJQUNYLE9BQU8sRUFBRSxLQUFLO0lBQ2QsTUFBTSxFQUFFLFFBQVE7SUFDaEIsTUFBTSxFQUFFLFFBQVE7SUFDaEIsU0FBUyxFQUFFLEVBQUU7SUFDYixXQUFXLEVBQUUsS0FBSztJQUNsQixVQUFVLEVBQUUsSUFBSTtDQUNuQixDQUFBO0FBQ0QsTUFBTSxJQUFJLEdBQUcsZUFBTSxDQUFDLFlBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQTtBQUVoQyxTQUFTLEtBQUssQ0FBQyxLQUFVO0lBQ3JCLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQTtJQUNsQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQTtBQUM1QyxDQUFDO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBQ0gsTUFBTSxNQUFNLEdBQUc7SUFDWDs7Ozs7OztPQU9HO0lBQ0gsTUFBTSxDQUFDLEdBQVE7UUFDWCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQzVCLE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ3JCLENBQUM7SUFDRDs7Ozs7OztPQU9HO0lBQ0gsSUFBSSxDQUFDLENBQVMsRUFBRSxDQUFTO1FBQ3JCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFD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