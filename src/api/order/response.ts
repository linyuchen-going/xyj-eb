import {ApiResProductDetail} from "../product/response";
import {ApiResAddress} from "../user/address/response";
import * as WechatJsSdk from "lycfelib/wechat/jssdk";

export interface PayOrder{
    id: number;
    create_time: string;
    paid: boolean;
}


export enum StatusNames{
    WAIT_PAY = "待付款",
    PAID = "日本下单",
    WAIT_CHINA = "日本到货待入关",
    SEND = "已发货",
}


export interface ProductOrderStatus{
    id: number;
    name: StatusNames;  // StatusNames member
}

export interface ApiResProductOrder{
    id: number;
    create_time: string;
    product: ApiResProductDetail;
    address: ApiResAddress;
    status: ProductOrderStatus;
    pay_order?: PayOrder;
    num: number;
}


export interface ApiResNewProductOrderResult{
    id: number;
    wechat_pay_data: WechatJsSdk.PayConfigData;
}