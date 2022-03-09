import {RootState} from '@store/index';

export const onTestCheckinSuccessSelector = (state: RootState) =>
  state.customer.onTestCheckinSuccess;

export const printTicketSelector = (state: RootState) =>
  state.customer.printTicket;
