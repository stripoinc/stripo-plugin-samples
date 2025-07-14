import {Block} from '@stripoinc/ui-editor-extensions';

export const LOGO_BLOCK_ID = 'logo-block';

export class LogoBlock extends Block {
    getId() {
        return LOGO_BLOCK_ID;
    }

    getIcon() {
        return 'image';
    }

    getName() {
        return this.api.translate('Logo block');
    }

    getDescription() {
        return this.api.translate('Logo block description');
    }

    getTemplate() {
        return `
            <td align="center" class="esd-block-image" style="font-size: 0">
                <a target="_blank">
                    <img src="https://hpy.stripocdn.email/content/guids/CABINET_1ce849b9d6fc2f13978e163ad3c663df/images/22451592470360730.gif" 
                        alt="Logo" width="80px">
                </a>
            </td>
        `
    }
}
