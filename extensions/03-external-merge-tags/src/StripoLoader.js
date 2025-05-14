import {EDITOR_URL, PLUGIN_ID, SECRET_KEY} from './const';

export function initPlugin(extension) {
    loadDemoTemplate(template => {
        runPlugin(template, extension);
    });
}

function runPlugin(template, extension) {
    const script = document.createElement('script');
    script.id = 'UiEditorScript';
    script.type = 'module';
    script.src = EDITOR_URL;
    script.onload = function () {
        if (!PLUGIN_ID || !SECRET_KEY) {
            document.getElementById("no_plugin_id_info").style.display = "block";
            return;
        }

        window.UIEditor.initEditor(
            document.querySelector('#stripoEditorContainer'),
            {
                html: template.html,
                css: template.css,
                metadata: {
                    emailId: `plugin_${PLUGIN_ID}_demo_1`,
                    userId: '1',
                    username: 'Plugin Demo User',
                    avatarUrl: 'https://plugin.stripocdn.email/content/guids/CABINET_eab4e7d5a4603ac03f4120652a3a5a540f0c79c688514939f095f67433ed4a67/images/photo256.png'
                },
                locale: 'en',
                onTokenRefreshRequest: function (callback) {
                    request('POST', 'https://plugins.stripo.email/api/v1/auth',
                        JSON.stringify({
                            pluginId: PLUGIN_ID,
                            secretKey: SECRET_KEY,
                            userId: '12',
                            role: 'user'
                        }),
                        function (data) {
                            callback(JSON.parse(data).token);
                        }
                    );
                },
                codeEditorButtonSelector: '#codeEditor',
                undoButtonSelector: '#undoButton',
                redoButtonSelector: '#redoButton',
                versionHistoryButtonSelector: '#versionHistoryButton',
                mobileViewButtonSelector: '#mobileViewButton',
                desktopViewButtonSelector: '#desktopViewButton',
                ignoreClickOutsideSelectors: ['#externalMergeTags'],
                extensions: [
                    extension
                ]
            }
        );
    };
    document.body.appendChild(script);
}

function request(method, url, data, callback) {
    const req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            callback(req.responseText);
        } else if (req.readyState === 4 && req.status !== 200) {
            console.error('Can not complete request. Please check if you have a valid PLUGIN_ID and SECRET_KEY values');
        }
    };
    req.open(method, url, true);
    if (method !== 'GET') {
        req.setRequestHeader('content-type', 'application/json');
    }
    req.send(data);
}

function loadDemoTemplate(callback) {
    request('GET', 'https://raw.githubusercontent.com/ardas/stripo-plugin/master/Public-Templates/Basic-Templates/Trigger%20newsletter%20mockup/Trigger%20newsletter%20mockup.html', null, function(html) {
        request('GET', 'https://raw.githubusercontent.com/ardas/stripo-plugin/master/Public-Templates/Basic-Templates/Trigger%20newsletter%20mockup/Trigger%20newsletter%20mockup.css', null, function(css) {
            callback({html: html, css: css});
        });
    });
}
