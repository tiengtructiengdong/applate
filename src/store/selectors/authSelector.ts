import {RootState} from '@store/index';

export const tokenSelector = (state: RootState) => state.auth.token || '';
