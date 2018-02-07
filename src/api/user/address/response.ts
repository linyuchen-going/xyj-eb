export interface ApiResAddress{
    id: number;
    country: string;
    province: string;
    city: string;
    area: string;
    detail: string;
    zipcode: string;
    mobile: string;
    name: string;
    [propName: string]: string | number;
}

export interface ApiResAddressDefault extends ApiResAddress{
    id: number | null; // 为null表示用户还没有填写过地址
}
