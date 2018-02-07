import host from '../host'

let apiPathProduct = `${host}/api/product`;

export const apiUrlProductDetail = (id: number) => `${apiPathProduct}/${id}`;
export const apiUrlAllProducts = `${apiPathProduct}/all`;
