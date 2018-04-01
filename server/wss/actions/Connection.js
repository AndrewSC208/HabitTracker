const Connection = (ws, req) => {
    const location = url.parse(req.url, true);

    console.log('LOCATION FROM CONNECTED SOCKET: ', location);
    console.log('SOCKET: ', ws);

    // You might use location.query.access_token to authenticate or share sessions
    // or req.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

    // todo: auth
    // todo: register socket in redis has map for later lookup
};

export default Connection;