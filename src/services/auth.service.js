import request from "./request"

// const ENDPOINT = 'api/user'

const login = async(data) => {    

    // return request.post(url,data).then((res) => {
    //     return res.data.detail;
    // });

    try{
        let res = await request({
            method:'post',
            url:'/api/user/login',
            data:data
        })

        return res;
    }
    catch(err)
    {
        console.log(err);
    }

}

const create = async(data) => {     

    try{
        let res = await request({
            method:'post',
            url:'/api/user',
            data:data
        })        
        return res;
    }
    catch(err)
    {
        console.log(err);
    }

    // return request.post(url,data).then((res) => {        
    //     return res.data.details;
    // })
}

const authService = {
    login,
    create
}

export default authService