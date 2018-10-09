module.exports = async (req, h) => {
    try {
      await TokenService.validateToken(req);
      return h.continue;
    } catch (err) {
      throw Utils.Error.handleError(err);
    }
  };