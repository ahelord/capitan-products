function formatError(message,error,req) {
	error.name = req.method+' '+req.baseUrl;
	return error;
}

module.exports = {
	formatError : formatError,
};