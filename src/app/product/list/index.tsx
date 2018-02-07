import * as React from 'react'

interface Product{
    name: string;
    price: number;
}

interface Props{}
interface State{
    products: Product[];
}

export default class ProductComponent extends React.Component<Props, State>{
    constructor(p: Props){
        super(p);
    }

    renderMoreList(){
        let items = this.state.products.map((item: Product)=>{
            return (
                <div>
                    <div>{item.name}</div>
                </div>
            )
        });
        return (
            <div>
                {items}
            </div>
        )
    }
}
