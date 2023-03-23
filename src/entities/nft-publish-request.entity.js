export class NFTPublishRequest {
  constructor(amount, holderID, producer, publisher, comission) {
    this.amount = amount;
    this.holderID = holderID;
    this.producer = producer;
    this.publisher = publisher;
    this.comission = comission;
  }
}
