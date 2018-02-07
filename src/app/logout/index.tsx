import * as React from 'react'
import * as ApiLogout from '../../api/user/logout'


interface Props {
}

interface State {
}

export default class LogoutComponent extends React.Component<Props, State> {

    constructor(p: Props){
        super(p);
    }

    componentWillMount(){
        ApiLogout.apiLogout().then(()=>{ })
    };
    render(){
        return <div>已登出</div>;
    }
}