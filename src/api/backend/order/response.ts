
import {ApiResProductOrder} from '../../order/response';

export interface ApiResOrder{
    results: ApiResProductOrder[];  // 当前页的数据
    pages: number;  // 共有多少页
    total: number;  // 共有多少条数据
    page_size: number;  // 每页多少条
}
