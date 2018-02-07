import requests from '../../../utils/requests'
import * as ApiRes from './response'
import * as ApiQuery from './query'
import * as ApiUrls from './url'


export function apiAddressDefault(): Promise<ApiRes.ApiResAddressDefault> {
    return requests.apiGet(ApiUrls.apiUrlAddressDefault)
}


export function apiAddressList(): Promise<ApiRes.ApiResAddress[]> {
    return requests.apiGet(ApiUrls.apiUrlAddress)
}

export function apiAddress(address: ApiQuery.ApiQueryAddress): Promise<ApiRes.ApiResAddress>{
    return requests.apiPost(ApiUrls.apiUrlAddress, address)
}
