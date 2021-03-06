var self = require('sdk/self');
var url = require("sdk/url").URL;

// a dummy function, to show how tests work.
// to see how to test this function, look at test/test-index.js
function dummy(text, callback) {
    callback(text);
}
const MediatorApi = function (host, username, password, verbose, strictSSL) {
    this.host = host;
    this.username = username;
    this.password = password;

    if (strictSSL === undefined) {
        strictSSL = false;
    }

    this.strictSSL = strictSSL;
    this.request = require("sdk/request").Request;
    this.base64 = require("sdk/base64");


    if (verbose !== true) {
        logger = {
            log: function () {
            }
        };
    }

    this.makeUri = function (pathname) {
        var basePath = "/services/api";
        const urlPath = this.host + basePath + pathname;
        var uri = new url(urlPath);
        console.log(uri.toString());
        return uri.toString();
    };


    this.doRequest = (options, callback, methodType) => {
        if (this.username !== null && this.password !== null) {
            var credentials = "Basic " +
                this.base64.encode(this.username + ":" + this.password, "utf-8");
            logger.log("Encoded credentials: " + credentials);
            if (options.headers) {
                options.headers.push({"Authorization": credentials});
            }
            else {
                options.headers = {"Authorization": credentials};
            }
        }
        if (options.headers) {
            options.headers.push({"Accept": "application/json"});
        }
        else {
            options.headers = {Accept: "application/json"};
        }
        options.contentType = "application/json";
        options.onComplete = callback;

        switch (methodType) {
            case "GET":
                this.request(options).get();
                break;
            case "HEAD":
                this.request(options).head();
                break;
            case "POST":
                this.request(options).post();
                break;
            case "PUT":
                this.request(options).put();
                break;
            case "DELETE":
                this.request(options).delete();
                break;
            default:
                throw "Invalid method invocation";
        }
    };
};

MediatorApi.prototype.listProjects = function (callback) {
    var options = {
        url: this.makeUri("/projects"),
        anonymous: this.strictSSL
    };

    this.doRequest(options, function (response) {
        if (response.status === 400) {
            callback(response.statusText + ": doesn't exist " + response.text);
            return;
        }
        if (response.status !== 200) {
            callback(response.statusText + ": something is definitely wrong " + response.text);
            return;
        }
        callback(null, response.json);
    }, "GET");
};

MediatorApi.prototype.getProject = function (projectKey, callback) {
    var options = {
        url: this.makeUri("/projects/" + projectKey),
        anonymous: this.strictSSL
    };

    this.doRequest(options, function (response) {
        if (response.status === 400) {
            callback(response.statusText + ": doesn't exist");
            return;
        }
        if (response.status !== 200) {
            callback(response.statusText + ": something is definitely wrong " + response.text);
            return;
        }
        callback(null, response.json);
    }, "GET");
};

MediatorApi.prototype.listProjectIssues = function (projectKey, callback) {
    var options = {
        url: this.makeUri("/projects/" + projectKey + "/issues"),
        anonymous: this.strictSSL
    };

    this.doRequest(options, function (response) {
        if (response.status === 400) {
            callback(response.statusText + ": doesn't exist");
            return;
        }
        if (response.status !== 200) {
            callback(response.statusText + ": something is definitely wrong " + response.text);
            return;
        }
        callback(null, response.json);
    }, "GET");
};


MediatorApi.prototype.getIssue = function (issueKey, callback) {
    var options = {
        url: this.makeUri("/issues/" + issueKey),
        anonymous: this.strictSSL
    };

    this.doRequest(options, function (response) {
        if (response.status === 400) {
            callback(response.statusText + ": doesn't exist");
            return;
        }
        if (response.status !== 200) {
            callback(response.statusText + ": something is definitely wrong " + response.text);
            return;
        }
        callback(null, response.json);
    }, "GET");
};

MediatorApi.prototype.createIssue = function (issue, callback) {
    var options = {
        url: this.makeUri("/issues"),
        anonymous: this.strictSSL,
        content: JSON.stringify(issue)
    };

    this.doRequest(options, function (response) {
        if (response.status === 400) {
            callback(response.statusText + ": doesn't exist");
            return;
        }
        if (response.status !== 201) {
            callback(response.statusText + ": something is definitely wrong " + response.text);
            return;
        }
        callback(null, response.json);
    }, "POST");
};

