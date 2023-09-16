import request from "./request";

const search = async(data) => {    

    try{
        let res = await request({
            method:'get',
            url:`/api/book/search?keyword=${data}`
        })

        return res;
    }
    catch(err)
    {
        console.log(err);
    }
}

// const pagewise = async(data) => {    

//     try{
//         let res = await request({
//             method:'get',
//             url:`/api/book?pageSize=10&pageIndex=0&keyword=${data}`
//         })

//         return res;
//     }
//     catch(err)
//     {
//         console.log(err);
//     }
// }

const getById = async(id) => {
    try{
        let res = await request({
            method:'get',
            url:`api/book/byId?id=${id}`
        })

        return res;
    }
    catch(err)
    {
        console.log(err);
    }
}

const getAll = async(params) => {
    try{
        let res = await request({
            method:'get',
            url:`api/book`,
            params:params        
        })
        
        return res;
    }
    catch(err)
    {
        console.log(err);
    }
}

const save = async(data) => {

    try{
        if(data.id)
        {
            let res = await request({
                method:'put',
                url:`api/book`,
                data:data
            })
    
            return res;
        }
        else
        {
            let res = await request({
                method:'post',
                url:`api/book`,
                data:data
            })

            return res;
        }
    }
    catch(err)
    {
        console.log(err);
    }
}

const deleteBook = async(id) => {

    try{
        let res = await request({
            method:'delete',
            url:`api/book?id=${id}`
        })

        return res;
    }
    catch(err)
    {
        console.log(err);
    }
}

const bookService = {
    search,
    getById,
    // pagewise,
    getAll,
    save,
    deleteBook
}

export default bookService