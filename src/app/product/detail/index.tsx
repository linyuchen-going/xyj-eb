import * as React from 'react'
import {Link} from 'react-router-dom'
import * as STYLE from './style.css'
import * as apiProduct from '../../../api/product'
import {ApiResProductDetail, ApiResProducts} from "../../../api/product/response";
import * as RouterUrls from "../../router/urls";


interface Props{}
export interface Product extends ApiResProductDetail{
}

interface State{
    product: Product;
    products: Product[];
    showMoreList: boolean;
}

export default class ProductComponent extends React.Component<Props, State>{
    private productId: number | null = null;

    constructor(p: any){
        super(p);
        let product: Product = {
            id: 0,
            name: "加载中...",
            describe: ` `,
            price: 11000,
            cover: ""
        };
        this.state = {
            product: product,
            products: [product, product, product, product, product],
            showMoreList: false
        }
    }

    componentWillMount(){
        this.getAllProducts();
    }

    getProductData(id: number){
        apiProduct.apiProductDetail(id).
        then((res: ApiResProductDetail)=>{
            this.setState({
                product: res
            })
        })
    }

    getAllProducts(){
        apiProduct.apiProductList().
        then(
            (res: ApiResProducts)=>{
                this.setState({
                    products: res.results
                });
                if (!this.productId){
                    // this.getProductData(res.results[0].id);
                    this.getProductData(2);
                }
            }
        )
    }

    renderMoreList(): JSX.Element{
        let products = this.state.products.map((product: Product)=>{
            return (
                <div className={STYLE.moreListProduct} key={product.id} onClick={()=>this.getProductData(product.id)}>
                    <div>
                        <img src={product.cover} />
                    </div>
                    {product.name}
                </div>
            )
        });
        if (this.state.showMoreList){
            return (
                <div className={STYLE.moreList} onClick={()=>{this.setState({"showMoreList": false})}}>
                    <div className={STYLE.moreListProducts}>
                        {products}
                    </div>
                </div>
            )
        }
        else{
            return null;
        }
    }

    render(): JSX.Element{
        let {cover, name, describe, price} = this.state.product;
        return (
            <div className={STYLE.product}>
                <div className={STYLE.cover}>
                    <img src={cover}/>
                </div>
                <div className={STYLE.content}>
                    <div className={STYLE.title}>
                        {name}
                    </div>
                    <div>
                        <div className={STYLE.star}>
                            精品推荐
                        </div>
                        <div className={STYLE.price}>
                            ￥{price}
                        </div>
                    </div>
                    <div className={STYLE.describe} dangerouslySetInnerHTML={{__html: describe}}/>
                    <div className={STYLE.shoppingNotice}>
                        <h4>购物说明:</h4>
                        <p>
                            付款方式：在线支付
                        </p>
                        <p>
                            商品为海外进口商品, 货物为定期预定，需要15天到30天才能到达国内
                        </p>
                        <p>
                            发货默认为顺丰快递，商家包邮，收到货物请开箱验收
                        </p>
                        <p>
                            关于售后，由于进口麻烦，商品不支持退货退款，支持保修，保修时间具体见商品详情
                        </p>
                        <p>
                            客服电话：13088108191
                        </p>
                    </div>
                    <div className={STYLE.company}>
                        <div>
                            上海润盈能源科技有限公司
                            <p>备案号：沪ICP备16033011号-2</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={STYLE.shopBtn} onClick={()=>RouterUrls.go(RouterUrls.orderConfirm(this.state.product.id))}>
                        立即购买
                    </div>
                </div>
                {this.renderMoreList()}
                {
                    !this.state.showMoreList ?
                        <div className={STYLE.moreListBtn} onClick={() => {
                            this.setState({"showMoreList": true})
                        }}>
                            更多商品>>
                        </div>
                    : null
                }
            </div>
        )
    }
}
