
export interface ApiQueryNewProductOrder{
    address: number;  // address id
    product: number;  // product id
    invite_code: string;
    pay_way: string; // wxpub_pay or alipay_h5
}