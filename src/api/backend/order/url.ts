import parentPath from '../url'


const orderPath = `${parentPath}/order`;

export default orderPath;

export const apiUrlOrders = (page: number)=>`${orderPath}?p=${page}`;
