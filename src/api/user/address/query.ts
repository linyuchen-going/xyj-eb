
import {ApiResAddress} from "./response"

export interface ApiQueryAddress extends ApiResAddress{
    id: number | null; // null时为新建地址，number时为修改地址
}
