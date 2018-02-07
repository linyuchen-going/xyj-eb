import * as ApiRes from './response'
import * as ApiUrls from './url'
import * as ApiQuery from './query'
import requests from '../../utils/requests'

export function productOrders(): Promise<ApiRes.ApiResProductOrder[]>{
    return requests.apiGet(ApiUrls.apiUrlProductOrders);
}

export function productOrderDetail(id: number): Promise<ApiRes.ApiResProductOrder> {
    return requests.apiGet(ApiUrls.apiUrlProductOrderDetail(id));
}


export function newProductOrder(query: ApiQuery.ApiQueryNewProductOrder): Promise<ApiRes.ApiResNewProductOrderResult> {
    return requests.apiPost(ApiUrls.apiUrlNewProductOrder, query);
}
