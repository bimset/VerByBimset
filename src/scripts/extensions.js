import hexToVector4 from "./LoadModel.js";

// *******************************************
// Firebase (Docking) Panel
// *******************************************
function FirebasePanel(viewer, container, id, title, options) {
    this.viewer = viewer;
    Autodesk.Viewing.UI.DockingPanel.call(this, container, id, title, options);

    // the style of the docking panel
    // use this built-in style to support Themes on Viewer 4+
    this.container.classList.add('docking-panel-container-solid-color-a');
    this.container.style.top = "10px";
    this.container.style.left = "10px";
    this.container.style.width = "auto";
    this.container.style.height = "auto";
    this.container.style.resize = "auto";
    this._table = new Autodesk.Viewing.UI.DataTable(this);
    const cols = ['Property', 'Value'];
    var rows = [["Test", "data"]];

    var panelData = null;
    if (window._viewerMain.getSelection().length == 1){
      window.objectArray.forEach((object, i) => {
        if (window._viewerMain.getSelection()[0] == object.dbId) {
          rows = [
            ["dbId", object.dbId],
            ["docId", object.docId],
            ["Color", object.color],
            ["Nombre", object.name],
            ["Costo Paramétrico", object.price],
            ["Numero de contrato", object.contractNo],
            ["Proveedor", object.provider]];
        }
      });
      this._table.setData(rows, cols);
    }else if (currSelection.length > 1) {

      var totalPrice = 0;
      var allProviders = "";

      window.objectArray.forEach((object, i) => {
        window._viewerMain.getSelection().forEach((dbId, i) =>{
          if (dbId == object.dbId) {
            totalPrice = totalPrice + object.totalPrice;
            if (allProviders.search(object.provider) < 0) {
              allProviders = allProviders + " " + object.provider;
            }
          }
        });
      });

      rows = [
      ["dbId", "Multi-select"],
      ["docId", "Multi-select"],
      ["Nombre", "Multi-select"],
      ["Costo de selección", "$" + totalPrice],
      ["Proveedores seleccionados", allProviders]];
    } else {
      // this is where we should place the content of our panel
      var div = document.createElement('div');
      div.style.margin = '20px';
      div.innerText = "Selecciona un objeto.";
      this.container.appendChild(div);
      // and may also append child elements...
    }
}
FirebasePanel.prototype = Object.create(Autodesk.Viewing.UI.DockingPanel.prototype);
FirebasePanel.prototype.constructor = FirebasePanel;

// *******************************************
// Firebase Extension
// *******************************************
function FirebaseExtension(viewer, options) {
    Autodesk.Viewing.Extension.call(this, viewer, options);
    this.panel = null;
}

FirebaseExtension.prototype = Object.create(Autodesk.Viewing.Extension.prototype);
FirebaseExtension.prototype.constructor = FirebaseExtension;

FirebaseExtension.prototype.load = function () {
    if (this.viewer.toolbar) {
        // Toolbar is already available, create the UI
        this.createUI();
    } else {
        // Toolbar hasn't been created yet, wait until we get notification of its creation
        this.onToolbarCreatedBinded = this.onToolbarCreated.bind(this);
        this.viewer.addEventListener(Autodesk.Viewing.TOOLBAR_CREATED_EVENT, this.onToolbarCreatedBinded);
    }
    return true;
};

FirebaseExtension.prototype.onToolbarCreated = function () {
    this.viewer.removeEventListener(Autodesk.Viewing.TOOLBAR_CREATED_EVENT, this.onToolbarCreatedBinded);
    this.onToolbarCreatedBinded = null;
    this.createUI();
};

