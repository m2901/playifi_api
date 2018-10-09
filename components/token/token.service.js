
module.exports = {
    name: 'TokenService',
    body: TokenService
  };
  
  function TokenService() {
    return {
        getTokenDetails,
        validateToken
    };
  }
  
  async function getTokenDetails(req) {
    //getJwt
    //validateJwt
  }
  
  async function validateToken(req) {
        //getTokenDetails
        //checkTokenInDb
  }
  