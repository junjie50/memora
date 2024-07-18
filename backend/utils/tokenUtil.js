
exports.getTokenFrom = request => {
    const authorization = request.headers.authorization;
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}