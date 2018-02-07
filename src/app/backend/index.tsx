
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import BackendOrdersComponent from './orders'

let root = document.createElement("div");
document.body.appendChild(root);

ReactDOM.render((<BackendOrdersComponent/>), root);