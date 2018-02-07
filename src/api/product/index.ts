import requests from '../../utils/requests'
import * as ApiUrls from './url'
import * as ApiRes from './response'


export function apiProductDetail(id: number): Promise<ApiRes.ApiResProductDetail> {
    return requests.apiGet(ApiUrls.apiUrlProductDetail(id))
}

export function apiProductList(): Promise<ApiRes.ApiResProducts> {
    return requests.apiGet(ApiUrls.apiUrlAllProducts)
}
