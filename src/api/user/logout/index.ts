import requests from '../../../utils/requests'
import * as ApiUrls from './url'


export function apiLogout(): Promise<{}> {
    return requests.apiGet(ApiUrls.apiUrlLogout);
}

