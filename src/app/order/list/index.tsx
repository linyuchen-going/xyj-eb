import * as React from 'react';
import {ApiResProductOrder} from "../../../api/order/response";
import * as OrderApi from '../../../api/order/index';
import * as STYLE from './style.css';
import LoginSmsComponent from '../../login'

interface State{
    orders: ApiResProductOrder[];
}
interface Props{}


export default class OrderListComponent extends React.Component<Props, State>{

    constructor(p: Props){
        super(p);
        this.state = {
            orders: []
        }
    }

    componentWillMount(){
        OrderApi.productOrders().then((orders)=>{
            this.setState({orders})
        })
    }

    render(){
        let items = this.state.orders.map((order)=>{
            return (
                <div className={STYLE.item} key={order.id}>
                    <div className={STYLE.createTime}>
                        {order.create_time}
                    </div>
                    <div className={STYLE.product}>
                        <div className={STYLE.cover}>
                            <img src={order.product.cover}/>
                        </div>
                        <div className={STYLE.productInfo}>
                            <div className={STYLE.name}>
                                {order.product.name}
                            </div>
                            <div className={STYLE.priceContainer}>
                                <div className={STYLE.priceTitle}>
                                    金额:
                                </div>
                                <div className={STYLE.priceValue}>
                                    {order.product.price} 元
                                </div>
                            </div>
                            <div className={STYLE.numContainer}>
                                <div className={STYLE.numTitle}>数量:</div>
                                <div className={STYLE.numValue}>
                                    x {order.num}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={STYLE.statusContainer}>
                        <div className={STYLE.statusTitle}>状态</div>
                        <div className={STYLE.statusValue}>{order.status.name} >></div>
                    </div>
                </div>
            )
        });

        if (items.length === 0){
            return (
                <div>
                    <LoginSmsComponent/>
                    暂无订单
                </div>
            )
        }

        return (
            <div>
                <LoginSmsComponent/>
                {items}
            </div>
        )
    }
}