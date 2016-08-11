module.exports = function(key, fn) {

	if ('test' === key)
		return fn(null, { id: '1', name: 'John Dorian'})
	else
		return fn(null, null)

}