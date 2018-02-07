import requests from '../../../utils/requests'
import * as ApiUrls from './url'
import * as ApiQuery from './query'

export function apiSmsCode(query: ApiQuery.ApiQuerySmsCode): Promise<{}>{
    return requests.apiPost(ApiUrls.apiUrlSmsCode, query);
}
