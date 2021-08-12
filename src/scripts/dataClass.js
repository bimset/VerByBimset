export default class Asset {
  constructor(assetType, belongsTo, brand, description, hasSSD, isAssigned, memory, model, processor, processorBrand, serialNumber, serviceTag, vRAM, videocard, videocardBrand) {
    this.assetType = assetType;
    this.belongsTo = belongsTo;
    this.brand = brand;
    this.description = description;
    this.hasSSD = hasSSD;
    this.isAssigned = isAssigned;
    this.memory = memory;
    this.model = model;
    this.processor = processor;
    this.processorBrand = processorBrand;
    this.serialNumber = serialNumber;
    this.serviceTag = serviceTag;
    this.vRAM = vRAM;
    this.videocard = videocard;
    this.videocardBrand = videocardBrand;
  }

  get type(){
    return this.assetType;
  }
  get belongsTo(){
    return this.belongsTo;
  }
  get brand(){
    return this.brand;
  }
  get description(){
    return this.description;
  }
  get hasSSD(){
    return this.hasSSD;
  }
  get isAssigned(){
    return this.isAssigned;
  }
  get memory(){
    return this.memory;
  }
  get model(){
    return this.model;
  }
  get processor(){
    return this.processor;
  }
  get processorBrand(){
    return this.processorBrand;
  }
  get serialNumber(){
    return this.serialNumber;
  }
  get serviceTag(){
    return this.serviceTag;
  }
  get vRAM(){
    return this.vRAM;
  }
  get videocard(){
    return this.videocard;
  }
  get videocardBrand(){
    return this.videocardBrand;
  }
  get getDict(){
    var dict = {
      assetType: this.assetType,
      belongsTo: this.belongsTo,
      brand: this.brand,
      description: this.description,
      hasSSD: this.hasSSD,
      isAssigned: this.isAssigned,
      memory: this.memory,
      model: this.model,
      processor: this.processor,
      processorBrand: this.processorBrand,
      serialNumber: this.serialNumber,
      serviceTag: this.serviceTag,
      vRAM: this.vRAM,
      videocard: this.videocard,
      videocardBrand: this.videocardBrand
    };
  }
};
