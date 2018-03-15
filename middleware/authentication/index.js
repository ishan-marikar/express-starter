const jwt = require("jsonwebtoken");
const HTTPStatus = require("http-status");

const authentication = {
  isAuthenticated(request, response) {
    const _getToken = () => {
      if (
        request.headers.authorization &&
        request.headers.authorization.split(" ")[0] === "Bearer"
      ) {
        return request.headers.authorization.split(" ")[1];
      } else if (request.query && request.query.token) {
        return request.query.token;
      }
      return null;
    };

    let token = _getToken();
    if (!token) {
      return response.status(HTTPStatus.UNAUTHORIZED).json({
        success: false,
        statusCode: HTTPStatus.UNAUTHORIZED,
        payload: {
          status: {
            code: "authentication.unauthorized",
            message: HTTPStatus[HTTPStatus.UNAUTHORIZED]
          }
        }
      });
    }
    (function() {
      let payload;
      let errorType;
      try {
        payload = jwt.verify(token, process.env.JWT_SECRET);
      } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
          errorType = "token-error";
        } else if (error instanceof jwt.TokenExpiredError) {
          errorType = "token-expired";
        } else {
          errorType = "token-unknown";
        }
        return response.status(HTTPStatus.UNAUTHORIZED).json({
          success: false,
          statusCode: HTTPStatus.UNAUTHORIZED,
          payload: {
            status: {
              code: `authentication.${errorType}`,
              message: HTTPStatus[HTTPStatus.UNAUTHORIZED]
            }
          }
        });
      }
      // TODO: Find user via the user_id in the payload and add details into session
    })();
  }
};

module.exports = authentication;
