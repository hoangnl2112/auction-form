'use strict';

import { Get } from './index';

export const GenerateCode = async () => {
    return await Get('/referal-code/generate');
};
