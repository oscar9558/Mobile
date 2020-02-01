import { TranslateService } from '@ngx-translate/core';

export class TranslateUtilService {

    constructor(private translate: TranslateService) {}

    public _translate(code: string) {
        return this.translate.instant(code);
    }

}