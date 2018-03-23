import WX, * as WechatJsSdk from "lycfelib/wechat/jssdk";
import * as api from '../../api/wxjssdk'
import DEBUG from '../../config/debug';

const jssdk = new WX();

api.apiJsSdkConfig().then((res)=>{
    res.debug = DEBUG;
    res.jsApiList = ["chooseWXPay"];
    jssdk.config(res);
});
export default jssdk;
