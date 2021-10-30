export enum MessageTypes{
  ShowPreviousMonth = 'ShowPreviousMonth',
  ShowNextMonth = 'ShowNextMonth',
  SelectedDateChanged = 'SelectedDateChanged',
  ShowToday = 'ShowToday',
  UnselectDate = 'unselectDate',
  SelectToday = 'SelectToday',
  ShowSelected = 'ShowSelected',
}

export interface Message {
  type: MessageTypes;
  data?: any;
}
