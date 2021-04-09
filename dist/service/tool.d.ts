/// <reference types="mathjs" />
import * as moment from 'moment';
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
declare const number: {
    /**
     * 公式混合运算方法 + - * / (支持浮点数)
     * ```ts
     * // 例1
     * let n = number.$count(0.1 + 0.2) // 0.3
     * ```
     * @param num 计算公式
     */
    $count(num: any): string;
    /**
     * 加法计算（支持大数）
     * ```ts
     * let n = number.$add(9007199254740992, 1) // 9007199254740993
     * ```
     * @param a
     * @param b
     */
    $add(a: number, b: number): string;
    /**
     * 减法计算（支持大数）
     * ```ts
     * let n = number.$add(9007199254740992, 1) // 9007199254740991
     * ```
     * @param a
     * @param b
     */
    $subtract(a: number, b: number): string;
    /**
     * 乘法计算（支持大数）
     * @param a
     * @param b
     */
    $multiply(a: number, b: number): string;
    /**
     * 向上取整
     * @param num
     */
    $ceil(num: any): string;
    /**
     * 向下取整
     * @param num
     */
    $floor(num: any): string;
    /**
     * 四舍五入
     * @param num
     */
    $round(num: any): string;
    /**
     * 大数（配合取整和四舍五入使用）
     * @param num
     */
    $big(num: number): import("mathjs").BigNumber;
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
    toFixedNum(number: any, num?: number): number;
};
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
declare const string: {
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
    containsWhitespace(str: string): boolean;
    /**
     * 压缩字符串中的空白 (多个空格转换为单个空格)
     * @param str
     */
    compactWhitespace(str: string): string;
    /**
     * 返回字节单位字符串长度
     * @param str
     */
    byteSize(str: string): number;
    /**
     * 半角转换为全角函数
     * @param str
     */
    ToDBC(str: any): string;
    /**
     * 全角转换为半角函数
     * @param str
     */
    ToCDB(str: any): string;
    /**
     * 获取class类名称&转换为小写
     * @param entity Class实体
     */
    parseClassName(entity: any): string;
    /**
     * 打印函数名称
     * @param fn
     */
    parseFunctionName(fn: Function): Function;
    /**
     * 获取URL上的参数
     * @param param 参数名
     */
    getUrlParam(param: string): string;
};
/**
 * <数组有关工具方法>
 */
declare const array: {
    /**
     * 移除数组中的假值
     * @param arr
     */
    compact(arr: Array<any>): any[];
    /**
     * 将数字转为数字数组 (移除符号 - )
     * @param n
     */
    digitize(n: number): number[];
    /**
     * 如果提供的值不是数组 则将它转为数组
     * @param val
     */
    castArray(val: any): any[];
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
    keysort(key: any, desc: any): (a: any, b: any) => boolean;
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
    arrIndex(arr: Array<object>, key: string, value: string | number): Promise<number>;
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
    arrFind(arr: Array<object>, value: object): Promise<object[]>;
    /**
     * 数组A和数组B合并 返回合并后数组
     * @param {原数组} thisArr 需要合并的数组A
     * @param {合并数组} argArr 被合并的数组B
     */
    arrUnite(thisArr: any, argArr: any): Promise<any>;
    /**
     * 数组数字排序
     * @param {*} arr
     */
    ArrayRank(arr: any): any;
    /**
     * 数组根据数组内对象属性排序
     * @param {*} arr
     * @param {*} key
     * @param {*} rev 排序规则 默认ASC false为DESC
     */
    ArrayRankObj(arr: any, key: any, rev: any): any;
};
/**
 * <判断有关工具方法>
 */
