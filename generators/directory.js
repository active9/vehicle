module.exports = {
    	properties: {
    		location: {
        		pattern: /^([A-Za-z]:)(\\[A-Za-z_\-\s0-9\.]+)+$|^([A-Za-z]:)(\/[A-Za-z_\-\s0-9\.]+)+$/,
        		message: 'Directory must be only letters, spaces, or dashes',
        		required: true
		}
	}
}