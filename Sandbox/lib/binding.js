/*
 * Copyright 2013 The Polymer Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */

(function() {
  // override Polymer property binding
  var api = Polymer.api.instance.properties;
  var bindProperty = api.bindProperty;
  api.bindProperty = function(property, model, path) {
    bindProperty.call(this, property, model, path);
    registerBinding(this, property, path);
  };
  
  var unbindProperty = api.unbindProperty;
  api.unbindProperty = function(type, name) {
    var result = unbindProperty(type, name);
    if (result) {
      unregisterBinding(this, name);
    }
    return result;
  };
  
  // bind tracking
  var bindings = new SideTable();

  function registerBinding(element, name, path) {
    var b$ = bindings.get(element);
    if (!b$) {
      bindings.set(element, b$ = {});
    }
    b$[name.toLowerCase()] = path;
  }

  function unregisterBinding(element, name) {
    var b$ = bindings.get(element);
    if (b$) {
      delete b$[name.toLowerCase()];
    }
  }

  function overrideBinding(ctor) {
    var proto = ctor.prototype;
    var originalBind = proto.bind;
    var originalUnbind = proto.unbind;

    proto.bind = function(name, model, path) {
      originalBind.apply(this, arguments);
      // note: must do this last because mdv may unbind before binding
      registerBinding(this, name, path);
    };

    proto.unbind = function(name) {
      originalUnbind.apply(this, arguments);
      unregisterBinding(this, name);
    };
  };

  [Node, Element, Text, HTMLInputElement].forEach(overrideBinding);
  
  var emptyBindings = {};

  function getBindings(element) {
    return element && bindings.get(element) || emptyBindings;
  }

  function getBinding(element, name) {
    return getBindings(element)[name.toLowerCase()];
  }
  
  window.Bindings = {
    getBinding: getBinding
  }
})();