declare const is: {
    /**
     * <判断是否为null或者undefined>
     * @param data
     */
    null(data: any): boolean;
    /**
     * <判断是否是 Float 浮点>
     * @param num
     */
    Float(num: any): boolean;
    /**
     * <判断是否为数字>
     * @param {*} num
     */
    Number(num: any): boolean;
    /**
     * <判断是否为布尔值>
     * @param {*} data
     */
    Boolean(data: any): boolean;
    /**
     * <判断是否为字符串>
     * @param {*} str
     */
    String(str: any): boolean;
    /**
     * <判断是否为undefined>
     * @param {*} data
     */
    Undefined(data: any): boolean;
    /**
     * 判断是否为数组
     * @param {*} arr
     */
    Array(arr: any): boolean;
    /**
     * <判断是否为对象 （非数组）>
     * @param {*} obj
     */
    Object(obj: any): boolean;
    /**
     * <判断是否为函数>
     * @param {*} fn
     */
    Function(fn: any): boolean;
    /**
     * <判断是否为正确金额>
     * ```ts
     * console.log(is.Price('12.37')); // true
     * console.log(is.Price('12&37')); // false
     * ```
     * @param {*} num
     */
    Price(num: any): boolean;
    /**
     * <判断数组是否有重复值>
     * @param arr 需要判断的数组
     * @param strict： 严格模式true，非严格false
     * @returns {boolean} ture: 有重复值  false: 没有重复值
     */
    ArrayRepeat(arr: any, strict?: boolean): boolean;
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
    test(str: string | number, type: string): any;
};
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
declare const time: {
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
    get(type?: number, time?: any): any;
    /**
     * 时间格式转换
     * @param time 需要转换的时间
     * @param format 转换规则
     */
    format(time?: any, format?: string): string;
};
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
declare const crypto: {
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
    base64(str: string, type?: string, URI?: boolean): string;
    /**
     * 生成随机或字符串函数
     * @param len [number]指定固定随机数位数
     * @param max [number]最大位数区间，如此参数已指定，则len参数为最小位数区间
     * @param key [array]随机字典字段
     */
    random(len?: number, max?: number | Array<any>, key?: any): any;
    /**
     * MD5加密
     * @param data 加密数据
     */
    md5(data: any): string;
    /**
     * AES加密解密
     * @param action AES方法 [encrypt]加密   [decrypt]解密
     * @param data.data 待加密解密数据
     * @param data.key 加密解密密钥  [default] 默认为md5('TIAN0515')
     * @param URI 【URI编码】--> 默认启用[true]  禁用[false]
     */
    AES(action: any, data: any, URI?: boolean): any;
    /**
     * RSA加密解密
     * @param action RSA方法 [encrypt]加密  [decrypt]解密  [sign]加签  [verify]验签
     * @param data.data 待加密数据
     * @param data.type [default] [public]
     * @param data.sign? 加签签名
     */
    RSA(action: any, data: any): any;
};
export declare class Tool {
    ctx: any;
    get number(): {
        /**
         * 公式混合运算方法 + - * / (支持浮点数)
         * ```ts
         * // 例1
         * let n = number.$count(0.1 + 0.2) // 0.3
         * ```
         * @param num 计算公式
         */
        $count(num: any): string;
        /**
         * 加法计算（支持大数）
         * ```ts
         * let n = number.$add(9007199254740992, 1) // 9007199254740993
         * ```
         * @param a
         * @param b
         */
        $add(a: number, b: number): string;
        /**
         * 减法计算（支持大数）
         * ```ts
         * let n = number.$add(9007199254740992, 1) // 9007199254740991
         * ```
         * @param a
         * @param b
         */
        $subtract(a: number, b: number): string;
        /**
         * 乘法计算（支持大数）
         * @param a
         * @param b
         */
        $multiply(a: number, b: number): string;
        /**
         * 向上取整
         * @param num
         */
        $ceil(num: any): string;
        /**
         * 向下取整
         * @param num
         */
        $floor(num: any): string;
        /**
         * 四舍五入
         * @param num
         */
        $round(num: any): string;
        /**
         * 大数（配合取整和四舍五入使用）
         * @param num
         */
        $big(num: number): import("mathjs").BigNumber;
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
        toFixedNum(number: any, num?: number): number;
    };
    get string(): {
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
        containsWhitespace(str: string): boolean;
        /**
         * 压缩字符串中的空白 (多个空格转换为单个空格)
         * @param str
         */
        compactWhitespace(str: string): string;
        /**
         * 返回字节单位字符串长度
         * @param str
         */
        byteSize(str: string): number;
        /**
         * 半角转换为全角函数
         * @param str
         */
        ToDBC(str: any): string;
        /**
         * 全角转换为半角函数
         * @param str
         */
        ToCDB(str: any): string;
        /**
         * 获取class类名称&转换为小写
         * @param entity Class实体
         */
        parseClassName(entity: any): string;
        /**
         * 打印函数名称
         * @param fn
         */
        parseFunctionName(fn: Function): Function;
        /**
         * 获取URL上的参数
         * @param param 参数名
         */
        getUrlParam(param: string): string;
    };
    get array(): {
        /**
         * 移除数组中的假值
         * @param arr
         */
        compact(arr: any[]): any[];
        /**
         * 将数字转为数字数组 (移除符号 - )
         * @param n
         */
        digitize(n: number): number[];
        /**
         * 如果提供的值不是数组 则将它转为数组
         * @param val
         */
        castArray(val: any): any[];
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
        keysort(key: any, desc: any): (a: any, b: any) => boolean;
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
        arrIndex(arr: object[], key: string, value: string | number): Promise<number>;
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
        arrFind(arr: object[], value: object): Promise<object[]>;
        /**
         * 数组A和数组B合并 返回合并后数组
         * @param {原数组} thisArr 需要合并的数组A
         * @param {合并数组} argArr 被合并的数组B
         */
        arrUnite(thisArr: any, argArr: any): Promise<any>;
        /**
         * 数组数字排序
         * @param {*} arr
         */
        ArrayRank(arr: any): any;
        /**
         * 数组根据数组内对象属性排序
         * @param {*} arr
         * @param {*} key
         * @param {*} rev 排序规则 默认ASC false为DESC
         */
        ArrayRankObj(arr: any, key: any, rev: any): any;
    };
    get is(): {
        /**
         * <判断是否为null或者undefined>
         * @param data
         */
        null(data: any): boolean;
        /**
         * <判断是否是 Float 浮点>
         * @param num
         */
        Float(num: any): boolean;
        /**
         * <判断是否为数字>
         * @param {*} num
         */
        Number(num: any): boolean;
        /**
         * <判断是否为布尔值>
         * @param {*} data
         */
        Boolean(data: any): boolean;
        /**
         * <判断是否为字符串>
         * @param {*} str
         */
        String(str: any): boolean;
        /**
         * <判断是否为undefined>
         * @param {*} data
         */
        Undefined(data: any): boolean;
        /**
         * 判断是否为数组
         * @param {*} arr
         */
        Array(arr: any): boolean;
        /**
         * <判断是否为对象 （非数组）>
         * @param {*} obj
         */
        Object(obj: any): boolean;
        /**
         * <判断是否为函数>
         * @param {*} fn
         */
        Function(fn: any): boolean;
        /**
         * <判断是否为正确金额>
         * ```ts
         * console.log(is.Price('12.37')); // true
         * console.log(is.Price('12&37')); // false
         * ```
         * @param {*} num
         */
        Price(num: any): boolean;
        /**
         * <判断数组是否有重复值>
         * @param arr 需要判断的数组
         * @param strict： 严格模式true，非严格false
         * @returns {boolean} ture: 有重复值  false: 没有重复值
         */
        ArrayRepeat(arr: any, strict?: boolean): boolean;
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
        test(str: string | number, type: string): any;
    };
    get time(): {
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
        get(type?: number, time?: any): any;
        /**
         * 时间格式转换
         * @param time 需要转换的时间
         * @param format 转换规则
         */
        format(time?: any, format?: string): string;
    };
    get crypto(): {
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
        base64(str: string, type?: string, URI?: boolean): string;
        /**
         * 生成随机或字符串函数
         * @param len [number]指定固定随机数位数
         * @param max [number]最大位数区间，如此参数已指定，则len参数为最小位数区间
         * @param key [array]随机字典字段
         */
        random(len?: number, max?: number | any[], key?: any): any;
        /**
         * MD5加密
         * @param data 加密数据
         */
        md5(data: any): string;
        /**
         * AES加密解密
         * @param action AES方法 [encrypt]加密   [decrypt]解密
         * @param data.data 待加密解密数据
         * @param data.key 加密解密密钥  [default] 默认为md5('TIAN0515')
         * @param URI 【URI编码】--> 默认启用[true]  禁用[false]
         */
        AES(action: any, data: any, URI?: boolean): any;
        /**
         * RSA加密解密
         * @param action RSA方法 [encrypt]加密  [decrypt]解密  [sign]加签  [verify]验签
         * @param data.data 待加密数据
         * @param data.type [default] [public]
         * @param data.sign? 加签签名
         */
        RSA(action: any, data: any): any;
    };
}
export { number, string, array, is, time, moment, crypto };
