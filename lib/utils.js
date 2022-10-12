const config = require('../config.json');

module.exports = { 
	fetch: require('node-fetch'),
	broadcastMsg: (broadStr,err) => {
	        if (err == true) {
	                console.error(broadStr);
	                module.exports.sendWebhook('RevoFi Bot Error: ' + broadStr);
	        } else {
	                console.log(broadStr);
	                module.exports.sendWebhook('RevoFi Bot: ' + broadStr);
	        }
	},
	errorReport: (msg) => { module.exports.broadcastMsg(msg,true) },
	sendWebhook: (webhookMsg) => {
	        var params = { content: webhookMsg }
	        module.exports.fetch(config.webhookURL, {
	                method: "POST",
	                headers: { 'Content-type': 'application/json' },
	                body: JSON.stringify(params)
	        }).then(res => {
			// uncommend below for debugging webhook issues
	                //console.log('Webhook message successful: ' + webhookMsg);
	        }).catch(error => module.exports.errorReport('Error on Webhook:' + error));
	},
};


