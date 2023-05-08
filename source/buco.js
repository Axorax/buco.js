const https = require('https');
const http = require('http');

export const buco = {
    'get': (string, options) => {
        const url = new URL(string);
        const promise = new Promise((resolve, reject) => {
            const request_options = {
                method: 'GET',
                hostname: url.host,
                path: url.pathname + url.search,
                ...options
            };

            if (!Boolean("headers" in request_options)) {
                request_options["headers"] = {};
                request_options["headers"]["User-Agent"] = "buco-js";
            } else if (!Boolean("User-Agent" in request_options.headers)) {
                request_options["headers"]["User-Agent"] = "buco-js";
            }

            function request_error(error) {
                console.error(error);
                reject("Something went wrong...");
            }

            function manage_request(request) {
                let body = "";

                request.on("data", (chunk) => {
                    body += chunk;
                });

                request.on("end", () => {
                    try {
                        if ("json" in request_options && request_options.json == true) {
                            body = JSON.parse(body);
                        }
    
                        resolve(body)
                    } catch (error) {
                        request_error(error);
                    };
                });
            }

            if (url.protocol == 'https:') {
                https.get(request_options, (request) => {
                    manage_request(request);
                }).on("error", (error) => {
                    request_error(error);
                });
            } else {
                http.get(request_options, (request) => {
                    manage_request(request);
                }).on("error", (error) => {
                    request_error(error);
                });
            }
        });

        promise.json = async function() {
            const response = await this;
            return JSON.parse(response);
        };

        return promise;
    },

    post: function (string, options) {
        const promise = new Promise((resolve, reject) => {
            const url = new URL(string);

            const request_options = {
                method: 'POST',
                hostname: url.host,
                path: url.pathname + url.search,
                ...options
            };

            if (!Boolean("headers" in request_options)) {
                request_options["headers"] = {};
                request_options["headers"]["User-Agent"] = "buco-js";
            } else if (!Boolean("User-Agent" in request_options.headers)) {
                request_options["headers"]["User-Agent"] = "buco-js";
            }

            function manage_response(response) {
                let body = '';

                response.on('data', chunk => body += chunk);

                response.on('end', () => {
                    try {
                        if ("json" in request_options && request_options.json == true) {
                            body = JSON.parse(body);
                        } else {
                            switch (response.headers['content-type']) {
                                case 'application/json':
                                    body = JSON.parse(body);
                            }
                        }
    
                        resolve(body)
                    } catch (error) {
                        request_error(error);
                    };
                });
            };

            if (url.protocol == 'https:') {
                const request = https.request(request_options, response => {
                    manage_response(response);
                })
                request.on('error', reject);
                if (request_options.body) {
                    request.write(request_options.body);
                }
                request.end();
            } else {
                const request = http.request(request_options, response => {
                    manage_response(response);
                })
                request.on('error', reject);
                if (request_options.body) {
                    request.write(request_options.body);
                }
                request.end();
            }
        });

        promise.json = async function() {
            const response = await this;
            return JSON.parse(response);
        };

        return promise;
    }
};

export default buco;