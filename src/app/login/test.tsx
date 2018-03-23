import * as React from 'react'
import * as ApiLogin from '../../api/user/login';


interface Props {
}

interface State {
}

export default class Component extends React.Component<Props, State> {
    componentWillMount(){
        ApiLogin.apiLoginTest().then(()=>{})
    }
    render(){
        return(<div>登录成功</div>)
    }

}