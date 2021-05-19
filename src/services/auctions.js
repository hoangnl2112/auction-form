'use strict';

import { Get, Post } from './index';

export const Add = async (body) => {
    return await Post('/auctions', body);
};

export const Count = async () => {
    return await Get('/auctions/count');
};
