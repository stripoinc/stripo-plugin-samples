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
            ],
            productBlock: {
                enabled: true,
                maxCardsCount: 12,
                products: [
                    {
                        id: '1',
                        name: 'Wireless Headphones',
                        price: '$89.99',
                        vendorCode: 'B0DW48QHFY',
                        image: 'https://rf.stripocdn.email/content/guids/CABINET_6832604a6dbd8f35c4c45dc999af6fe2144259d656ce5a5ea76e6969ed796bbd/images/gc0859fd762dc386caf67532ca5d9b968b19ba37572e19b72126eb421bee4adfc410dc64eea3dee23cf33c3da5ae06b88_640.jpeg',
                        dimensions: '17 x 15 x 6 cm',
                        href: 'https://example.com/product/B0DW48QHFY'
                    },
                    {
                        id: '2',
                        name: 'Smart Watch Pro',
                        price: '$249.00',
                        vendorCode: 'B0DW48GN42',
                        image: 'https://rf.stripocdn.email/content/guids/CABINET_6832604a6dbd8f35c4c45dc999af6fe2144259d656ce5a5ea76e6969ed796bbd/images/g5b54a78c579f1641216bab7b119c28b0b3dfa50ab44655c45039c8ac164e6d1835ad29ae242af635a8efe74a03f636a0_640.jpeg',
                        dimensions: '4.7 x 4.1 x 1.2 cm',
                        href: 'https://example.com/product/B0DW48GN42'
                    },
                    {
                        id: '3',
                        name: 'Premium Leather Case',
                        price: '$39.99',
                        vendorCode: 'B0DS2WQZ2M',
                        image: 'https://rf.stripocdn.email/content/guids/CABINET_6832604a6dbd8f35c4c45dc999af6fe2144259d656ce5a5ea76e6969ed796bbd/images/gc7a4da5fc1d4a3c14ca8964200ede6290826a825cea3dc704d47db7c9938b64c099879d2feeebfb24f3ae749d85736f1_640.png',
                        dimensions: '16 x 8 x 1.2 cm',
                        href: 'https://example.com/product/B0DS2WQZ2M'
                    },
                    {
                        id: '4',
                        name: 'Yoga Mat Pro',
                        price: '$45.00',
                        vendorCode: 'B07CMS5Q6P',
                        image: 'https://rf.stripocdn.email/content/guids/CABINET_6832604a6dbd8f35c4c45dc999af6fe2144259d656ce5a5ea76e6969ed796bbd/images/g3d9ab12046aedd0dd772da9bea9768d5fba2840db28046cf73de1f1bded09ad666ef5788d4812a07ad8cfa531487251f_640.jpeg',
                        dimensions: '183 x 61 x 0.6 cm',
                        href: 'https://example.com/product/B07CMS5Q6P'
                    },
                    {
                        id: '5',
                        name: 'Resistance Bands Set',
                        price: '$29.99',
                        vendorCode: 'B0F1HX3WXX',
                        image: 'https://rf.stripocdn.email/content/guids/CABINET_6832604a6dbd8f35c4c45dc999af6fe2144259d656ce5a5ea76e6969ed796bbd/images/g939d0a14c9627c0476e3b6cdbee39819532d8823d6e23a3c2e6c651e4466402be0ea7a0384f1cd8e15d04fa52b27fa46_640.jpeg',
                        dimensions: '30 x 5 x 0.2 cm (each band)',
                        href: 'https://example.com/product/B0F1HX3WXX'
                    },
                    {
                        id: '6',
                        name: 'Smart LED Bulb',
                        price: '$19.99',
                        vendorCode: 'B0DS6S98ZF',
                        image: 'https://rf.stripocdn.email/content/guids/CABINET_6832604a6dbd8f35c4c45dc999af6fe2144259d656ce5a5ea76e6969ed796bbd/images/g2b88c1f3019297a862fe221399e7cc8a69a6e0549a7d280cdbbef815ed22d0c5b9beed9e477ca16497218e9670c152e1_640.jpeg',
                        dimensions: '12 x 6 x 6 cm',
                        href: 'https://example.com/product/B0DS6S98ZF'
                    }
                ]
            }
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