MediatorApi.prototype.storyStart = function (storyKey, callback) {
    var options = {
        url: this.makeUri("/issue/" + storyKey + "/status/start"),
        anonymous: this.strictSSL
    };

    this.doRequest(options, function (response) {
        if (response.status === 400) {
            callback(response.statusText + " : doesn't exist");
            return;
        }
        else if (response.status !== 200) {
            callback(response.statusText + ": something definitely is wrong( " + response.text);
            return;
        }
        callback(null, response.json);
    }, "PUT");
};

MediatorApi.prototype.storyResolve = function (storyKey, callback) {
    var options = {
        url: this.makeUri("/issue/" + storyKey + "/status/resolve"),
        anonymous: this.strictSSL
    };

    this.doRequest(options, function (response) {
        if (response.status === 400) {
            callback(response.statusText + " : doesn't exist");
            return;
        }
        else if (response.status !== 200) {
            callback(response.statusText + ": something definitely is wrong( " + response.text);
            return;
        }
        callback(null, response.json);
    }, "PUT");
};

MediatorApi.prototype.storyApprovalRequest = function (storyKey, callback) {
    var options = {
        url: this.makeUri("/issue/" + storyKey + "/status/request-approval"),
        anonymous: this.strictSSL
    };

    this.doRequest(options, function (response) {
        if (response.status === 400) {
            callback(response.statusText + " : doesn't exist");
            return;
        }
        else if (response.status !== 200) {
            callback(response.statusText + ": something definitely is wrong( " + response.text);
            return;
        }
        callback(null, response.json);
    }, "PUT");
};

MediatorApi.prototype.storyApprove = function (storyKey, callback) {
    var options = {
        url: this.makeUri("/issue/" + storyKey + "/status/approve"),
        anonymous: this.strictSSL
    };

    this.doRequest(options, function (response) {
        if (response.status === 400) {
            callback(response.statusText + " : doesn't exist");
            return;
        }
        else if (response.status !== 200) {
            callback(response.statusText + ": something definitely is wrong( " + response.text);
            return;
        }
        callback(null, response.json);
    }, "PUT");
};

MediatorApi.prototype.storyReject = function (storyKey, callback) {
    var options = {
        url: this.makeUri("/issue/" + storyKey + "/status/reject"),
        anonymous: this.strictSSL
    };

    this.doRequest(options, function (response) {
        if (response.status === 400) {
            callback(response.statusText + " : doesn't exist");
            return;
        }
        else if (response.status !== 200) {
            callback(response.statusText + ": something definitely is wrong( " + response.text);
            return;
        }
        callback(null, response.json);
    }, "PUT");
};

MediatorApi.prototype.listSessions = function (callback) {
    var options = {
        url: this.makeUri("/sessions"),
        anonymous: this.strictSSL
    };

    this.doRequest(options, function (response) {
        if (response.status === 400) {
            callback(response.statusText + " : doesn't exist");
            return;
        }
        else if (response.status !== 200) {
            callback(response.statusText + ": something definitely is wrong( " + response.text);
            return;
        }
        callback(null, response.json);
    }, "GET");
};

MediatorApi.prototype.getSession = function (sessionsKey, callback) {
    var options = {
        url: this.makeUri("/sessions/" + sessionsKey),
        anonymous: this.strictSSL
    };

    this.doRequest(options, function (response) {
        if (response.status === 400) {
            callback(response.statusText + " : doesn't exist");
            return;
        }
        if (response.status === 404) {
            callback(null, null);
            return;
        }
        else if (response.status !== 200) {
            callback(response.statusText + ": something definitely is wrong( " + response.text);
            return;
        }
        callback(null, response.json);
    }, "GET");
};

MediatorApi.prototype.listSessionCaptures = function (sessionKey, callback) {
    var options = {
        url: this.makeUri("/sessions/" + sessionKey + "/capture"),
        anonymous: this.strictSSL
    };

    this.doRequest(options, function (response) {
        if (response.status === 400) {
            callback(response.statusText + " : doesn't exist");
            return;
        }
        else if (response.status !== 200) {
            callback(response.statusText + ": something definitely is wrong( " + response.text);
            return;
        }
        callback(null, response.json);
    }, "GET");
};

