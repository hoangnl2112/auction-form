'use strict';

import { Get } from './index';

export const GenerateCode = async (params) => {
    return await Get('/referal-code/generate', params);
};
