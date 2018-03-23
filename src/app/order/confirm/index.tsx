import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import * as STYLE from './style.css';
import {Product} from '../../product/detail';
import AddressSelectorComponent, {} from '../../address/select';
import {ApiResAddress as Address} from "../../../api/user/address/response";
import * as AddressApi from "../../../api/user/address/index";
import * as ProductApi from "../../../api/product/index";
import * as OrderApi from "../../../api/order/index";
import {dinpayGateWayUrl} from "../../../api/pay/urls";
import {OrderConfirmParam} from "../../router/urls";
import * as RouterUrls from '../../router/urls';
import LoginSmsComponent from '../../login';
import FormPostComponent from 'lycfelib/react/formpost';
import WechatJsSdk from '../../wxjssdk';

let ICON_POSITION = require('./img/position.png');
let ICON_ALIPAY = require("./img/alipay.png");
let ICON_WECHATPAY = require("./img/wechatpay.jpeg");

interface Props extends ReactRouter.RouteComponentProps<OrderConfirmParam>{

}
interface State{
    product: Product;
    inviteCode: string;
    showAddressSelector: boolean;
    address: Address;
    pay_way: string;
    pay_data: any;
}



export default class OrderConfirm extends React.Component<Props, State>{
    private productId: number;
    private payFormPost: FormPostComponent;
    constructor(p: Props){
        super(p);
        this.productId = p.match.params.productId;
        let product: Product = {
            id: 0,
            name: "加载中...",
            describe: ` `,
            price: 0,
            cover: ""
        };
        this.state = {
            product: product,
            inviteCode: "",
            showAddressSelector: false,
            address: {
                id: null,
                country: "",
                province: "",
                city: "",
                area: "",
                detail: "",
                zipcode: "",
                name: "",
                mobile: ""
            },
            pay_way: "wxpub_pay",
            pay_data: {}
        }
    }

    post(){
        // if(!this.state.inviteCode){
        //      return alert("请先填入邀请码");
        // }
        if (!this.state.address.id){
            return alert("请先填写收货人信息");
        }
        OrderApi.newProductOrder({
            address: this.state.address.id,
            product: this.productId,
            invite_code: this.state.inviteCode,
            pay_way: this.state.pay_way
        }).then((res)=>{
            // RouterUrls.go(RouterUrls.orderConfirm(res.id));
            this.setState({pay_data: res.wechat_pay_data});
            // this.payFormPost.post();
            res.wechat_pay_data.success = function (res: any) {
                alert("支付成功");
            };
            WechatJsSdk.pay(res.wechat_pay_data);
        });
    }

    componentWillMount(){
        AddressApi.apiAddressDefault().then((address)=>{
            this.setState({
                address
            })
        });

        ProductApi.apiProductDetail(this.productId).then((product)=>{
            this.setState({
                product
            })
        })
    }


    render(){
        let {product, address} = this.state;
        
        if (this.state.showAddressSelector){
            return <AddressSelectorComponent
                btnCancelClick={()=>{this.setState({showAddressSelector: false})}}
                selectedClick={(address: Address)=>{
                    this.setState({showAddressSelector: false, address: address})
                }}/>
        }


        return (
            <div className={STYLE.confirm}>
                <LoginSmsComponent />
                <div className={STYLE.addressContainer} onClick={()=>{this.setState({showAddressSelector: true})}}>
                    <div className={STYLE.iconPosition}><img src={ICON_POSITION}/></div>
                    <div className={STYLE.address}>
                        <div className={STYLE.addressPerson}>   
                            <div className={STYLE.addressReceiver}>
                                收货人：{address.name}
                            </div>
                            <div className={STYLE.addressMobile}>
                                {address.mobile}
                            </div>
                        </div>
                        <div className={STYLE.addressDetail}>
                            {address.province} {address.city} {address.area} {address.detail}
                        </div>
                    </div>
                </div>
                <div className={STYLE.order}>
                    <div className={STYLE.product}> 
                        <div className={STYLE.productCover}>
                            <img src={product.cover}/>
                        </div>
                        <div className={STYLE.productDetail}>
                            <div className={STYLE.productDetailName}>{product.name}</div>
                            <div className={STYLE.productDetailItem}>
                                <div className={STYLE.productNumTitle}>商品数量</div> <div className={STYLE.productNum}>x 1</div>
                            </div>
                            <div>
                                <div className={STYLE.productPriceTitle}>单价</div> <div className={STYLE.productPrice}>{product.price}元</div>
                            </div>
                        </div>
                    </div>

                    {/*<div className={STYLE.orderItem}>*/}
                        {/*<div className={STYLE.inviteCodeTitle}>邀请码</div>*/}
                        {/*<input className={STYLE.inviteCode}*/}
                               {/*onChange={(v)=>{this.setState({inviteCode: v.target.value})}}*/}
                               {/*placeholder="在此填入邀请码"*/}
                        {/*/>*/}
                    {/*</div>*/}
                    <div>
                        <div className={STYLE.totalPaymentTitle}>金额</div>
                        <div className={STYLE.totalPayment}>{product.price}元</div>
                    </div>
                </div>
                <div style={{marginTop: "3rem", marginLeft: "rem"}}>
                    <div className={STYLE.payway}>
                        <div className={STYLE.paywayLeft}>
                            <div><img className={STYLE.iconPayway} src={ICON_WECHATPAY}/></div>
                            <div className={STYLE.paywayName}>
                                微信支付
                            </div>
                        </div>
                        <div className={STYLE.paywayRight}>
                            <input type="radio" name="payway" defaultChecked={true} onClick={()=>{this.setState({pay_way: "wxpub_pay"})}}/>
                        </div>
                    </div>
                    {/*<div className={STYLE.payway}>*/}
                        {/*<div className={STYLE.paywayLeft}>*/}
                            {/*<img className={STYLE.iconPayway} src={ICON_ALIPAY}/>*/}
                            {/*<div className={STYLE.paywayName}>支付宝支付</div>*/}
                        {/*</div>*/}
                        {/*<div className={STYLE.paywayRight}>*/}
                            {/*<input type="radio" name="payway" defaultChecked={true} onClick={()=>{this.setState({pay_way: "alipay_h5"})}}/>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                </div>
                <div className={STYLE.btnPay} onClick={()=>{this.post()}}>付款</div>
                <FormPostComponent data={this.state.pay_data} url={dinpayGateWayUrl} ref={(component)=>{this.payFormPost=component}}/>

            </div>
        )
    }
}
