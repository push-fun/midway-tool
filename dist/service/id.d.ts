import { ILogger } from '@midwayjs/logger';
export declare class Id {
    ctx: any;
    logger: ILogger;
    /**
     * 生成雪花算法id
     * ```ts
     * const id = this.generateId.id // 6783427573234413569
     * ```
     */
    get ID(): any;
    /**
     * 生成随机唯一id
     * @param length 生成id长度 default[21]
     */
    UUID(length?: number): string;
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
    SetUUID(length?: number, alphabet?: string): string;
}
