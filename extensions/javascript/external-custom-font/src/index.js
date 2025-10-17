import extension from './extension.js';
import {PLUGIN_ID, SECRET_KEY, EDITOR_URL, EMAIL_ID, USER_ID} from './creds';

// Wait for the Stripo editor script to load
function loadStripoEditor() {
    const script = document.createElement('script');
    script.id = 'UiEditorScript';
    script.src = EDITOR_URL;
    script.type = 'module';
    script.onload = _initializeEditor;
    document.head.appendChild(script);
}

// Initialize the editor
function _initializeEditor() {
    _loadDemoTemplate(template => {
        _runEditor(template, extension);
    })
}

// Run the editor with the provided template and extension
function _runEditor(template, extension) {
    window.UIEditor.initEditor(
        document.querySelector('#stripoEditorContainer'),
        {
            html: template.html,
            css: template.css,
            metadata: {
                emailId: EMAIL_ID
            },
            locale: 'en',
            onTokenRefreshRequest: function (callback) {
                _request('POST', 'https://plugins.stripo.email/api/v1/auth',
                    JSON.stringify({
                        pluginId: PLUGIN_ID,
                        secretKey: SECRET_KEY,
                        userId: USER_ID,
                        role: 'user'
                    }),
                    function(data) {
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
            extensions: [
                extension
            ]
        }
    );
}

function _request(method, url, data, callback) {
    const req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            callback(req.responseText);
        } else if (req.readyState === 4 && req.status !== 200) {
            console.error('Can not complete request. Please check you entered a valid PLUGIN_ID and SECRET_KEY values');
        }
    };
    req.open(method, url, true);
    if (method !== 'GET') {
        req.setRequestHeader('content-type', 'application/json');
    }
    req.send(data);
}

// Load demo template from GitHub
function _loadDemoTemplate(callback) {
    _request('GET', 'https://raw.githubusercontent.com/ardas/stripo-plugin/master/Public-Templates/Basic-Templates/Trigger%20newsletter%20mockup/Trigger%20newsletter%20mockup.html', null, function(html) {
        _request('GET', 'https://raw.githubusercontent.com/ardas/stripo-plugin/master/Public-Templates/Basic-Templates/Trigger%20newsletter%20mockup/Trigger%20newsletter%20mockup.css', null, function(css) {
            callback({html: html, css: css});
        });
    });
}

// Start loading when the page is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadStripoEditor);
} else {
    loadStripoEditor();
}
