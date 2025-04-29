export class ExternalMergeTagsLibrary {
  externalLibrary;
  selectedMergetag = null;
  dataSelectCallback = () => {};

  constructor() {
    let div = document.createElement('div');
    div.style.visibility = 'hidden';
    div.innerHTML = '\
             <div id="externalMergeTags" style="background-color: rgba(0,0,0,.5); overflow: hidden; position: fixed; top: 0; right: 0;  bottom: 0; left: 0; z-index: 1050; font-family: sans-serif;">\
                <div style="margin: 10px;">\
                <div style="background-color: #f6f6f6; border-radius: 17px 17px 30px 30px; max-width: 900px; margin: 0 auto;">\
                    <div style="padding: 15px; border-bottom: 1px solid #e5e5e5;">\
                        <div>\
                           <button class="close" type="button" style="cursor: pointer; background: transparent; border: 0; float: right; font-size: 21px; font-weight: bold; opacity: .2;">\
                                <span aria-hidden="true">×</span>\
                            </button>\
                            <h4 style="margin: 0; font-size: 18px; color: rgb(85, 85, 85);">Your merge tags</h4>\
                        </div>\
                    </div>\
                    <div style="padding: 15px;">\
                        <div class="thumbnail" tag-value="*|FNAME|*" tag-label="John Doe" style="display: inline-block; width: 154px; height: 120px; cursor: pointer; padding: 4px; background-color: #ffffff; border: 1px solid #b80000; border-radius: 10px; margin-right: 10px">\
                            Merge Tag Name\
                        </div>\
                        <div class="thumbnail" tag-value="%%Phone%%" tag-label="User phone number" style="display: inline-block; width: 154px; height: 120px; cursor: pointer; padding: 4px; background-color: #ffffff; border: 1px solid #b80000; border-radius: 10px; margin-right: 10px">\
                            Merge Tag Phone\
                        </div>\
                        <div class="thumbnail" tag-value="Merge Tag 3" style="display: inline-block; width: 154px; height: 120px; cursor: pointer; padding: 4px; background-color: #ffffff; border: 1px solid #b80000; border-radius: 10px; margin-right: 10px">\
                            Merge Tag 3\
                        </div>\
                    </div>\
                </div>\
            </div>';
    document.body.appendChild(div);
    const style = document.createElement('style');
    style.innerHTML = '#externalMergeTags .thumbnail.selected {color: blue; box-shadow: 0 0 0 2px blue; }';
    document.head.appendChild(style);

    this.externalLibrary = document.getElementById('externalMergeTags');
    this.externalLibrary.querySelector('.close').addEventListener('click', this.cancelAndClose.bind(this));

    this.externalLibrary.querySelectorAll('.thumbnail')
      .forEach(thumbnail => thumbnail.addEventListener('click', () => this.onElementClick(thumbnail)));
  }

  cancelAndClose() {
    this.close();
  }

  onElementClick(thumbnail) {
    const exampleOfMergeTagValue = thumbnail.getAttribute('tag-value');
    const exampleOfMergeTagLabel = thumbnail.getAttribute('tag-label');

    this.close();
    this.dataSelectCallback({
      value: exampleOfMergeTagValue,
      label: exampleOfMergeTagLabel,
    });
  }

  close() {
    this.externalLibrary.style.visibility = 'hidden';
  }

  renderMergeTags() {
    const selectedElement = this.externalLibrary.querySelector('.selected');
    selectedElement && selectedElement.classList.remove('selected');
    if (this.selectedMergetag) {
      this.externalLibrary.querySelector(`[tag-value="${this.selectedMergetag}"]`)?.classList.add('selected');
    }
    this.externalLibrary.style.visibility = 'visible';

  }

  openMergeTagsLibrary(mergeTag, onDataSelectCallback) {
    this.selectedMergetag = mergeTag;
    this.renderMergeTags();
    this.dataSelectCallback = onDataSelectCallback;
  }
}
