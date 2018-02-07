import * as React from 'react'
import * as STYLE from './style.css'
import {ApiResAddress as Address} from "../../../api/user/address/response";
import {apiAddress} from "../../../api/user/address/index";

interface OverHandler{
    (address: Address | null): void; // 取消时address为null
}

interface State{
    address: Address;
}
interface Props{
    address: Address;
    overHandler: OverHandler;
}


export default class AddressEditComponent extends React.Component<Props, State>{

    componentWillMount(){
        this.setState({
            address: this.props.address
        })
    }

    save(){
        let address = this.state.address;
        address.country = "中国";
        address.zipcode = "200000";
        apiAddress(address).then((address)=>{
            this.props.overHandler(address);
        });

    }

    updateAddressItem(key: string, value: string){

        let {address} = this.state;
        address[key] = value;
        this.setState({
            address
        })
    }


    render(){
        let {address} = this.state;
        let changeHandler = (key: string)=>{
          return (v: any)=>{
              this.updateAddressItem(key, v.target.value);
          }
        };
        return (
            <div className={STYLE.container}>
                <div className={STYLE.btnCancel} onClick={()=>this.props.overHandler(null)}>X</div>
                <div className={STYLE.items}>
                    <div className={STYLE.itemName}>
                        <input placeholder="收货人姓名" value={address.name} onChange={changeHandler("name")}/>
                    </div>
                    <div className={STYLE.itemMobile}>
                        <input placeholder="手机号" type="number" value={address.mobile} onChange={changeHandler("mobile")}/>
                    </div>
                </div>
                <div className={STYLE.items}>
                    <div className={STYLE.itemProvince}>
                        <input placeholder="省" value={address.province} onChange={changeHandler("province")}/>
                    </div>
                    <div className={STYLE.itemCity}>
                        <input placeholder="市" value={address.city} onChange={changeHandler("city")}/>
                    </div>
                    <div className={STYLE.itemArea}>
                        <input placeholder="区/县" value={address.area} onChange={changeHandler("area")}/>
                    </div>
                </div>
                <div className={STYLE.itemDetail}>
                    <textarea placeholder="详细地址" value={address.detail} onChange={changeHandler("detail")}/>
                </div>
                <div className={STYLE.btnSave} onClick={()=>{this.save()}}>保存</div>
                <div className={STYLE.bg} />
            </div>
        )
    }

}