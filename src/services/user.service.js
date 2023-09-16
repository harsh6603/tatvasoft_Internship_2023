import request from "./request";

const getAllUsers = async(params) => {

    try{
        let res = await request({
            url:'api/user',
            method:'get',
            params:params
        })

        return res;
    }
    catch(err)
    {
        console.log(err);
    }
}

const getById = async(id) => {
    try{
        let res = await request({
            url:`api/user/byId?id=${id}`,
            method:'get'
        })

        return res;
    }
    catch(err)
    {
        console.log(err);
    }
}

const getAllRoles = async() => {
    try{
        let res =await request({
            method:'get',
            url:`api/user/roles`            
        })

        return res;
    }
    catch(err)
    {
        console.log(err);
    }
}

const update = async(data) => {
    try{
        let res = await request({
            method:'put',
            url:`api/user`,
            data:data
        })

        return res;
    }
    catch(err)
    {
        console.log(err);
    }
}

const deleteUser = async(id) => {
    try{
        let res = await request({
            method:'delete',
            url:`api/user/Delete?id=${id}`
        })

        return res;
    }
    catch(err)
    {
        console.log(err);
    }
}

const userService = {
    getAllUsers,
    getById,
    getAllRoles,
    update,
    deleteUser
}

export default userService;