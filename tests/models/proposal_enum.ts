import * as anchor from "@project-serum/anchor";

export class Proposals {
  first: Object;
  second: Object;
  third: Object;
  fourth: Object;

  constructor() {
    this.first = { first: {} };
    this.second = { second: {} };
    this.third = { third: {} };
    this.fourth = { fourth: {} };
  }
}

export class ProposalsV2 {
  first: Object = { first: {} };
  second: Object = { second: {} };
  third: Object = { third: {} };
  fourth: Object = { fourth: {} };
  fifth: Object = { fifth: {} };
}
