import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {HashRouter, Switch, Route} from 'react-router-dom'
import ProductComponent from './product/detail'
import OrderConfirmComponent from './order/confirm'
import OrderListComponent from './order/list'
import AddressEditComponent from './address/edit'
import AddressSelectComponent from './address/select'
import InviteCordsComponent from './invite-code'
import * as RouterUrls from './router/urls'
import LogoutComponent from "./logout/index";


let root = document.createElement("div");
document.body.appendChild(root);

ReactDOM.render((
    <HashRouter>
        <Switch>
            <Route path={RouterUrls.index} exact component={ProductComponent}/>
            <Route path={RouterUrls.orderConfirm()} exact component={OrderConfirmComponent}>
            </Route>
            <Route path={RouterUrls.orders} exact component={OrderListComponent}/>
            <Route path={RouterUrls.addressEdit} exact component={AddressEditComponent}/>
            <Route path={RouterUrls.addressSelect} exact component={AddressSelectComponent}/>
            <Route path={RouterUrls.inviteCode} exact component={InviteCordsComponent}/>

            <Route path={RouterUrls.logout} exact component={LogoutComponent}/>

        </Switch>
    </HashRouter>
), root);
