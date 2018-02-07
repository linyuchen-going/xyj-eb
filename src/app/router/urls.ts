
export const index = '/';

export interface OrderConfirmParam{
    productId: number;
}

export const orderConfirm = (productId: (":productId" | number)= ":productId")=> {
    return `/order-confirm/${productId}`;
};


export const addressEdit = '/address-edit';
export const addressSelect = '/address-select';
export const inviteCode = '/invite-code';
export const orders = `/orders`;
export const logout = `/logout`;

const backendPath = `/backend`;
export const backendOrders = `${backendPath}/orders`;

export function go(url: string){
    url = "#" + url;
    location.href = url;
}

