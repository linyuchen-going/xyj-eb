import * as React from 'react'
import 'antd/dist/antd.min.css';
import {Modal} from 'antd';
import {ApiResBackendProductOrderStatus, StatusNames} from "../../../../api/backend/order/status/response";
import * as ApiBackendStatus from "../../../../api/backend/order/status";


interface Props{
    statusId: number;
    orderId: number;
    overHandler: (selectedStatus: ApiResBackendProductOrderStatus)=>void
}
interface State{
    statusList: ApiResBackendProductOrderStatus[];
    currentStatusId: number;
}

export default class StatusChangeComponent extends React.Component<Props, State>{
    constructor(p: Props){
        super(p);
        this.state = {
            statusList: [],
            currentStatusId: p.statusId,
        }
    }
    componentWillMount(){
        ApiBackendStatus.apiStatus().then((statusList)=>{
            this.setState({statusList})
        })
    }

    private getSelectedStatus():ApiResBackendProductOrderStatus{
        let filterResults = this.state.statusList.filter((i)=>i.id === this.state.currentStatusId);
        return filterResults[0];
    }

    private changeStatus(){
        ApiBackendStatus.apiChangeStatus({
            id: this.props.orderId,
            status: this.state.currentStatusId
        }).then(({})=>{
            this.props.overHandler(this.getSelectedStatus());
        })
    }

    private selectStatus(currentStatusId: string){
        this.setState({currentStatusId: parseInt(currentStatusId)})
    }

    render(){
        let statusItems = this.state.statusList.map((status)=>{
            return (
                <option key={status.id} value={status.id}>{status.name}</option>
            )
        });
        let selectedStatus = this.getSelectedStatus();
        let selectedStatusName;
        if (selectedStatus){
            selectedStatusName = selectedStatus.name;
        }
        else{
            selectedStatusName = "";
        }
        return (
            <Modal visible={true} onOk={this.changeStatus.bind(this)}
                   onCancel={()=>this.props.overHandler(this.getSelectedStatus())}
            >
                <div>
                    <div>
                        <select onChange={(e)=>this.selectStatus(e.target.value)} value={this.state.currentStatusId}>
                            {statusItems}
                        </select>
                        {selectedStatusName == StatusNames.SEND ?
                            <div style={{display: "inline-block", paddingLeft: "1rem"}}>
                                顺丰单号:
                                <input/>
                            </div>
                        : null
                        }
                    </div>
                </div>
            </Modal>
        )
    }
}
