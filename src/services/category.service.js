import request from "./request";

const getAll = async (params) => {

    try{

        let url;
        if(params)
            url='/api/category'
        else
            url='/api/category/all'

        let res = await request({
            method:'get',
            url:url,
            params:params            
        })

        return res;
    }
    catch(err)
    {
        console.log(err);
    }
};

const getById = async(id) => {

    try{
        let res = await request({
            method:'get',
            url:`api/category/byId?id=${id}`
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
        let res;
        if(data.id)
        {
            res = await request({
                method:'put',
                url:`api/category`,
                data:data
            })
        }
        else
        {
            res = await request({
                method:'post',
                url:`api/category`,
                data:data
            })
        }

        return res;
    }
    catch(err)
    {
        console.log(err);
    }
}

const deleteCategory = async(id) => {
    try{

        let res = await request({
            method:'delete',
            url:`api/category?id=${id}`            
        })
        return res;
    }
    catch(err)
    {
        console.log(err);
    }
}

const categoryService = {
    getAll,
    getById,
    save,
    deleteCategory
}

export default categoryService