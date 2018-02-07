import * as React from 'react'
import * as STYLE from './style.css'
import {ApiResAddress as Address} from "../../../api/user/address/response";
import {apiAddressList} from "../../../api/user/address/index";
import AddressEditComponent from '../edit'

let ICON_ADDR_EDIT = require('./img/icon-pencil-edit.png');

interface State{
    items: Address[];
    showAddressEdit: boolean;
    selectedAddress: Address;
}

interface BtnCancelClick{
    ():void;
}
interface SelectedClick{
    (address: Address):void;
}

interface Props{
    btnCancelClick: BtnCancelClick;
    selectedClick: SelectedClick;
}


export default class AddressComponent extends React.Component<Props, State>{

    private showingAddressEdit: boolean;
    private newAddress: Address;

    constructor(p: Props){
        super(p);
        this.showingAddressEdit = false;
        this.newAddress = {
            id: null,
            name: "",
            mobile: "",
            detail: "",
            country: "",
            province: "",
            city: "",
            area: "",
            zipcode: ""
        };
        this.state = {
            items: [],
            showAddressEdit: false,
            selectedAddress: this.newAddress
        };
    }

    componentWillMount(){
        this.loadAddressList();
    }

    loadAddressList(){
        apiAddressList().then((addressList)=>{
            this.setState({items: addressList})
        })
    }


    render(){
        if (this.state.showAddressEdit){
            return <AddressEditComponent address={this.state.selectedAddress} overHandler={(address: Address)=>{
                this.setState({
                    showAddressEdit: false
                });
                this.showingAddressEdit = false;
                this.loadAddressList();
            }}/>
        }
        let items = this.state.items.map((item: Address)=>{
            return (
                <div className={STYLE.items} key={item.id} onClick={()=>{this.showingAddressEdit || this.props.selectedClick(item)}}>
                    <div className={STYLE.item}>
                        <div className={STYLE.name}>{item.name}</div>
                        <div className={STYLE.iconEdit} onClick={()=>{
                            this.showingAddressEdit = true;
                            this.setState({showAddressEdit: true, selectedAddress: item});
                        }}>
                            <img src={ICON_ADDR_EDIT}/>
                        </div>
                        <div className={STYLE.mobile}>{item.mobile}</div>
                    </div>
                    <div className={STYLE.item}>
                        <div className={STYLE.detail}>
                            {item.province} {item.city} {item.area} {item.detail}
                        </div>
                    </div>
                </div>
            )
        });
        return (
            <div className={STYLE.container}>
                <div className={STYLE.btnCancel} onClick={()=>this.props.btnCancelClick()}>X</div>
                {items}
                <div className={STYLE.bg} />
                <div className={STYLE.btnNew} onClick={()=>{this.setState({showAddressEdit: true, selectedAddress: this.newAddress})}}>
                    新建地址
                </div>
            </div>
        )
    }

}