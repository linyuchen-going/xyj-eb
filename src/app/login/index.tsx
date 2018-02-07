import * as React from 'react';
import {apiUrlImgCode} from "../../api/verify-code/img-code/url";
import * as ApiLogin from '../../api/user/login';
import * as STYLE from './style.css';
import {apiSmsCode} from "../../api/verify-code/sms-code/index";


interface Props {
    // successHandler: ()=>void;
    // cancelHandler: ()=>void;
}

interface State {
    loginSuccess: boolean;
    mobile: string;
    imgCode: string;
    imgCodeCount: number; // 获取图片验证码次数验证码
    smsCode: string;
    smsCodeSend: boolean;
}

export default class LoginComponent extends React.Component<Props, State> {

    constructor(p: Props){
        super(p);
        this.state = {
            loginSuccess: true,
            mobile: "",
            imgCode: "",
            smsCode: "",
            smsCodeSend: false,
            imgCodeCount: 1
        }
    }

    componentWillMount(){
        ApiLogin.apiLoginStatus().then((res)=>{
            this.setState({loginSuccess: res.status});
        })
    }

    private login(){
        ApiLogin.apiLoginSms({code: this.state.smsCode}).then(()=>{
            // this.setState({loginSuccess: true});
            location.reload()
        })
    }

    private sendSmsCode(){
        if (this.state.smsCodeSend){
            return;
        }
        apiSmsCode({
            imgcode: this.state.imgCode,
            mobile: this.state.mobile
        }).then(()=>{
            this.setState({smsCodeSend: true})
        })
    }

    render(){
        if (this.state.loginSuccess){
            return null;
        }
        return (
            <div>
                <div className={STYLE.bg} />
                <div className={STYLE.container}>
                    <div className={STYLE.header}>
                        {/*<div className={STYLE.btnCancel}>X</div>*/}
                    </div>
                    <div className={STYLE.body}>
                        <div className={STYLE.inputItem}>
                            <div>手机号:</div>
                            <div><input type="number" onChange={(e)=>this.setState({mobile: e.target.value})}/></div>
                        </div>
                        <div>
                            <div className={STYLE.imgCode} onClick={()=>{this.setState({imgCodeCount: this.state.imgCodeCount + 1})}}>
                                <img src={`${apiUrlImgCode}?${this.state.imgCodeCount}`}/>
                            </div>
                            <div className={STYLE.inputItem}>
                                <div>图片验证码:</div>
                                <div><input className={STYLE.imgCodeInput} onChange={(e)=>this.setState({imgCode: e.target.value})}/></div>
                                <div className={STYLE.btnSendSmsCode} onClick={this.sendSmsCode.bind(this)}>
                                    {this.state.smsCodeSend ? "已发送": "获取短信验证码"}
                                    </div>
                            </div>
                        </div>
                        <div className={STYLE.inputItem}>
                            <div>短信验证码:</div>
                            <div><input type="text" onChange={(e)=>this.setState({smsCode: e.target.value})}/></div>
                        </div>
                    </div>
                    <div>
                        <div className={STYLE.btnOK} onClick={this.login.bind(this)}>
                            确定
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
