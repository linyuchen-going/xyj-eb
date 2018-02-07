import * as ApiRes from './response'
import * as ApiUrls from './url'
import requests from '../../../utils/requests'


export function apiOrders(page: number): Promise<ApiRes.ApiResOrder>{
    return requests.apiGet(ApiUrls.apiUrlOrders(page))
}
