import request from "./request";

const placeOrder = async(data) => {
    try{

        let res = await request({
            method:'post',
            url:`api/order`,
            data:data
        })

        return res;
    }
    catch(err)
    {
        console.log(err);
    }
}

const orderService = {
    placeOrder
}

export default orderService;