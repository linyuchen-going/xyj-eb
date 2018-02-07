import HOST from '../host'

const productOrderPath = `${HOST}/api/order/product`;

export default productOrderPath;

export const apiUrlProductOrders = `${productOrderPath}/all`;

export const apiUrlNewProductOrder = `${productOrderPath}/new`;

export const apiUrlProductOrderDetail = (id: number)=> `${productOrderPath}/${id}`;

