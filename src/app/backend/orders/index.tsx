import * as React from 'react'
import * as ApiResBackend from '../../../api/backend/order/response'
import * as ApiResOrder from '../../../api/order/response'
import * as ApiBackend from '../../../api/backend/order'
import StatusChangeComponent from './status/change'
import 'antd/dist/antd.min.css';
import {Table} from 'antd';
import {TableColumnConfig} from 'antd/lib/table/Table'
import {PaginationProps} from 'antd/lib/pagination/Pagination'

interface Props{}
interface State extends ApiResBackend.ApiResOrder{
    currentPage: number;
    currentOrderStatus?: ApiResOrder.ProductOrderStatus;
    currentOrder?: ApiResOrder.ApiResProductOrder;
    showStatusChanger: boolean;
}

class Tb extends Table<ApiResOrder.ApiResProductOrder>{
}


export default class BackendOrdersComponent extends React.Component<Props, State>{
    constructor(p: Props){
        super(p);
        this.state = {
            results: [],
            pages: 1,
            total: 1,
            currentPage: 1,
            page_size: 2,
            showStatusChanger: false
        };
    }

    componentWillMount(){
        this.getOrders(this.state.currentPage);
    }
    getOrders(page: number){
        this.setState({currentPage: page});
        ApiBackend.apiOrders(page).then((res: ApiResBackend.ApiResOrder)=>{
            this.setState({...res})
        })
    }

    handleTableChange(pagination: PaginationProps, filters: any, sorter: any){
        this.getOrders(pagination.current)
    }

    render(){
        if (this.state.results.length == 0){
            return <div>暂无订单</div>;
        }
        const columns: TableColumnConfig<ApiResOrder.ApiResProductOrder>[] = [
            {
                key: "create_time",
                title: "下单时间",
                dataIndex: "create_time"
            },
            {
                key: "product",
                title: "商品信息",
                render: (record: ApiResOrder.ApiResProductOrder)=>{
                    return (
                        <div>
                            {record.product.name} x {record.num}
                        </div>
                    )
                }
            },
            {
                key: "address",
                title: "收货地址",
                render: (record: ApiResOrder.ApiResProductOrder)=>{
                    return (
                        <div>
                            {record.address.province} {record.address.city} {record.address.area} {record.address.detail} {record.address.name} {record.address.mobile}
                        </div>
                    )
                }
            },
            {
                key: "status",
                title: "状态",
                filters: [
                    { text: ApiResOrder.StatusNames.WAIT_PAY, value: ApiResOrder.StatusNames.WAIT_PAY},
                    { text: "已付款", value: ApiResOrder.StatusNames.PAID},
                    { text: ApiResOrder.StatusNames.WAIT_CHINA, value: ApiResOrder.StatusNames.WAIT_CHINA},
                    { text: ApiResOrder.StatusNames.SEND, value: ApiResOrder.StatusNames.SEND},
                ],
                onFilter: (value, record)=> record.status.name.indexOf(value) !== -1,
                render: (record: ApiResOrder.ApiResProductOrder)=> {
                    return (
                        <div>
                            {record.status.name}
                            <a onClick={()=>{
                                this.setState({
                                    currentOrder: record, currentOrderStatus: record.status,
                                    showStatusChanger: true
                                });
                            }}>(更改)</a>
                        </div>
                    )
                }

            }
        ];

        return (
            <div>
                <Tb dataSource={this.state.results} columns={columns}
                    bordered
                    rowKey={record=>record.id.toString()}
                    pagination={{total: this.state.total, defaultPageSize: this.state.page_size}}
                    onChange={this.handleTableChange.bind(this)}
                />
                {this.state.showStatusChanger ?
                <StatusChangeComponent
                    overHandler={
                        (status)=>{
                            let currentOrder = this.state.currentOrder;
                            let orders = this.state.results;
                            orders.filter((order)=>order.id === currentOrder.id)[0].status = status;
                            this.setState({showStatusChanger: false, currentOrder,
                                results: orders
                            })
                        }
                    }
                   statusId={this.state.currentOrderStatus.id} orderId={this.state.currentOrder.id}/>
                : null}
            </div>
        )
    }
}