function userFunction(pdb) {

  var attrIddocID = -1;

  var bimObject = null;

  var bimObjArr = [];

  // Iterate over all attributes and find the index to the one we are interested in
  /*
  pdb.enumAttributes(function(i, attrDef, attrRaw) {

    var name = attrDef.name;
    console.log(name, i);
    if ( name === 'DOCID') {
      attrIddocID = i;
      return true; // to stop iterating over the remaining attributes.
    }
  });
  */

  attrIddocID = 66;
  // Early return is the model doesn't contain data for "docID".
  if (attrIddocID === -1)
    return null;

  var value = 0;
  pdb.enumObjects(function(dbId) {
    // For each part, iterate over their properties.
    pdb.enumObjectProperties(dbId, function(attrId, valId) {
      // Only process 'docID' property.
      if (attrId === attrIddocID) {
        bimObject = {
          dbId: dbId,
          attrId: attrId,
          value: pdb.getAttrValue(attrId, valId)
        };
        if (bimObject.value == ""){

        } else{
          bimObjArr.push(bimObject);
        }
        // Stop iterating over additional properties when "docID" is found.
        return true;
      }
    });
  });
  return bimObjArr;
}

export { userFunction };
