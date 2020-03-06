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
    public keywords?: Keyword[],
    public keywordsList: string[] = [],
  ) {
  }
}

export class Keyword {
  public constructor(
    public txt: string = '',
    public used: boolean = false,
    public used_head: boolean = false,
    public countryConflict: boolean = false,
    public matched: boolean = false,
    public exact: boolean = false,
    labels = []
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
