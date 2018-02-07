import requests from '../../../utils/requests'
import * as ApiUrls from './url'
import * as ApiRes from './response'
import * as ApiQuery from './query'


export function apiLoginStatus(): Promise<ApiRes.ApiResLoginStatus> {
    return requests.apiGet(ApiUrls.apiUrlLoginStatus)
}

export function apiLoginSms(query: ApiQuery.ApiQueryLoginSms): Promise<{}> {
    return requests.apiPost(ApiUrls.apiUrlLoginSms, query)
}
