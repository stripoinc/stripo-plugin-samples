import {Block, BlockType} from '@stripoinc/ui-editor-extensions';

export class CouponBlock extends Block {
    getId() {
        return 'coupon-block';
    }

    getIcon() {
        return 'couponBlockIcon';
    }

    shouldDisplayQuickAddIcon() {
        return true;
    }

    getName() {
        return this.api.translate('Coupon');
    }

    getDescription() {
        return this.api.translate('Add a discount code to your email template');
    }

    getTemplate() {
        return `
            <td>
                <table width="100%" cellspacing="0" cellpadding="0">
                    <${BlockType.BLOCK_TEXT} align="center">
                        <p>{{COUPON_CODE}}</p>
                    </${BlockType.BLOCK_TEXT}>                
                </table>
            </td>`
    }
}
