import request from "./request";

const getList = async(id) => {

    try{
        let res = await request({
            method:'get',
            url:`api/cart?userId=${id}`
        })

        return res;
    }
    catch(err)
    {
        console.log(err);
    }    
}

const add = async(data) => {
    try{

        let res = await request({
            method:'post',
            url:`api/cart`,
            data:data
        })

        return res;
    }
    catch(err)
    {
        console.log(err);
    }
}

const updateItem = async(data) => {

    try{
        let res = await request({
            method:'put',
            url:`api/cart`,
            data:data            
        })

        return res;
    }
    catch(err)
    {
        console.log(err);
    }
}

const removeItem = async(id) => {

    try{
        let res = request({
            method:'delete',
            url:`api/cart?id=${id}`,                        
        })

        return res;
    }
    catch(err)
    {
        console.log(err);
    }

}

const cartService = {
    getList,
    add,
    updateItem,
    removeItem
}

export default cartService