MediatorApi.prototype.saveCapture = function (sessionKey, capture, callback) {
    var options = {
        url: this.makeUri("/sessions/" + sessionKey + "/capture"),
        content: JSON.stringify(capture),
        anonymous: this.strictSSL
    };

    this.doRequest(options, function (response) {
        if (response.status === 400) {
            callback(response.statusText + " : doesn't exist");
            return;
        }
        else if (response.status !== 200) {
            callback(response.statusText + ": something definitely is wrong( " + response.text);
            return;
        }
        callback(null, response.json);
    }, "POST");
};

MediatorApi.prototype.updateCapture = function (sessionKey, capture, callback) {
    var options = {
        url: this.makeUri("/sessions/" + sessionKey + "/capture/" + capture.id),
        content: JSON.stringify(capture),
        anonymous: this.strictSSL
    };

    this.doRequest(options, function (response) {
        if (response.status === 400) {
            callback(response.statusText + " : doesn't exist");
            return;
        }
        else if (response.status !== 200) {
            callback(response.statusText + ": something definitely is wrong( " + response.text);
            return;
        }
        callback(null, "Success");
    }, "PUT");
};

MediatorApi.prototype.deleteCapture = function (sessionKey, capture, callback) {
    var options = {
        url: this.makeUri("/sessions/" + sessionKey + "/capture/" + capture.id),
        anonymous: this.strictSSL
    };

    this.doRequest(options, function (response) {
        if (response.status === 400) {
            callback(response.statusText + " : doesn't exist");
            return;
        }
        else if (response.status !== 200) {
            callback(response.statusText + ": something definitely is wrong( " + response.text);
            return;
        }
        callback(null, "Success");
    }, "DELETE");
};

MediatorApi.prototype.startSession = function (sessionKey, callback) {
    var options = {
        url: this.makeUri("/sessions/" + sessionKey + "/start"),
        anonymous: this.strictSSL
    };

    this.doRequest(options, function (response) {
        if (response.status === 400) {
            callback(response.statusText + " : doesn't exist");
            return;
        }
        else if (response.status !== 200) {
            callback(response.statusText + ": something definitely is wrong( " + response.text);
            return;
        }
        callback(null, response.json);
    }, "PUT");
};

MediatorApi.prototype.stopSession = function (sessionKey, callback) {
    var options = {
        url: this.makeUri("/sessions/" + sessionKey + "/stop"),
        anonymous: this.strictSSL
    };

    this.doRequest(options, function (response) {
        if (response.status === 400) {
            callback(response.statusText + " : doesn't exist");
            return;
        }
        else if (response.status !== 200) {
            callback(response.statusText + ": something definitely is wrong( " + response.text);
            return;
        }
        callback(null, response.json);
    }, "PUT");
};

MediatorApi.prototype.pauseSession = function (sessionKey, callback) {
    var options = {
        url: this.makeUri("/sessions/" + sessionKey + "/pause"),
        anonymous: this.strictSSL
    };

    this.doRequest(options, function (response) {
        if (response.status === 400) {
            callback(response.statusText + " : doesn't exist");
            return;
        }
        else if (response.status !== 200) {
            callback(response.statusText + ": something definitely is wrong( " + response.text);
            return;
        }
        callback(null, response.json);
    }, "PUT");
};

MediatorApi.prototype.buildHierarchy = function (storyKey, callback) {
    var options = {
        url: this.makeUri("/sessions/" + storyKey + "/generate"),
        anonymous: this.strictSSL
    };

    this.doRequest(options, function (response) {
        if (response.status === 400) {
            callback(response.statusText + " : doesn't exist");
            return;
        }
        else if (response.status !== 200) {
            callback(response.statusText + ": something definitely is wrong( " + response.text);
            return;
        }
        callback(null, response.text);
    }, "POST");
};

MediatorApi.prototype.transitionIssue = function (issueKey, transitionId, callback) {
    var options = {
        url: this.makeUri("/issue/" + issueKey + "/transition/" + transitionId),
        anonymous: this.strictSSL
    };

    this.doRequest(options, function (response) {
        if (response.status === 400) {
            callback(response.statusText + " : doesn't exist");
            return;
        }
        else if (response.status !== 200) {
            callback(response.statusText + ": something definitely is wrong( " + response.text);
            return;
        }
        callback(null, response.json);
    }, "PUT");
};


exports.MediatorApi = MediatorApi;
