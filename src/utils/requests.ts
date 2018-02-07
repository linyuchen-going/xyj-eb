import Requests, {GeneralResCallback} from 'lycfelib/ts/requests'
import {Promise} from 'es6-promise'

class __Requests extends Requests{


    checkApiRes(res: any): Promise<any>{
        return new Promise((successCallback: GeneralResCallback, failCallback: GeneralResCallback) => {
            if (res.code === 0) {
                successCallback(res.data);
            }
            else {
                alert(res.msg);
            }
        });
    }
}

let r = new __Requests();
export default r;