FirebaseExtension.prototype.createUI = function () {
    var viewer = this.viewer;
    var panel = this.panel;

    // button to show the docking panel
    var toolbarButtonShowDockingPanel = new Autodesk.Viewing.UI.Button('showMyAwesomePanel');
    toolbarButtonShowDockingPanel.onClick = function (e) {
      if (panel == null) {
        panel = new FirebasePanel(viewer, viewer.container,
                'FirebaseExtensionPanel', 'Bimset Properties');
      }
        // show/hide docking panel
        panel.setVisible(!panel.isVisible());
    };

    toolbarButtonShowDockingPanel.addClass('firebaseToolbarButton');
    toolbarButtonShowDockingPanel.setToolTip('Firebase extension');

    // SubToolbar
    this.subToolbar = new Autodesk.Viewing.UI.ControlGroup('FirebaseAppToolbar');
    this.subToolbar.addControl(toolbarButtonShowDockingPanel);

    viewer.toolbar.addControl(this.subToolbar);

    window._viewerMain.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, function(event) {
      const cols = ['', ''];
      var rows = [["", ""]];
      var currSelection = window._viewerMain.getSelection();

      if (currSelection.length == 1) {
        window.objectArray.forEach((object, i) => {
          if (window._viewerMain.getSelection()[0] == object.dbId) {
            rows = [
            ["dbId", object.dbId],
            ["docId", object.docId],
            ["Color", object.color],
            ["Nombre", object.name],
            ["Costo Paramétrico", "$" + object.totalPrice],
            ["Numero de contrato", object.contractNo],
            ["Proveedor", object.provider]];
          }
        });
      } else if (currSelection.length > 1) {

        var totalPrice = 0;
        var allProviders = "";

        window.objectArray.forEach((object, i) => {
          window._viewerMain.getSelection().forEach((dbId, i) =>{
            if (dbId == object.dbId) {
              totalPrice = totalPrice + object.totalPrice;
              if (allProviders.search(object.provider) < 0) {
                allProviders = allProviders + " " + object.provider;
              }
            }
          });
        });

        rows = [
        ["dbId", "Multi-select"],
        ["docId", "Multi-select"],
        ["Nombre", "Multi-select"],
        ["Costo de selección", "$" + totalPrice],
        ["Proveedores seleccionados", allProviders]];
      }
      if (panel != null){
        if (panel.isVisible()) {
          console.log("Table inside selection changed and panel isVisible: ", panel._table);
          panel._table.destroyTable();
          panel._table.setData(rows, cols);
        }
      }
    });
};

FirebaseExtension.prototype.unload = function () {
    this.viewer.toolbar.removeControl(this.subToolbar);
    return true;
};

Autodesk.Viewing.theExtensionManager.registerExtension('FirebaseExtension', FirebaseExtension);







// *******************************************
// My Color Extension
// *******************************************

function MyColorExtension(viewer, options) {
    Autodesk.Viewing.Extension.call(this, viewer, options);
  }

  MyColorExtension.prototype = Object.create(Autodesk.Viewing.Extension.prototype);
  MyColorExtension.prototype.constructor = MyColorExtension;

  MyColorExtension.prototype.load = function() {

    if (this.viewer.toolbar) {
      // Toolbar is already available, create the UI
      this.createUI();
    } else {
      // Toolbar hasn't been created yet, wait until we get notification of its creation
      this.onToolbarCreatedBinded = this.onToolbarCreated.bind(this);
      this.viewer.addEventListener(Autodesk.Viewing.TOOLBAR_CREATED_EVENT, this.onToolbarCreatedBinded);
    }

    return true;
  };

  MyColorExtension.prototype.onToolbarCreated = function() {
    this.viewer.removeEventListener(Autodesk.Viewing.TOOLBAR_CREATED_EVENT, this.onToolbarCreatedBinded);
    this.onToolbarCreatedBinded = null;
    this.createUI();
  };

  MyColorExtension.prototype.createUI = function() {
    // alert('TODO: Create Toolbar!');

    var viewer = this.viewer;

    // Button 1
    var button1 = new Autodesk.Viewing.UI.Button('red-bunny');
    var colored = true;

    button1.onClick = function(e) {
      var objArray = window.objectArray;

      if (colored) {
        viewer.clearThemingColors(window._viewerMain.model);
        colored = false;
      } else {
        objArray.forEach( function(object, index, tempArray) {
          window._viewerMain.setThemingColor(object.dbId, hexToVector4(object.color));
        });

        colored = true;
      }
    };

    button1.addClass('blackandwhite');
    button1.setToolTip('Color Switch');

    // SubToolbar
    this.subToolbar = new Autodesk.Viewing.UI.ControlGroup('my-custom-view-toolbar');
    this.subToolbar.addControl(button1);

    viewer.toolbar.addControl(this.subToolbar);
  };

  MyColorExtension.prototype.unload = function() {
    this.viewer.toolbar.removeControl(this.subToolbar);
    return true;
  };


  Autodesk.Viewing.theExtensionManager.registerExtension('MyColorExtension', MyColorExtension);
