export class ExternalAiAssistant {
  externalAiAssistant;
  dataSelectCallback = () => {};
  cancelCallback = () => {};

  constructor() {
    let div = document.createElement('div');
    div.style.visibility = 'hidden';
    div.innerHTML = '\
            <div id="externalAiAssistant" style="background-color: rgba(0,0,0,.5); overflow: hidden; position: fixed; top: 0; right: 0;  bottom: 0; left: 0; z-index: 1050; font-family: sans-serif;">\
                <div style="margin: 10px;">\
                <div style="background-color: #f6f6f6; border-radius: 17px 17px 30px 30px; max-width: 900px; margin: 0 auto;">\
                    <div style="padding: 15px; border-bottom: 1px solid #e5e5e5;">\
                        <div>\
                           <button class="close" type="button" style="cursor: pointer; background: transparent; border: 0; float: right; font-size: 21px; font-weight: bold; opacity: .2;">\
                                <span aria-hidden="true">×</span>\
                            </button>\
                            <h4 style="margin: 0; font-size: 18px; color: rgb(85, 85, 85);">Update Text</h4>\
                        </div>\
                    </div>\
                    <div style="padding: 15px;">\
                        <div style="padding: 10px">\
                            <label style="display: inline-block; width: 100px" for="text">Text</label>\
                            <textarea style="width: 500px; height: 500px" id="text"></textarea>\
                        </div>\
                    </div>\
                    <div style="padding: 20px">\
                        <button class="okButton">OK</button>\
                    </div>\
                </div>\
            </div>';
    document.body.appendChild(div);
    this.externalAiAssistant = document.getElementById('externalAiAssistant');
    this.externalAiAssistant.querySelector('.close').addEventListener('click', this.cancelAndClose.bind(this));
    document.querySelector('.okButton').addEventListener('click', (e) => this.onOkClick(e));
  }

  cancelAndClose() {
    this.close();
    this.cancelCallback();
  }

  onOkClick(e) {
    const text = this.externalAiAssistant.querySelector('#text').value;
    this.close();
    this.dataSelectCallback(text);
  }

  close() {
    this.externalAiAssistant.style.visibility = 'hidden';
  }

  openAiAssistant({value, onDataSelectCallback, onCancelCallback, type}) {
    this.externalAiAssistant.style.visibility = 'visible';
    this.dataSelectCallback = onDataSelectCallback;
    this.cancelCallback = onCancelCallback;
    this.externalAiAssistant.querySelector('#text').value = value;
  }
}