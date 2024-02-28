import { ICancelToken } from '../interfaces';

export class CancelToken implements ICancelToken {
  isActive: boolean;

  constructor() {
    this.isActive = true;
  }

  cancel() {
    this.isActive = false;
  }
}
