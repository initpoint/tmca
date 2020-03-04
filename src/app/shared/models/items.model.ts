import {AppUser} from './user.model';

export class Item {
  public constructor(
    public refNumber: string = '',
    public classNumber: string = '',
    public classList: string = '',
    public trademarkName: string = '',
    public applicationName: string = '',
    public searchText: string = '',
    public user?: AppUser,
    public id?: string,
    public createDate?: any,
    public updateDate?: any,
    public state?: ItemState,
    public results?: any,
  ) {
  }
}

export class FacilitySlot {
  public constructor(
    public isReserved?: boolean,
    public date?: any,
    public durationInMinutes?: number,
    public fullDay?: boolean,
    public contactPerson?: string,
    public title?: string,
    public id?: string,
  ) {
  }
}

export class FacilityReservation {
  public constructor(
    public user: AppUser,
    public slotId?: string,
    public date?: any,
    public title?: string,
    public comment?: string,
  ) {
  }
}

export enum ItemState {
  Active,
  Approved,
  Pending
}
