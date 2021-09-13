function userFunction(pdb) {

  var attrIddocID = -1;
  var attrIdArea = -1;

  var bimObject = null;

  var bimObjArr = [];
  var docIdBool, areaBool = false;

  // Iterate over all attributes and find the index to the one we are interested in
 pdb.enumAttributes(function(i, attrDef, attrRaw) {

    var name = attrDef.name;
    if ( name === 'docId') {
      attrIddocID = i;
      console.log(name, " ", attrIddocID);
      docIdBool = true;
    }
    if ( name === 'Area') {
      attrIdArea = i;
      //console.log(name, " ", attrIdArea);
      areaBool = true;
    }
    if (areaBool && docIdBool) {
      //console.log("docId: ", attrIddocID, " areaId: ", attrIdArea);
      return true;
    }

  });

  // Early return is the model doesn't contain data for "docID".
  if (attrIddocID === -1)
    return null;

  var value = 0;
  var countObj = 0;
  pdb.enumObjects(function(dbId) {
    // For each part, iterate over their properties.
    var docIdValue, areaValue = null;
    var docIdBool, areaBool = false;
    pdb.enumObjectProperties(dbId, function(attrId, valId) {
      // Only process 'docID' property.
      if (attrId == attrIddocID) {
        docIdValue = pdb.getAttrValue(attrId, valId);
        docIdBool = true;
      }

      if (attrId == attrIdArea) {
        areaValue = pdb.getAttrValue(attrId, valId);
        //console.log("isNaN: ", !(isNaN(areaValue)), " value: ", areaValue, " IdArea: ", attrIdArea);
        areaBool = true;
      }
    });
      bimObject = {
        dbId: dbId,
        attrId: attrIddocID,
        value: docIdValue,
        areaAttrId:attrIdArea,
        areaValue: areaValue
      };
      //console.log("bimObject: ", bimObject);
      if (bimObject.value == "" || bimObject.value == null){

      } else{
        bimObjArr.push(bimObject);
      }
  });

  return bimObjArr;
}

export { userFunction };
