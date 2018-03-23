import requests from '../../utils/requests';
import * as WechatJsSdk from 'lycfelib/wechat/jssdk';
import * as ApiUrls from './url';

export function apiJsSdkConfig(): Promise<WechatJsSdk.ConfigData> {
    return requests.apiGet(ApiUrls.configUrl);
}