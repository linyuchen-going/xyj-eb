import * as ApiRes from './response'
import * as ApiQuery from './query'
import * as ApiUrls from './url'
import requests from '../../../../utils/requests'

export function apiStatus(): Promise<ApiRes.ApiResBackendProductOrderStatus[]> {
    return requests.apiGet(ApiUrls.apiUrlAllStatus);
}


export function apiChangeStatus(query: ApiQuery.ApiQueryChangeOrderStatus): Promise<{}> {
    return requests.apiPost(ApiUrls.apiUrlChangeOrderStatus, query);
}
