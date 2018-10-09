module.exports = {
    name: 'AccountService',
    body: AccountService
};

function AccountService() {
    return {
        signUp,
        signIn
    }
}

function signUp(userDetails) {
    try {
        const details = await _getAccountDetailsByEmailId(userDetails.email)
        if(details) {
            throw _userExist();
        }
        const hashPassword = Utils.Auth.generatePassword(userDetails.password)
        return _createUser({
            email : userDetails.email,
            user_name : userDetails.user_name,
            password : hashPassword
        });
    } catch(err) {
        throw err;
    }
}


async function signIn(userEmail, userPassword) {
    try {
        const {account_id, email, user_name, password} = await _getAccountDetailsByEmailId(userEmail).then(result => result || {});
        if (!email) {
            throw _throwInvalidCredentialsError();
        }
        const isPasswordVaild = await Utils.Auth.validatePassword(userPassword, password);
        if (!isPasswordVaild) {
        throw _throwInvalidCredentialsError();
        }
        const token = await Utils.Auth.generateJWT(_.assignIn({}, {
            account_id,
            email,
            user_name
        }));
        //await _addJWTInDb(token, account_id);
        return {
            token,
            account: {account_id, user_name},
        };
    } catch (err) {
        throw err;
    }
}

function _getAccountDetailsByEmailId(email) {
    return ModelAccount.find({
        where : {
            email : email,
            is_active : true
        }
    });
}

function _createUser(userDetails) {
    return ModelAccount.create(userDetails);
}

// function _addJWTInDb() {

// }