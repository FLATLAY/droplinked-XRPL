export class NFTApproved {
  constructor(
    amount,
    tokenID,
    holderID,
    comission,
    ownerAccount,
    publisherAccount,
  ) {
    this.amount = amount;
    this.tokenID = tokenID;
    this.holderID = holderID;
    this.comission = comission;
    this.ownerAccount = ownerAccount;
    this.publisherAccount = publisherAccount;
  }
}
