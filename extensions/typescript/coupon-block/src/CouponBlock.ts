import {Block, BlockType} from '@stripoinc/ui-editor-extensions';

export class CouponBlock extends Block {
    getId(): string {
        return 'coupon-block';
    }

    getIcon(): string {
        return 'couponBlockIcon';
    }

    shouldDisplayQuickAddIcon(): boolean {
        return true;
    }

    getName(): string {
        return this.api.translate('Coupon');
    }

    getDescription(): string {
        return this.api.translate('Add a discount code to your email template');
    }

    getTemplate(): string {
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
