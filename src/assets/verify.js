import {request} from './request';

const verify = {
    host: "free7jysj6c2.verify5.com",
    trustLevel: 5,
    valid2nd: (res, success, fail) => {
        if (res.success) {
            let verifyId = res.verifyId;
            request.get("/customer/login/verify/valid2nd", {
                params: {
                    verifyid: verifyId,
                }
            }).then(res => {
                if (res.data.success) {
                    success(res.data);
                } else {
                    fail(res.data);
                }
            }).catch((error) => {
                console.error(error);
                fail(error);
            });
        } else {
            fail(res);
        }
    }
};

export {verify};