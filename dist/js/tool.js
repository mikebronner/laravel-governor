/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/js/components/Assignments.vue":
/***/ (function(module, exports) {


module.exports = {
    data: function data() {
        return {
            isLoading: true,
            roles: [],
            users: []
        };
    },

    created: function created() {
        this.loadRoles();
        this.loadUsers();
    },

    methods: {
        loadRoles: function loadRoles() {
            var self = this;

            Nova.request().get("/genealabs/laravel-governor/nova/roles").then(function (response) {
                self.roles = Object.assign({}, response.data);

                if (self.users.length > 0) {
                    self.isLoading = false;
                }
            });
        },

        loadUsers: function loadUsers() {
            var self = this;

            Nova.request().get("/genealabs/laravel-governor/nova/users").then(function (response) {
                self.users = Object.assign([], response.data);

                if (self.roles.length > 0) {
                    self.isLoading = false;
                }
            });
        },

        updateAssignment: _.debounce(function (selectedUsers) {
            var role = selectedUsers[0].pivot.role_key;
            var self = this;
            var userIds = _.map(selectedUsers, function (user) {
                return user.id;
            });

            Nova.request().put("/genealabs/laravel-governor/nova/assignments/" + role, {
                user_ids: userIds
            }).then(function (response) {
                self.$toasted.show("Role '" + role + "' user assignments updated successfully.", { type: "success" });
            });
        }, 1000)
    }
};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/js/components/Permissions.vue":
/***/ (function(module, exports) {


module.exports = {
    data: function data() {
        return {
            binarySelectOptions: ["any", "no"],
            deleteModalOpen: false,
            originalRoleName: "",
            permissionsIsLoading: true,
            permissions: [],
            role: {
                name: "",
                description: ""
            },
            roleIsLoading: true,
            selectOptions: ["own", "any", "no"]
        };
    },

    created: function created() {
        this.originalRoleName = this.$route.params.role;
        this.loadRole();
        this.loadPermissions();
    },

    methods: {
        closeDeleteModal: function closeDeleteModal() {
            this.deleteModalOpen = false;
        },

        confirmDelete: function confirmDelete() {
            var self = this;

            Nova.request().delete("/genealabs/laravel-governor/nova/roles/" + this.originalRoleName).then(function (response) {
                self.$toasted.show("Role '" + self.originalRoleName + "' deleted successfully.", { type: "success" });
                self.$router.push('/laravel-nova-governor/roles');
            }).catch(function (error) {
                self.$toasted.show(error.response, { type: "error" });
            });
        },

        loadPermissions: function loadPermissions() {
            var self = this;

            axios.get("/genealabs/laravel-governor/nova/permissions?filter=role_key&value=" + this.originalRoleName).then(function (response) {
                self.permissions = Object.assign({}, response.data);
                self.permissionsIsLoading = false;
            });
        },

        loadRole: function loadRole() {
            var self = this;

            axios.get("/genealabs/laravel-governor/nova/roles/" + this.originalRoleName).then(function (response) {
                self.role = Object.assign({}, response.data);
                self.roleIsLoading = false;
            });
        },

        openDeleteModal: function openDeleteModal() {
            this.deleteModalOpen = true;
        },

        updatePermissions: function updatePermissions() {
            var self = this;

            Nova.request().put("/genealabs/laravel-governor/nova/roles/" + this.originalRoleName, {
                name: this.role.name,
                description: this.role.description,
                permissions: this.permissions
            }).then(function (response) {
                self.$toasted.show("Permissions updated successfully.", { type: "success" });
            }).catch(function (error) {
                self.$toasted.show(error.response, { type: "error" });
            });
        },

        updateRole: _.debounce(function () {
            var self = this;

            Nova.request().put("/genealabs/laravel-governor/nova/roles/" + this.originalRoleName, {
                name: this.role.name,
                description: this.role.description
            }).then(function (response) {
                self.$toasted.show("Role updated successfully.", { type: "success" });
                self.originalRoleName = self.role.name;
                self.$router.replace({
                    path: '/laravel-nova-governor/permissions/' + self.role.name
                });
            }).catch(function (error) {
                self.$toasted.show(error.response.data, { type: "error" });
            });
        }, 350)
    }
};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/js/components/RoleCreate.vue":
/***/ (function(module, exports) {


module.exports = {
    data: function data() {
        return {
            role: {
                name: "",
                description: ""
            }
        };
    },

    methods: {
        updateRole: _.debounce(function () {
            var self = this;

            Nova.request().post("/genealabs/laravel-governor/nova/roles", {
                name: this.role.name,
                description: this.role.description
            }).then(function (response) {
                self.$toasted.show("Role '" + self.role.name + "' created successfully.", { type: "success" });
                self.$router.push('/laravel-nova-governor/permissions/' + self.role.name);
            }).catch(function (error) {
                self.$toasted.show(error.response.data, { type: "error" });
            });
        }, 350)
    }
};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/js/components/Roles.vue":
/***/ (function(module, exports) {


module.exports = {
    data: function data() {
        return {
            isLoading: true,
            roles: []
        };
    },

    created: function created() {
        this.loadRoles();
    },

    methods: {
        loadRoles: function loadRoles() {
            var self = this;

            axios.get("/genealabs/laravel-governor/nova/roles").then(function (response) {
                console.log(response);
                self.roles = Object.assign({}, response.data);
                self.isLoading = false;
            });
        }
    }
};

/***/ }),

/***/ "./node_modules/css-loader/index.js?sourceMap!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-312d3e3c\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/sass-loader/lib/loader.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/js/components/Roles.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, "\ntr.disabled[data-v-312d3e3c] {\n  pointer-events: none;\n}\n", "", {"version":3,"sources":["/Users/mike/Developer/Sites/laravel-governor/resources/js/components/Roles.vue"],"names":[],"mappings":";AAAA;EACE,qBAAqB;CAAE","file":"Roles.vue","sourcesContent":["tr.disabled {\n  pointer-events: none; }\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?sourceMap!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3e013b2b\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/sass-loader/lib/loader.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/js/components/Assignments.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, "\n.card table:last-child tr:last-child td[data-v-3e013b2b]:first-child {\n  border-bottom-left-radius: .5rem;\n}\n.card table:last-child tr:last-child td[data-v-3e013b2b]:last-child {\n  border-bottom-right-radius: .5rem;\n}\n", "", {"version":3,"sources":["/Users/mike/Developer/Sites/laravel-governor/resources/js/components/Assignments.vue"],"names":[],"mappings":";AAAA;EACE,iCAAiC;CAAE;AAErC;EACE,kCAAkC;CAAE","file":"Assignments.vue","sourcesContent":[".card table:last-child tr:last-child td:first-child {\n  border-bottom-left-radius: .5rem; }\n\n.card table:last-child tr:last-child td:last-child {\n  border-bottom-right-radius: .5rem; }\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?sourceMap!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-50d030bd\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/sass-loader/lib/loader.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/js/components/RoleCreate.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, "\n.card table:last-child tr:last-child td[data-v-50d030bd]:first-child {\n  border-bottom-left-radius: .5rem;\n}\n.card table:last-child tr:last-child td[data-v-50d030bd]:last-child {\n  border-bottom-right-radius: .5rem;\n}\n", "", {"version":3,"sources":["/Users/mike/Developer/Sites/laravel-governor/resources/js/components/RoleCreate.vue"],"names":[],"mappings":";AAAA;EACE,iCAAiC;CAAE;AAErC;EACE,kCAAkC;CAAE","file":"RoleCreate.vue","sourcesContent":[".card table:last-child tr:last-child td:first-child {\n  border-bottom-left-radius: .5rem; }\n\n.card table:last-child tr:last-child td:last-child {\n  border-bottom-right-radius: .5rem; }\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?sourceMap!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-e9ffe52e\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/sass-loader/lib/loader.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/js/components/Permissions.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, "\n.card table:last-child tr:last-child td[data-v-e9ffe52e]:first-child {\n  border-bottom-left-radius: .5rem;\n}\n.card table:last-child tr:last-child td[data-v-e9ffe52e]:last-child {\n  border-bottom-right-radius: .5rem;\n}\n", "", {"version":3,"sources":["/Users/mike/Developer/Sites/laravel-governor/resources/js/components/Permissions.vue"],"names":[],"mappings":";AAAA;EACE,iCAAiC;CAAE;AAErC;EACE,kCAAkC;CAAE","file":"Permissions.vue","sourcesContent":[".card table:last-child tr:last-child td:first-child {\n  border-bottom-left-radius: .5rem; }\n\n.card table:last-child tr:last-child td:last-child {\n  border-bottom-right-radius: .5rem; }\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "./node_modules/vue-loader/lib/component-normalizer.js":
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-312d3e3c\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/js/components/Roles.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("div", { staticClass: "flex" }, [
        _c(
          "div",
          { staticClass: "relative h-9 mb-6 flex-no-shrink" },
          [_c("heading", { staticClass: "mb-6" }, [_vm._v("Roles")])],
          1
        ),
        _vm._v(" "),
        _c("div", { staticClass: "w-full flex items-center mb-6" }, [
          _c("div", {
            staticClass: "flex w-full justify-end items-center mx-3"
          }),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "flex-no-shrink ml-auto" },
            [
              _c(
                "router-link",
                {
                  staticClass: "btn btn-default btn-primary",
                  attrs: {
                    tag: "button",
                    to: { name: "laravel-nova-governor-role-create" }
                  }
                },
                [_vm._v("\n                    Create Role\n                ")]
              )
            ],
            1
          )
        ])
      ]),
      _vm._v(" "),
      _c("loading-card", { attrs: { loading: _vm.isLoading } }, [
        _c("div", { staticClass: "overflow-hidden overflow-x-auto relative" }, [
          _c(
            "table",
            {
              staticClass: "table w-full",
              attrs: {
                cellpadding: "0",
                cellspacing: "0",
                "data-testid": "resource-table"
              }
            },
            [
              _c("thead", [
                _c("tr", [
                  _c("th", { staticClass: "text-left" }, [
                    _c(
                      "span",
                      {
                        staticClass: "cursor-pointer inline-flex items-center",
                        attrs: { dusk: "sort-name" }
                      },
                      [
                        _vm._v(
                          "\n                                Name\n                            "
                        )
                      ]
                    )
                  ]),
                  _vm._v(" "),
                  _c("th", { staticClass: "text-left" }, [
                    _vm._v(
                      "\n                            Description\n                        "
                    )
                  ])
                ])
              ]),
              _vm._v(" "),
              _c(
                "tbody",
                _vm._l(_vm.roles, function(role) {
                  return _c(
                    "router-link",
                    {
                      key: role.name,
                      staticClass:
                        "cursor-pointer font-normal dim text-white mb-6 text-base no-underline",
                      class: { disabled: role.name == "SuperAdmin" },
                      attrs: {
                        tag: "tr",
                        to: {
                          name: "laravel-nova-governor-permissions",
                          params: { role: role.name }
                        }
                      }
                    },
                    [
                      _c("td", [
                        _c(
                          "span",
                          { staticClass: "whitespace-no-wrap text-left" },
                          [
                            _vm._v(
                              "\n                                " +
                                _vm._s(role.name) +
                                "\n                            "
                            )
                          ]
                        )
                      ]),
                      _vm._v(" "),
                      _c("td", [
                        _c("span", { staticClass: "text-left" }, [
                          _vm._v(
                            "\n                                " +
                              _vm._s(role.description) +
                              "\n                            "
                          )
                        ])
                      ])
                    ]
                  )
                })
              )
            ]
          )
        ])
      ])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-312d3e3c", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-3e013b2b\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/js/components/Assignments.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("heading", { staticClass: "mb-6" }, [_vm._v("Assignments")]),
      _vm._v(" "),
      _c("loading-card", { attrs: { loading: _vm.isLoading } }, [
        _c(
          "form",
          { attrs: { autocomplete: "off" } },
          _vm._l(_vm.roles, function(role) {
            return _c("div", { key: role.name }, [
              _c("div", { staticClass: "flex border-b border-40" }, [
                _c("div", { staticClass: "w-1/5 py-6 px-8" }, [
                  _c(
                    "label",
                    { staticClass: "inline-block text-80 pt-2 leading-tight" },
                    [
                      _vm._v(
                        "\n                            " +
                          _vm._s(role.name) +
                          "\n                        "
                      )
                    ]
                  )
                ]),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "py-6 px-8 w-4/5" },
                  [
                    _c("multiselect", {
                      attrs: {
                        options: _vm.users,
                        "allow-empty": false,
                        "track-by": "name",
                        label: "name",
                        multiple: true,
                        hideSelected: true,
                        clearOnSelect: true
                      },
                      on: { input: _vm.updateAssignment },
                      model: {
                        value: role.users,
                        callback: function($$v) {
                          _vm.$set(role, "users", $$v)
                        },
                        expression: "role.users"
                      }
                    })
                  ],
                  1
                )
              ])
            ])
          })
        )
      ])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-3e013b2b", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-50d030bd\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/js/components/RoleCreate.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("heading", { staticClass: "mb-6" }, [_vm._v("Create Role")]),
      _vm._v(" "),
      _c("loading-card", { attrs: { loading: false } }, [
        _c("form", { attrs: { autocomplete: "off" } }, [
          _c("div", [
            _c("div", { staticClass: "flex border-b border-40" }, [
              _c("div", { staticClass: "w-1/5 py-6 px-8" }, [
                _c(
                  "label",
                  { staticClass: "inline-block text-80 pt-2 leading-tight" },
                  [
                    _vm._v(
                      "\n                            Name\n                        "
                    )
                  ]
                )
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "py-6 px-8 w-1/2" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.role.name,
                      expression: "role.name"
                    }
                  ],
                  staticClass:
                    "w-full form-control form-input form-input-bordered",
                  attrs: { type: "text", placeholder: "Name" },
                  domProps: { value: _vm.role.name },
                  on: {
                    input: [
                      function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.role, "name", $event.target.value)
                      },
                      _vm.updateRole
                    ]
                  }
                })
              ])
            ])
          ]),
          _vm._v(" "),
          _c("div", [
            _c("div", { staticClass: "flex border-b border-40" }, [
              _c("div", { staticClass: "w-1/5 py-6 px-8" }, [
                _c(
                  "label",
                  { staticClass: "inline-block text-80 pt-2 leading-tight" },
                  [
                    _vm._v(
                      "\n                            Description\n                        "
                    )
                  ]
                )
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "py-6 px-8 w-4/5" }, [
                _c("textarea", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.role.description,
                      expression: "role.description"
                    }
                  ],
                  staticClass:
                    "w-full form-control form-input form-input-bordered py-3 h-auto",
                  attrs: { rows: "5", placeholder: "Description" },
                  domProps: { value: _vm.role.description },
                  on: {
                    input: [
                      function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.role, "description", $event.target.value)
                      },
                      _vm.updateRole
                    ]
                  }
                })
              ])
            ])
          ])
        ])
      ])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-50d030bd", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-e9ffe52e\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/js/components/Permissions.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("div", { staticClass: "flex" }, [
        _c(
          "div",
          { staticClass: "relative h-9 mb-6 flex-no-shrink" },
          [_c("heading", { staticClass: "mb-6" }, [_vm._v("Edit Role")])],
          1
        ),
        _vm._v(" "),
        _c("div", { staticClass: "w-full flex items-center mb-6" }, [
          _c("div", {
            staticClass: "flex w-full justify-end items-center mx-3"
          }),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "flex-no-shrink ml-auto" },
            [
              _c(
                "button",
                {
                  staticClass: "btn btn-default btn-icon btn-white",
                  attrs: { title: _vm.__("Delete") },
                  on: { click: _vm.openDeleteModal }
                },
                [
                  _c("icon", {
                    staticClass: "text-80",
                    attrs: { type: "delete" }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "portal",
                { attrs: { to: "modals" } },
                [
                  _c(
                    "transition",
                    { attrs: { name: "fade" } },
                    [
                      _vm.deleteModalOpen
                        ? _c(
                            "delete-resource-modal",
                            {
                              attrs: { mode: "delete" },
                              on: {
                                confirm: _vm.confirmDelete,
                                close: _vm.closeDeleteModal
                              }
                            },
                            [
                              _c(
                                "div",
                                { staticClass: "p-8" },
                                [
                                  _c(
                                    "heading",
                                    {
                                      staticClass: "mb-6",
                                      attrs: { level: 2 }
                                    },
                                    [_vm._v(_vm._s(_vm.__("Delete Role")))]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "p",
                                    { staticClass: "text-80 leading-normal" },
                                    [
                                      _vm._v(
                                        _vm._s(
                                          _vm.__(
                                            "Are you sure you want to delete the the '" +
                                              _vm.role.name +
                                              "' role?"
                                          )
                                        )
                                      )
                                    ]
                                  )
                                ],
                                1
                              )
                            ]
                          )
                        : _vm._e()
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ])
      ]),
      _vm._v(" "),
      _c("loading-card", { attrs: { loading: _vm.roleIsLoading } }, [
        _c("form", { attrs: { autocomplete: "off" } }, [
          _c("div", [
            _c("div", { staticClass: "flex border-b border-40" }, [
              _c("div", { staticClass: "w-1/5 py-6 px-8" }, [
                _c(
                  "label",
                  { staticClass: "inline-block text-80 pt-2 leading-tight" },
                  [
                    _vm._v(
                      "\n                            Name\n                        "
                    )
                  ]
                )
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "py-6 px-8 w-1/2" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.role.name,
                      expression: "role.name"
                    }
                  ],
                  staticClass:
                    "w-full form-control form-input form-input-bordered",
                  attrs: { type: "text", placeholder: "Name" },
                  domProps: { value: _vm.role.name },
                  on: {
                    input: [
                      function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.role, "name", $event.target.value)
                      },
                      _vm.updateRole
                    ]
                  }
                })
              ])
            ])
          ]),
          _vm._v(" "),
          _c("div", [
            _c("div", { staticClass: "flex border-b border-40" }, [
              _c("div", { staticClass: "w-1/5 py-6 px-8" }, [
                _c(
                  "label",
                  { staticClass: "inline-block text-80 pt-2 leading-tight" },
                  [
                    _vm._v(
                      "\n                            Description\n                        "
                    )
                  ]
                )
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "py-6 px-8 w-4/5" }, [
                _c("textarea", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.role.description,
                      expression: "role.description"
                    }
                  ],
                  staticClass:
                    "w-full form-control form-input form-input-bordered py-3 h-auto",
                  attrs: { rows: "5", placeholder: "Description" },
                  domProps: { value: _vm.role.description },
                  on: {
                    input: [
                      function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.role, "description", $event.target.value)
                      },
                      _vm.updateRole
                    ]
                  }
                })
              ])
            ])
          ])
        ])
      ]),
      _vm._v(" "),
      _c("heading", { staticClass: "mt-8 mb-6" }, [_vm._v("Permissions")]),
      _vm._v(" "),
      _c("loading-card", { attrs: { loading: _vm.permissionsIsLoading } }, [
        _c("div", { staticClass: "relative" }, [
          _c(
            "table",
            {
              staticClass: "table w-full",
              attrs: { cellpadding: "0", cellspacing: "0" }
            },
            [
              _c("thead", [
                _c("tr", { staticClass: "bg-none" }, [
                  _c("th", { staticClass: "rounded-tl" }, [
                    _vm._v(
                      "\n                            Entity\n                        "
                    )
                  ]),
                  _vm._v(" "),
                  _c("th", [
                    _vm._v(
                      "\n                            Create\n                        "
                    )
                  ]),
                  _vm._v(" "),
                  _c("th", [
                    _vm._v(
                      "\n                            ViewAny\n                        "
                    )
                  ]),
                  _vm._v(" "),
                  _c("th", [
                    _vm._v(
                      "\n                            View\n                        "
                    )
                  ]),
                  _vm._v(" "),
                  _c("th", [
                    _vm._v(
                      "\n                            Update\n                        "
                    )
                  ]),
                  _vm._v(" "),
                  _c("th", [
                    _vm._v(
                      "\n                            Delete\n                        "
                    )
                  ]),
                  _vm._v(" "),
                  _c("th", [
                    _vm._v(
                      "\n                            Restore\n                        "
                    )
                  ]),
                  _vm._v(" "),
                  _c("th", { staticClass: "rounded-tr" }, [
                    _vm._v(
                      "\n                            Force Delete\n                        "
                    )
                  ])
                ])
              ]),
              _vm._v(" "),
              _c(
                "tbody",
                _vm._l(_vm.permissions, function(permission, name) {
                  return _c("tr", { key: name, staticClass: "hover:bg-none" }, [
                    _c(
                      "td",
                      {
                        staticClass: "whitespace-no-wrap text-left capitalize"
                      },
                      [
                        _vm._v(
                          "\n                            " +
                            _vm._s(name) +
                            "\n                        "
                        )
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "td",
                      [
                        _c("multiselect", {
                          attrs: {
                            options: _vm.binarySelectOptions,
                            "select-label": "",
                            "deselect-label": "",
                            "selected-label": "",
                            searchable: false,
                            "close-on-select": true,
                            "allow-empty": false
                          },
                          on: { input: _vm.updatePermissions },
                          model: {
                            value: _vm.permissions[name]["create"],
                            callback: function($$v) {
                              _vm.$set(_vm.permissions[name], "create", $$v)
                            },
                            expression: "permissions[name]['create']"
                          }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "td",
                      [
                        _c("multiselect", {
                          attrs: {
                            options: _vm.binarySelectOptions,
                            "select-label": "",
                            "deselect-label": "",
                            "selected-label": "",
                            searchable: false,
                            "close-on-select": true,
                            "allow-empty": false
                          },
                          on: { input: _vm.updatePermissions },
                          model: {
                            value: _vm.permissions[name]["viewAny"],
                            callback: function($$v) {
                              _vm.$set(_vm.permissions[name], "viewAny", $$v)
                            },
                            expression: "permissions[name]['viewAny']"
                          }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "td",
                      [
                        _c("multiselect", {
                          attrs: {
                            options: _vm.selectOptions,
                            "select-label": "",
                            "deselect-label": "",
                            "selected-label": "",
                            searchable: false,
                            "close-on-select": true,
                            "allow-empty": false
                          },
                          on: { input: _vm.updatePermissions },
                          model: {
                            value: _vm.permissions[name]["view"],
                            callback: function($$v) {
                              _vm.$set(_vm.permissions[name], "view", $$v)
                            },
                            expression: "permissions[name]['view']"
                          }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "td",
                      [
                        _c("multiselect", {
                          attrs: {
                            options: _vm.selectOptions,
                            "select-label": "",
                            "deselect-label": "",
                            "selected-label": "",
                            searchable: false,
                            "close-on-select": true,
                            "allow-empty": false
                          },
                          on: { input: _vm.updatePermissions },
                          model: {
                            value: _vm.permissions[name]["update"],
                            callback: function($$v) {
                              _vm.$set(_vm.permissions[name], "update", $$v)
                            },
                            expression: "permissions[name]['update']"
                          }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "td",
                      [
                        _c("multiselect", {
                          attrs: {
                            options: _vm.selectOptions,
                            "select-label": "",
                            "deselect-label": "",
                            "selected-label": "",
                            searchable: false,
                            "close-on-select": true,
                            "allow-empty": false
                          },
                          on: { input: _vm.updatePermissions },
                          model: {
                            value: _vm.permissions[name]["delete"],
                            callback: function($$v) {
                              _vm.$set(_vm.permissions[name], "delete", $$v)
                            },
                            expression: "permissions[name]['delete']"
                          }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "td",
                      [
                        _c("multiselect", {
                          attrs: {
                            options: _vm.selectOptions,
                            "select-label": "",
                            "deselect-label": "",
                            "selected-label": "",
                            searchable: false,
                            "close-on-select": true,
                            "allow-empty": false
                          },
                          on: { input: _vm.updatePermissions },
                          model: {
                            value: _vm.permissions[name]["restore"],
                            callback: function($$v) {
                              _vm.$set(_vm.permissions[name], "restore", $$v)
                            },
                            expression: "permissions[name]['restore']"
                          }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "td",
                      [
                        _c("multiselect", {
                          attrs: {
                            options: _vm.selectOptions,
                            "select-label": "",
                            "deselect-label": "",
                            "selected-label": "",
                            searchable: false,
                            "close-on-select": true,
                            "allow-empty": false
                          },
                          on: { input: _vm.updatePermissions },
                          model: {
                            value: _vm.permissions[name]["forceDelete"],
                            callback: function($$v) {
                              _vm.$set(
                                _vm.permissions[name],
                                "forceDelete",
                                $$v
                              )
                            },
                            expression: "permissions[name]['forceDelete']"
                          }
                        })
                      ],
                      1
                    )
                  ])
                })
              )
            ]
          )
        ])
      ])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-e9ffe52e", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-multiselect/dist/vue-multiselect.min.js":
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.VueMultiselect=e():t.VueMultiselect=e()}(this,function(){return function(t){function e(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/",e(e.s=60)}([function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e,n){var i=n(49)("wks"),r=n(30),o=n(0).Symbol,s="function"==typeof o;(t.exports=function(t){return i[t]||(i[t]=s&&o[t]||(s?o:r)("Symbol."+t))}).store=i},function(t,e,n){var i=n(5);t.exports=function(t){if(!i(t))throw TypeError(t+" is not an object!");return t}},function(t,e,n){var i=n(0),r=n(10),o=n(8),s=n(6),u=n(11),a=function(t,e,n){var l,c,f,p,h=t&a.F,d=t&a.G,v=t&a.S,g=t&a.P,m=t&a.B,y=d?i:v?i[e]||(i[e]={}):(i[e]||{}).prototype,b=d?r:r[e]||(r[e]={}),_=b.prototype||(b.prototype={});d&&(n=e);for(l in n)c=!h&&y&&void 0!==y[l],f=(c?y:n)[l],p=m&&c?u(f,i):g&&"function"==typeof f?u(Function.call,f):f,y&&s(y,l,f,t&a.U),b[l]!=f&&o(b,l,p),g&&_[l]!=f&&(_[l]=f)};i.core=r,a.F=1,a.G=2,a.S=4,a.P=8,a.B=16,a.W=32,a.U=64,a.R=128,t.exports=a},function(t,e,n){t.exports=!n(7)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e,n){var i=n(0),r=n(8),o=n(12),s=n(30)("src"),u=Function.toString,a=(""+u).split("toString");n(10).inspectSource=function(t){return u.call(t)},(t.exports=function(t,e,n,u){var l="function"==typeof n;l&&(o(n,"name")||r(n,"name",e)),t[e]!==n&&(l&&(o(n,s)||r(n,s,t[e]?""+t[e]:a.join(String(e)))),t===i?t[e]=n:u?t[e]?t[e]=n:r(t,e,n):(delete t[e],r(t,e,n)))})(Function.prototype,"toString",function(){return"function"==typeof this&&this[s]||u.call(this)})},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e,n){var i=n(13),r=n(25);t.exports=n(4)?function(t,e,n){return i.f(t,e,r(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e){var n=t.exports={version:"2.5.7"};"number"==typeof __e&&(__e=n)},function(t,e,n){var i=n(14);t.exports=function(t,e,n){if(i(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,i){return t.call(e,n,i)};case 3:return function(n,i,r){return t.call(e,n,i,r)}}return function(){return t.apply(e,arguments)}}},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e,n){var i=n(2),r=n(41),o=n(29),s=Object.defineProperty;e.f=n(4)?Object.defineProperty:function(t,e,n){if(i(t),e=o(e,!0),i(n),r)try{return s(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e){t.exports={}},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e,n){"use strict";var i=n(7);t.exports=function(t,e){return!!t&&i(function(){e?t.call(null,function(){},1):t.call(null)})}},function(t,e,n){var i=n(23),r=n(16);t.exports=function(t){return i(r(t))}},function(t,e,n){var i=n(53),r=Math.min;t.exports=function(t){return t>0?r(i(t),9007199254740991):0}},function(t,e,n){var i=n(11),r=n(23),o=n(28),s=n(19),u=n(64);t.exports=function(t,e){var n=1==t,a=2==t,l=3==t,c=4==t,f=6==t,p=5==t||f,h=e||u;return function(e,u,d){for(var v,g,m=o(e),y=r(m),b=i(u,d,3),_=s(y.length),x=0,w=n?h(e,_):a?h(e,0):void 0;_>x;x++)if((p||x in y)&&(v=y[x],g=b(v,x,m),t))if(n)w[x]=g;else if(g)switch(t){case 3:return!0;case 5:return v;case 6:return x;case 2:w.push(v)}else if(c)return!1;return f?-1:l||c?c:w}}},function(t,e,n){var i=n(5),r=n(0).document,o=i(r)&&i(r.createElement);t.exports=function(t){return o?r.createElement(t):{}}},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,e,n){var i=n(9);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==i(t)?t.split(""):Object(t)}},function(t,e){t.exports=!1},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e,n){var i=n(13).f,r=n(12),o=n(1)("toStringTag");t.exports=function(t,e,n){t&&!r(t=n?t:t.prototype,o)&&i(t,o,{configurable:!0,value:e})}},function(t,e,n){var i=n(49)("keys"),r=n(30);t.exports=function(t){return i[t]||(i[t]=r(t))}},function(t,e,n){var i=n(16);t.exports=function(t){return Object(i(t))}},function(t,e,n){var i=n(5);t.exports=function(t,e){if(!i(t))return t;var n,r;if(e&&"function"==typeof(n=t.toString)&&!i(r=n.call(t)))return r;if("function"==typeof(n=t.valueOf)&&!i(r=n.call(t)))return r;if(!e&&"function"==typeof(n=t.toString)&&!i(r=n.call(t)))return r;throw TypeError("Can't convert object to primitive value")}},function(t,e){var n=0,i=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+i).toString(36))}},function(t,e,n){"use strict";var i=n(0),r=n(12),o=n(9),s=n(67),u=n(29),a=n(7),l=n(77).f,c=n(45).f,f=n(13).f,p=n(51).trim,h=i.Number,d=h,v=h.prototype,g="Number"==o(n(44)(v)),m="trim"in String.prototype,y=function(t){var e=u(t,!1);if("string"==typeof e&&e.length>2){e=m?e.trim():p(e,3);var n,i,r,o=e.charCodeAt(0);if(43===o||45===o){if(88===(n=e.charCodeAt(2))||120===n)return NaN}else if(48===o){switch(e.charCodeAt(1)){case 66:case 98:i=2,r=49;break;case 79:case 111:i=8,r=55;break;default:return+e}for(var s,a=e.slice(2),l=0,c=a.length;l<c;l++)if((s=a.charCodeAt(l))<48||s>r)return NaN;return parseInt(a,i)}}return+e};if(!h(" 0o1")||!h("0b1")||h("+0x1")){h=function(t){var e=arguments.length<1?0:t,n=this;return n instanceof h&&(g?a(function(){v.valueOf.call(n)}):"Number"!=o(n))?s(new d(y(e)),n,h):y(e)};for(var b,_=n(4)?l(d):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),x=0;_.length>x;x++)r(d,b=_[x])&&!r(h,b)&&f(h,b,c(d,b));h.prototype=v,v.constructor=h,n(6)(i,"Number",h)}},function(t,e,n){"use strict";function i(t){return 0!==t&&(!(!Array.isArray(t)||0!==t.length)||!t)}function r(t){return function(){return!t.apply(void 0,arguments)}}function o(t,e){return void 0===t&&(t="undefined"),null===t&&(t="null"),!1===t&&(t="false"),-1!==t.toString().toLowerCase().indexOf(e.trim())}function s(t,e,n,i){return t.filter(function(t){return o(i(t,n),e)})}function u(t){return t.filter(function(t){return!t.$isLabel})}function a(t,e){return function(n){return n.reduce(function(n,i){return i[t]&&i[t].length?(n.push({$groupLabel:i[e],$isLabel:!0}),n.concat(i[t])):n},[])}}function l(t,e,i,r,o){return function(u){return u.map(function(u){var a;if(!u[i])return console.warn("Options passed to vue-multiselect do not contain groups, despite the config."),[];var l=s(u[i],t,e,o);return l.length?(a={},n.i(d.a)(a,r,u[r]),n.i(d.a)(a,i,l),a):[]})}}var c=n(59),f=n(54),p=(n.n(f),n(95)),h=(n.n(p),n(31)),d=(n.n(h),n(58)),v=n(91),g=(n.n(v),n(98)),m=(n.n(g),n(92)),y=(n.n(m),n(88)),b=(n.n(y),n(97)),_=(n.n(b),n(89)),x=(n.n(_),n(96)),w=(n.n(x),n(93)),S=(n.n(w),n(90)),O=(n.n(S),function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(t){return e.reduce(function(t,e){return e(t)},t)}});e.a={data:function(){return{search:"",isOpen:!1,prefferedOpenDirection:"below",optimizedHeight:this.maxHeight}},props:{internalSearch:{type:Boolean,default:!0},options:{type:Array,required:!0},multiple:{type:Boolean,default:!1},value:{type:null,default:function(){return[]}},trackBy:{type:String},label:{type:String},searchable:{type:Boolean,default:!0},clearOnSelect:{type:Boolean,default:!0},hideSelected:{type:Boolean,default:!1},placeholder:{type:String,default:"Select option"},allowEmpty:{type:Boolean,default:!0},resetAfter:{type:Boolean,default:!1},closeOnSelect:{type:Boolean,default:!0},customLabel:{type:Function,default:function(t,e){return i(t)?"":e?t[e]:t}},taggable:{type:Boolean,default:!1},tagPlaceholder:{type:String,default:"Press enter to create a tag"},tagPosition:{type:String,default:"top"},max:{type:[Number,Boolean],default:!1},id:{default:null},optionsLimit:{type:Number,default:1e3},groupValues:{type:String},groupLabel:{type:String},groupSelect:{type:Boolean,default:!1},blockKeys:{type:Array,default:function(){return[]}},preserveSearch:{type:Boolean,default:!1},preselectFirst:{type:Boolean,default:!1}},mounted:function(){this.multiple||this.clearOnSelect||console.warn("[Vue-Multiselect warn]: ClearOnSelect and Multiple props can’t be both set to false."),!this.multiple&&this.max&&console.warn("[Vue-Multiselect warn]: Max prop should not be used when prop Multiple equals false."),this.preselectFirst&&!this.internalValue.length&&this.options.length&&this.select(this.filteredOptions[0])},computed:{internalValue:function(){return this.value||0===this.value?Array.isArray(this.value)?this.value:[this.value]:[]},filteredOptions:function(){var t=this.search||"",e=t.toLowerCase().trim(),n=this.options.concat();return n=this.internalSearch?this.groupValues?this.filterAndFlat(n,e,this.label):s(n,e,this.label,this.customLabel):this.groupValues?a(this.groupValues,this.groupLabel)(n):n,n=this.hideSelected?n.filter(r(this.isSelected)):n,this.taggable&&e.length&&!this.isExistingOption(e)&&("bottom"===this.tagPosition?n.push({isTag:!0,label:t}):n.unshift({isTag:!0,label:t})),n.slice(0,this.optionsLimit)},valueKeys:function(){var t=this;return this.trackBy?this.internalValue.map(function(e){return e[t.trackBy]}):this.internalValue},optionKeys:function(){var t=this;return(this.groupValues?this.flatAndStrip(this.options):this.options).map(function(e){return t.customLabel(e,t.label).toString().toLowerCase()})},currentOptionLabel:function(){return this.multiple?this.searchable?"":this.placeholder:this.internalValue.length?this.getOptionLabel(this.internalValue[0]):this.searchable?"":this.placeholder}},watch:{internalValue:function(){this.resetAfter&&this.internalValue.length&&(this.search="",this.$emit("input",this.multiple?[]:null))},search:function(){this.$emit("search-change",this.search,this.id)}},methods:{getValue:function(){return this.multiple?this.internalValue:0===this.internalValue.length?null:this.internalValue[0]},filterAndFlat:function(t,e,n){return O(l(e,n,this.groupValues,this.groupLabel,this.customLabel),a(this.groupValues,this.groupLabel))(t)},flatAndStrip:function(t){return O(a(this.groupValues,this.groupLabel),u)(t)},updateSearch:function(t){this.search=t},isExistingOption:function(t){return!!this.options&&this.optionKeys.indexOf(t)>-1},isSelected:function(t){var e=this.trackBy?t[this.trackBy]:t;return this.valueKeys.indexOf(e)>-1},getOptionLabel:function(t){if(i(t))return"";if(t.isTag)return t.label;if(t.$isLabel)return t.$groupLabel;var e=this.customLabel(t,this.label);return i(e)?"":e},select:function(t,e){if(t.$isLabel&&this.groupSelect)return void this.selectGroup(t);if(!(-1!==this.blockKeys.indexOf(e)||this.disabled||t.$isDisabled||t.$isLabel)&&(!this.max||!this.multiple||this.internalValue.length!==this.max)&&("Tab"!==e||this.pointerDirty)){if(t.isTag)this.$emit("tag",t.label,this.id),this.search="",this.closeOnSelect&&!this.multiple&&this.deactivate();else{if(this.isSelected(t))return void("Tab"!==e&&this.removeElement(t));this.$emit("select",t,this.id),this.multiple?this.$emit("input",this.internalValue.concat([t]),this.id):this.$emit("input",t,this.id),this.clearOnSelect&&(this.search="")}this.closeOnSelect&&this.deactivate()}},selectGroup:function(t){var e=this,n=this.options.find(function(n){return n[e.groupLabel]===t.$groupLabel});if(n)if(this.wholeGroupSelected(n)){this.$emit("remove",n[this.groupValues],this.id);var i=this.internalValue.filter(function(t){return-1===n[e.groupValues].indexOf(t)});this.$emit("input",i,this.id)}else{var o=n[this.groupValues].filter(r(this.isSelected));this.$emit("select",o,this.id),this.$emit("input",this.internalValue.concat(o),this.id)}},wholeGroupSelected:function(t){return t[this.groupValues].every(this.isSelected)},removeElement:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];if(!this.disabled){if(!this.allowEmpty&&this.internalValue.length<=1)return void this.deactivate();var i="object"===n.i(c.a)(t)?this.valueKeys.indexOf(t[this.trackBy]):this.valueKeys.indexOf(t);if(this.$emit("remove",t,this.id),this.multiple){var r=this.internalValue.slice(0,i).concat(this.internalValue.slice(i+1));this.$emit("input",r,this.id)}else this.$emit("input",null,this.id);this.closeOnSelect&&e&&this.deactivate()}},removeLastElement:function(){-1===this.blockKeys.indexOf("Delete")&&0===this.search.length&&Array.isArray(this.internalValue)&&this.removeElement(this.internalValue[this.internalValue.length-1],!1)},activate:function(){var t=this;this.isOpen||this.disabled||(this.adjustPosition(),this.groupValues&&0===this.pointer&&this.filteredOptions.length&&(this.pointer=1),this.isOpen=!0,this.searchable?(this.preserveSearch||(this.search=""),this.$nextTick(function(){return t.$refs.search.focus()})):this.$el.focus(),this.$emit("open",this.id))},deactivate:function(){this.isOpen&&(this.isOpen=!1,this.searchable?this.$refs.search.blur():this.$el.blur(),this.preserveSearch||(this.search=""),this.$emit("close",this.getValue(),this.id))},toggle:function(){this.isOpen?this.deactivate():this.activate()},adjustPosition:function(){if("undefined"!=typeof window){var t=this.$el.getBoundingClientRect().top,e=window.innerHeight-this.$el.getBoundingClientRect().bottom;e>this.maxHeight||e>t||"below"===this.openDirection||"bottom"===this.openDirection?(this.prefferedOpenDirection="below",this.optimizedHeight=Math.min(e-40,this.maxHeight)):(this.prefferedOpenDirection="above",this.optimizedHeight=Math.min(t-40,this.maxHeight))}}}}},function(t,e,n){"use strict";var i=n(54),r=(n.n(i),n(31));n.n(r);e.a={data:function(){return{pointer:0,pointerDirty:!1}},props:{showPointer:{type:Boolean,default:!0},optionHeight:{type:Number,default:40}},computed:{pointerPosition:function(){return this.pointer*this.optionHeight},visibleElements:function(){return this.optimizedHeight/this.optionHeight}},watch:{filteredOptions:function(){this.pointerAdjust()},isOpen:function(){this.pointerDirty=!1}},methods:{optionHighlight:function(t,e){return{"multiselect__option--highlight":t===this.pointer&&this.showPointer,"multiselect__option--selected":this.isSelected(e)}},groupHighlight:function(t,e){var n=this;if(!this.groupSelect)return["multiselect__option--group","multiselect__option--disabled"];var i=this.options.find(function(t){return t[n.groupLabel]===e.$groupLabel});return["multiselect__option--group",{"multiselect__option--highlight":t===this.pointer&&this.showPointer},{"multiselect__option--group-selected":this.wholeGroupSelected(i)}]},addPointerElement:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Enter",e=t.key;this.filteredOptions.length>0&&this.select(this.filteredOptions[this.pointer],e),this.pointerReset()},pointerForward:function(){this.pointer<this.filteredOptions.length-1&&(this.pointer++,this.$refs.list.scrollTop<=this.pointerPosition-(this.visibleElements-1)*this.optionHeight&&(this.$refs.list.scrollTop=this.pointerPosition-(this.visibleElements-1)*this.optionHeight),this.filteredOptions[this.pointer]&&this.filteredOptions[this.pointer].$isLabel&&!this.groupSelect&&this.pointerForward()),this.pointerDirty=!0},pointerBackward:function(){this.pointer>0?(this.pointer--,this.$refs.list.scrollTop>=this.pointerPosition&&(this.$refs.list.scrollTop=this.pointerPosition),this.filteredOptions[this.pointer]&&this.filteredOptions[this.pointer].$isLabel&&!this.groupSelect&&this.pointerBackward()):this.filteredOptions[this.pointer]&&this.filteredOptions[0].$isLabel&&!this.groupSelect&&this.pointerForward(),this.pointerDirty=!0},pointerReset:function(){this.closeOnSelect&&(this.pointer=0,this.$refs.list&&(this.$refs.list.scrollTop=0))},pointerAdjust:function(){this.pointer>=this.filteredOptions.length-1&&(this.pointer=this.filteredOptions.length?this.filteredOptions.length-1:0),this.filteredOptions.length>0&&this.filteredOptions[this.pointer].$isLabel&&!this.groupSelect&&this.pointerForward()},pointerSet:function(t){this.pointer=t,this.pointerDirty=!0}}}},function(t,e,n){"use strict";var i=n(36),r=n(74),o=n(15),s=n(18);t.exports=n(72)(Array,"Array",function(t,e){this._t=s(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,r(1)):"keys"==e?r(0,n):"values"==e?r(0,t[n]):r(0,[n,t[n]])},"values"),o.Arguments=o.Array,i("keys"),i("values"),i("entries")},function(t,e,n){"use strict";var i=n(31),r=(n.n(i),n(32)),o=n(33);e.a={name:"vue-multiselect",mixins:[r.a,o.a],props:{name:{type:String,default:""},selectLabel:{type:String,default:"Press enter to select"},selectGroupLabel:{type:String,default:"Press enter to select group"},selectedLabel:{type:String,default:"Selected"},deselectLabel:{type:String,default:"Press enter to remove"},deselectGroupLabel:{type:String,default:"Press enter to deselect group"},showLabels:{type:Boolean,default:!0},limit:{type:Number,default:99999},maxHeight:{type:Number,default:300},limitText:{type:Function,default:function(t){return"and ".concat(t," more")}},loading:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},openDirection:{type:String,default:""},showNoOptions:{type:Boolean,default:!0},showNoResults:{type:Boolean,default:!0},tabindex:{type:Number,default:0}},computed:{isSingleLabelVisible:function(){return this.singleValue&&(!this.isOpen||!this.searchable)&&!this.visibleValues.length},isPlaceholderVisible:function(){return!(this.internalValue.length||this.searchable&&this.isOpen)},visibleValues:function(){return this.multiple?this.internalValue.slice(0,this.limit):[]},singleValue:function(){return this.internalValue[0]},deselectLabelText:function(){return this.showLabels?this.deselectLabel:""},deselectGroupLabelText:function(){return this.showLabels?this.deselectGroupLabel:""},selectLabelText:function(){return this.showLabels?this.selectLabel:""},selectGroupLabelText:function(){return this.showLabels?this.selectGroupLabel:""},selectedLabelText:function(){return this.showLabels?this.selectedLabel:""},inputStyle:function(){if(this.searchable||this.multiple&&this.value&&this.value.length)return this.isOpen?{width:"auto"}:{width:"0",position:"absolute",padding:"0"}},contentStyle:function(){return this.options.length?{display:"inline-block"}:{display:"block"}},isAbove:function(){return"above"===this.openDirection||"top"===this.openDirection||"below"!==this.openDirection&&"bottom"!==this.openDirection&&"above"===this.prefferedOpenDirection},showSearchInput:function(){return this.searchable&&(!this.hasSingleSelectedSlot||!this.visibleSingleValue&&0!==this.visibleSingleValue||this.isOpen)}}}},function(t,e,n){var i=n(1)("unscopables"),r=Array.prototype;void 0==r[i]&&n(8)(r,i,{}),t.exports=function(t){r[i][t]=!0}},function(t,e,n){var i=n(18),r=n(19),o=n(85);t.exports=function(t){return function(e,n,s){var u,a=i(e),l=r(a.length),c=o(s,l);if(t&&n!=n){for(;l>c;)if((u=a[c++])!=u)return!0}else for(;l>c;c++)if((t||c in a)&&a[c]===n)return t||c||0;return!t&&-1}}},function(t,e,n){var i=n(9),r=n(1)("toStringTag"),o="Arguments"==i(function(){return arguments}()),s=function(t,e){try{return t[e]}catch(t){}};t.exports=function(t){var e,n,u;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=s(e=Object(t),r))?n:o?i(e):"Object"==(u=i(e))&&"function"==typeof e.callee?"Arguments":u}},function(t,e,n){"use strict";var i=n(2);t.exports=function(){var t=i(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},function(t,e,n){var i=n(0).document;t.exports=i&&i.documentElement},function(t,e,n){t.exports=!n(4)&&!n(7)(function(){return 7!=Object.defineProperty(n(21)("div"),"a",{get:function(){return 7}}).a})},function(t,e,n){var i=n(9);t.exports=Array.isArray||function(t){return"Array"==i(t)}},function(t,e,n){"use strict";function i(t){var e,n;this.promise=new t(function(t,i){if(void 0!==e||void 0!==n)throw TypeError("Bad Promise constructor");e=t,n=i}),this.resolve=r(e),this.reject=r(n)}var r=n(14);t.exports.f=function(t){return new i(t)}},function(t,e,n){var i=n(2),r=n(76),o=n(22),s=n(27)("IE_PROTO"),u=function(){},a=function(){var t,e=n(21)("iframe"),i=o.length;for(e.style.display="none",n(40).appendChild(e),e.src="javascript:",t=e.contentWindow.document,t.open(),t.write("<script>document.F=Object<\/script>"),t.close(),a=t.F;i--;)delete a.prototype[o[i]];return a()};t.exports=Object.create||function(t,e){var n;return null!==t?(u.prototype=i(t),n=new u,u.prototype=null,n[s]=t):n=a(),void 0===e?n:r(n,e)}},function(t,e,n){var i=n(79),r=n(25),o=n(18),s=n(29),u=n(12),a=n(41),l=Object.getOwnPropertyDescriptor;e.f=n(4)?l:function(t,e){if(t=o(t),e=s(e,!0),a)try{return l(t,e)}catch(t){}if(u(t,e))return r(!i.f.call(t,e),t[e])}},function(t,e,n){var i=n(12),r=n(18),o=n(37)(!1),s=n(27)("IE_PROTO");t.exports=function(t,e){var n,u=r(t),a=0,l=[];for(n in u)n!=s&&i(u,n)&&l.push(n);for(;e.length>a;)i(u,n=e[a++])&&(~o(l,n)||l.push(n));return l}},function(t,e,n){var i=n(46),r=n(22);t.exports=Object.keys||function(t){return i(t,r)}},function(t,e,n){var i=n(2),r=n(5),o=n(43);t.exports=function(t,e){if(i(t),r(e)&&e.constructor===t)return e;var n=o.f(t);return(0,n.resolve)(e),n.promise}},function(t,e,n){var i=n(10),r=n(0),o=r["__core-js_shared__"]||(r["__core-js_shared__"]={});(t.exports=function(t,e){return o[t]||(o[t]=void 0!==e?e:{})})("versions",[]).push({version:i.version,mode:n(24)?"pure":"global",copyright:"© 2018 Denis Pushkarev (zloirock.ru)"})},function(t,e,n){var i=n(2),r=n(14),o=n(1)("species");t.exports=function(t,e){var n,s=i(t).constructor;return void 0===s||void 0==(n=i(s)[o])?e:r(n)}},function(t,e,n){var i=n(3),r=n(16),o=n(7),s=n(84),u="["+s+"]",a="​",l=RegExp("^"+u+u+"*"),c=RegExp(u+u+"*$"),f=function(t,e,n){var r={},u=o(function(){return!!s[t]()||a[t]()!=a}),l=r[t]=u?e(p):s[t];n&&(r[n]=l),i(i.P+i.F*u,"String",r)},p=f.trim=function(t,e){return t=String(r(t)),1&e&&(t=t.replace(l,"")),2&e&&(t=t.replace(c,"")),t};t.exports=f},function(t,e,n){var i,r,o,s=n(11),u=n(68),a=n(40),l=n(21),c=n(0),f=c.process,p=c.setImmediate,h=c.clearImmediate,d=c.MessageChannel,v=c.Dispatch,g=0,m={},y=function(){var t=+this;if(m.hasOwnProperty(t)){var e=m[t];delete m[t],e()}},b=function(t){y.call(t.data)};p&&h||(p=function(t){for(var e=[],n=1;arguments.length>n;)e.push(arguments[n++]);return m[++g]=function(){u("function"==typeof t?t:Function(t),e)},i(g),g},h=function(t){delete m[t]},"process"==n(9)(f)?i=function(t){f.nextTick(s(y,t,1))}:v&&v.now?i=function(t){v.now(s(y,t,1))}:d?(r=new d,o=r.port2,r.port1.onmessage=b,i=s(o.postMessage,o,1)):c.addEventListener&&"function"==typeof postMessage&&!c.importScripts?(i=function(t){c.postMessage(t+"","*")},c.addEventListener("message",b,!1)):i="onreadystatechange"in l("script")?function(t){a.appendChild(l("script")).onreadystatechange=function(){a.removeChild(this),y.call(t)}}:function(t){setTimeout(s(y,t,1),0)}),t.exports={set:p,clear:h}},function(t,e){var n=Math.ceil,i=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?i:n)(t)}},function(t,e,n){"use strict";var i=n(3),r=n(20)(5),o=!0;"find"in[]&&Array(1).find(function(){o=!1}),i(i.P+i.F*o,"Array",{find:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}}),n(36)("find")},function(t,e,n){"use strict";var i,r,o,s,u=n(24),a=n(0),l=n(11),c=n(38),f=n(3),p=n(5),h=n(14),d=n(61),v=n(66),g=n(50),m=n(52).set,y=n(75)(),b=n(43),_=n(80),x=n(86),w=n(48),S=a.TypeError,O=a.process,L=O&&O.versions,P=L&&L.v8||"",k=a.Promise,T="process"==c(O),E=function(){},V=r=b.f,A=!!function(){try{var t=k.resolve(1),e=(t.constructor={})[n(1)("species")]=function(t){t(E,E)};return(T||"function"==typeof PromiseRejectionEvent)&&t.then(E)instanceof e&&0!==P.indexOf("6.6")&&-1===x.indexOf("Chrome/66")}catch(t){}}(),C=function(t){var e;return!(!p(t)||"function"!=typeof(e=t.then))&&e},j=function(t,e){if(!t._n){t._n=!0;var n=t._c;y(function(){for(var i=t._v,r=1==t._s,o=0;n.length>o;)!function(e){var n,o,s,u=r?e.ok:e.fail,a=e.resolve,l=e.reject,c=e.domain;try{u?(r||(2==t._h&&$(t),t._h=1),!0===u?n=i:(c&&c.enter(),n=u(i),c&&(c.exit(),s=!0)),n===e.promise?l(S("Promise-chain cycle")):(o=C(n))?o.call(n,a,l):a(n)):l(i)}catch(t){c&&!s&&c.exit(),l(t)}}(n[o++]);t._c=[],t._n=!1,e&&!t._h&&N(t)})}},N=function(t){m.call(a,function(){var e,n,i,r=t._v,o=D(t);if(o&&(e=_(function(){T?O.emit("unhandledRejection",r,t):(n=a.onunhandledrejection)?n({promise:t,reason:r}):(i=a.console)&&i.error&&i.error("Unhandled promise rejection",r)}),t._h=T||D(t)?2:1),t._a=void 0,o&&e.e)throw e.v})},D=function(t){return 1!==t._h&&0===(t._a||t._c).length},$=function(t){m.call(a,function(){var e;T?O.emit("rejectionHandled",t):(e=a.onrejectionhandled)&&e({promise:t,reason:t._v})})},M=function(t){var e=this;e._d||(e._d=!0,e=e._w||e,e._v=t,e._s=2,e._a||(e._a=e._c.slice()),j(e,!0))},F=function(t){var e,n=this;if(!n._d){n._d=!0,n=n._w||n;try{if(n===t)throw S("Promise can't be resolved itself");(e=C(t))?y(function(){var i={_w:n,_d:!1};try{e.call(t,l(F,i,1),l(M,i,1))}catch(t){M.call(i,t)}}):(n._v=t,n._s=1,j(n,!1))}catch(t){M.call({_w:n,_d:!1},t)}}};A||(k=function(t){d(this,k,"Promise","_h"),h(t),i.call(this);try{t(l(F,this,1),l(M,this,1))}catch(t){M.call(this,t)}},i=function(t){this._c=[],this._a=void 0,this._s=0,this._d=!1,this._v=void 0,this._h=0,this._n=!1},i.prototype=n(81)(k.prototype,{then:function(t,e){var n=V(g(this,k));return n.ok="function"!=typeof t||t,n.fail="function"==typeof e&&e,n.domain=T?O.domain:void 0,this._c.push(n),this._a&&this._a.push(n),this._s&&j(this,!1),n.promise},catch:function(t){return this.then(void 0,t)}}),o=function(){var t=new i;this.promise=t,this.resolve=l(F,t,1),this.reject=l(M,t,1)},b.f=V=function(t){return t===k||t===s?new o(t):r(t)}),f(f.G+f.W+f.F*!A,{Promise:k}),n(26)(k,"Promise"),n(83)("Promise"),s=n(10).Promise,f(f.S+f.F*!A,"Promise",{reject:function(t){var e=V(this);return(0,e.reject)(t),e.promise}}),f(f.S+f.F*(u||!A),"Promise",{resolve:function(t){return w(u&&this===s?k:this,t)}}),f(f.S+f.F*!(A&&n(73)(function(t){k.all(t).catch(E)})),"Promise",{all:function(t){var e=this,n=V(e),i=n.resolve,r=n.reject,o=_(function(){var n=[],o=0,s=1;v(t,!1,function(t){var u=o++,a=!1;n.push(void 0),s++,e.resolve(t).then(function(t){a||(a=!0,n[u]=t,--s||i(n))},r)}),--s||i(n)});return o.e&&r(o.v),n.promise},race:function(t){var e=this,n=V(e),i=n.reject,r=_(function(){v(t,!1,function(t){e.resolve(t).then(n.resolve,i)})});return r.e&&i(r.v),n.promise}})},function(t,e,n){"use strict";var i=n(3),r=n(10),o=n(0),s=n(50),u=n(48);i(i.P+i.R,"Promise",{finally:function(t){var e=s(this,r.Promise||o.Promise),n="function"==typeof t;return this.then(n?function(n){return u(e,t()).then(function(){return n})}:t,n?function(n){return u(e,t()).then(function(){throw n})}:t)}})},function(t,e,n){"use strict";function i(t){n(99)}var r=n(35),o=n(101),s=n(100),u=i,a=s(r.a,o.a,!1,u,null,null);e.a=a.exports},function(t,e,n){"use strict";function i(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}e.a=i},function(t,e,n){"use strict";function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function r(t){return(r="function"==typeof Symbol&&"symbol"===i(Symbol.iterator)?function(t){return i(t)}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":i(t)})(t)}e.a=r},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(34),r=(n.n(i),n(55)),o=(n.n(r),n(56)),s=(n.n(o),n(57)),u=n(32),a=n(33);n.d(e,"Multiselect",function(){return s.a}),n.d(e,"multiselectMixin",function(){return u.a}),n.d(e,"pointerMixin",function(){return a.a}),e.default=s.a},function(t,e){t.exports=function(t,e,n,i){if(!(t instanceof e)||void 0!==i&&i in t)throw TypeError(n+": incorrect invocation!");return t}},function(t,e,n){var i=n(14),r=n(28),o=n(23),s=n(19);t.exports=function(t,e,n,u,a){i(e);var l=r(t),c=o(l),f=s(l.length),p=a?f-1:0,h=a?-1:1;if(n<2)for(;;){if(p in c){u=c[p],p+=h;break}if(p+=h,a?p<0:f<=p)throw TypeError("Reduce of empty array with no initial value")}for(;a?p>=0:f>p;p+=h)p in c&&(u=e(u,c[p],p,l));return u}},function(t,e,n){var i=n(5),r=n(42),o=n(1)("species");t.exports=function(t){var e;return r(t)&&(e=t.constructor,"function"!=typeof e||e!==Array&&!r(e.prototype)||(e=void 0),i(e)&&null===(e=e[o])&&(e=void 0)),void 0===e?Array:e}},function(t,e,n){var i=n(63);t.exports=function(t,e){return new(i(t))(e)}},function(t,e,n){"use strict";var i=n(8),r=n(6),o=n(7),s=n(16),u=n(1);t.exports=function(t,e,n){var a=u(t),l=n(s,a,""[t]),c=l[0],f=l[1];o(function(){var e={};return e[a]=function(){return 7},7!=""[t](e)})&&(r(String.prototype,t,c),i(RegExp.prototype,a,2==e?function(t,e){return f.call(t,this,e)}:function(t){return f.call(t,this)}))}},function(t,e,n){var i=n(11),r=n(70),o=n(69),s=n(2),u=n(19),a=n(87),l={},c={},e=t.exports=function(t,e,n,f,p){var h,d,v,g,m=p?function(){return t}:a(t),y=i(n,f,e?2:1),b=0;if("function"!=typeof m)throw TypeError(t+" is not iterable!");if(o(m)){for(h=u(t.length);h>b;b++)if((g=e?y(s(d=t[b])[0],d[1]):y(t[b]))===l||g===c)return g}else for(v=m.call(t);!(d=v.next()).done;)if((g=r(v,y,d.value,e))===l||g===c)return g};e.BREAK=l,e.RETURN=c},function(t,e,n){var i=n(5),r=n(82).set;t.exports=function(t,e,n){var o,s=e.constructor;return s!==n&&"function"==typeof s&&(o=s.prototype)!==n.prototype&&i(o)&&r&&r(t,o),t}},function(t,e){t.exports=function(t,e,n){var i=void 0===n;switch(e.length){case 0:return i?t():t.call(n);case 1:return i?t(e[0]):t.call(n,e[0]);case 2:return i?t(e[0],e[1]):t.call(n,e[0],e[1]);case 3:return i?t(e[0],e[1],e[2]):t.call(n,e[0],e[1],e[2]);case 4:return i?t(e[0],e[1],e[2],e[3]):t.call(n,e[0],e[1],e[2],e[3])}return t.apply(n,e)}},function(t,e,n){var i=n(15),r=n(1)("iterator"),o=Array.prototype;t.exports=function(t){return void 0!==t&&(i.Array===t||o[r]===t)}},function(t,e,n){var i=n(2);t.exports=function(t,e,n,r){try{return r?e(i(n)[0],n[1]):e(n)}catch(e){var o=t.return;throw void 0!==o&&i(o.call(t)),e}}},function(t,e,n){"use strict";var i=n(44),r=n(25),o=n(26),s={};n(8)(s,n(1)("iterator"),function(){return this}),t.exports=function(t,e,n){t.prototype=i(s,{next:r(1,n)}),o(t,e+" Iterator")}},function(t,e,n){"use strict";var i=n(24),r=n(3),o=n(6),s=n(8),u=n(15),a=n(71),l=n(26),c=n(78),f=n(1)("iterator"),p=!([].keys&&"next"in[].keys()),h=function(){return this};t.exports=function(t,e,n,d,v,g,m){a(n,e,d);var y,b,_,x=function(t){if(!p&&t in L)return L[t];switch(t){case"keys":case"values":return function(){return new n(this,t)}}return function(){return new n(this,t)}},w=e+" Iterator",S="values"==v,O=!1,L=t.prototype,P=L[f]||L["@@iterator"]||v&&L[v],k=P||x(v),T=v?S?x("entries"):k:void 0,E="Array"==e?L.entries||P:P;if(E&&(_=c(E.call(new t)))!==Object.prototype&&_.next&&(l(_,w,!0),i||"function"==typeof _[f]||s(_,f,h)),S&&P&&"values"!==P.name&&(O=!0,k=function(){return P.call(this)}),i&&!m||!p&&!O&&L[f]||s(L,f,k),u[e]=k,u[w]=h,v)if(y={values:S?k:x("values"),keys:g?k:x("keys"),entries:T},m)for(b in y)b in L||o(L,b,y[b]);else r(r.P+r.F*(p||O),e,y);return y}},function(t,e,n){var i=n(1)("iterator"),r=!1;try{var o=[7][i]();o.return=function(){r=!0},Array.from(o,function(){throw 2})}catch(t){}t.exports=function(t,e){if(!e&&!r)return!1;var n=!1;try{var o=[7],s=o[i]();s.next=function(){return{done:n=!0}},o[i]=function(){return s},t(o)}catch(t){}return n}},function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},function(t,e,n){var i=n(0),r=n(52).set,o=i.MutationObserver||i.WebKitMutationObserver,s=i.process,u=i.Promise,a="process"==n(9)(s);t.exports=function(){var t,e,n,l=function(){var i,r;for(a&&(i=s.domain)&&i.exit();t;){r=t.fn,t=t.next;try{r()}catch(i){throw t?n():e=void 0,i}}e=void 0,i&&i.enter()};if(a)n=function(){s.nextTick(l)};else if(!o||i.navigator&&i.navigator.standalone)if(u&&u.resolve){var c=u.resolve(void 0);n=function(){c.then(l)}}else n=function(){r.call(i,l)};else{var f=!0,p=document.createTextNode("");new o(l).observe(p,{characterData:!0}),n=function(){p.data=f=!f}}return function(i){var r={fn:i,next:void 0};e&&(e.next=r),t||(t=r,n()),e=r}}},function(t,e,n){var i=n(13),r=n(2),o=n(47);t.exports=n(4)?Object.defineProperties:function(t,e){r(t);for(var n,s=o(e),u=s.length,a=0;u>a;)i.f(t,n=s[a++],e[n]);return t}},function(t,e,n){var i=n(46),r=n(22).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return i(t,r)}},function(t,e,n){var i=n(12),r=n(28),o=n(27)("IE_PROTO"),s=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=r(t),i(t,o)?t[o]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?s:null}},function(t,e){e.f={}.propertyIsEnumerable},function(t,e){t.exports=function(t){try{return{e:!1,v:t()}}catch(t){return{e:!0,v:t}}}},function(t,e,n){var i=n(6);t.exports=function(t,e,n){for(var r in e)i(t,r,e[r],n);return t}},function(t,e,n){var i=n(5),r=n(2),o=function(t,e){if(r(t),!i(e)&&null!==e)throw TypeError(e+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,e,i){try{i=n(11)(Function.call,n(45).f(Object.prototype,"__proto__").set,2),i(t,[]),e=!(t instanceof Array)}catch(t){e=!0}return function(t,n){return o(t,n),e?t.__proto__=n:i(t,n),t}}({},!1):void 0),check:o}},function(t,e,n){"use strict";var i=n(0),r=n(13),o=n(4),s=n(1)("species");t.exports=function(t){var e=i[t];o&&e&&!e[s]&&r.f(e,s,{configurable:!0,get:function(){return this}})}},function(t,e){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"},function(t,e,n){var i=n(53),r=Math.max,o=Math.min;t.exports=function(t,e){return t=i(t),t<0?r(t+e,0):o(t,e)}},function(t,e,n){var i=n(0),r=i.navigator;t.exports=r&&r.userAgent||""},function(t,e,n){var i=n(38),r=n(1)("iterator"),o=n(15);t.exports=n(10).getIteratorMethod=function(t){if(void 0!=t)return t[r]||t["@@iterator"]||o[i(t)]}},function(t,e,n){"use strict";var i=n(3),r=n(20)(2);i(i.P+i.F*!n(17)([].filter,!0),"Array",{filter:function(t){return r(this,t,arguments[1])}})},function(t,e,n){"use strict";var i=n(3),r=n(37)(!1),o=[].indexOf,s=!!o&&1/[1].indexOf(1,-0)<0;i(i.P+i.F*(s||!n(17)(o)),"Array",{indexOf:function(t){return s?o.apply(this,arguments)||0:r(this,t,arguments[1])}})},function(t,e,n){var i=n(3);i(i.S,"Array",{isArray:n(42)})},function(t,e,n){"use strict";var i=n(3),r=n(20)(1);i(i.P+i.F*!n(17)([].map,!0),"Array",{map:function(t){return r(this,t,arguments[1])}})},function(t,e,n){"use strict";var i=n(3),r=n(62);i(i.P+i.F*!n(17)([].reduce,!0),"Array",{reduce:function(t){return r(this,t,arguments.length,arguments[1],!1)}})},function(t,e,n){var i=Date.prototype,r=i.toString,o=i.getTime;new Date(NaN)+""!="Invalid Date"&&n(6)(i,"toString",function(){var t=o.call(this);return t===t?r.call(this):"Invalid Date"})},function(t,e,n){n(4)&&"g"!=/./g.flags&&n(13).f(RegExp.prototype,"flags",{configurable:!0,get:n(39)})},function(t,e,n){n(65)("search",1,function(t,e,n){return[function(n){"use strict";var i=t(this),r=void 0==n?void 0:n[e];return void 0!==r?r.call(n,i):new RegExp(n)[e](String(i))},n]})},function(t,e,n){"use strict";n(94);var i=n(2),r=n(39),o=n(4),s=/./.toString,u=function(t){n(6)(RegExp.prototype,"toString",t,!0)};n(7)(function(){return"/a/b"!=s.call({source:"a",flags:"b"})})?u(function(){var t=i(this);return"/".concat(t.source,"/","flags"in t?t.flags:!o&&t instanceof RegExp?r.call(t):void 0)}):"toString"!=s.name&&u(function(){return s.call(this)})},function(t,e,n){"use strict";n(51)("trim",function(t){return function(){return t(this,3)}})},function(t,e,n){for(var i=n(34),r=n(47),o=n(6),s=n(0),u=n(8),a=n(15),l=n(1),c=l("iterator"),f=l("toStringTag"),p=a.Array,h={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},d=r(h),v=0;v<d.length;v++){var g,m=d[v],y=h[m],b=s[m],_=b&&b.prototype;if(_&&(_[c]||u(_,c,p),_[f]||u(_,f,m),a[m]=p,y))for(g in i)_[g]||o(_,g,i[g],!0)}},function(t,e){},function(t,e){t.exports=function(t,e,n,i,r,o){var s,u=t=t||{},a=typeof t.default;"object"!==a&&"function"!==a||(s=t,u=t.default);var l="function"==typeof u?u.options:u;e&&(l.render=e.render,l.staticRenderFns=e.staticRenderFns,l._compiled=!0),n&&(l.functional=!0),r&&(l._scopeId=r);var c;if(o?(c=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(o)},l._ssrRegister=c):i&&(c=i),c){var f=l.functional,p=f?l.render:l.beforeCreate;f?(l._injectStyles=c,l.render=function(t,e){return c.call(e),p(t,e)}):l.beforeCreate=p?[].concat(p,c):[c]}return{esModule:s,exports:u,options:l}}},function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"multiselect",class:{"multiselect--active":t.isOpen,"multiselect--disabled":t.disabled,"multiselect--above":t.isAbove},attrs:{tabindex:t.searchable?-1:t.tabindex},on:{focus:function(e){t.activate()},blur:function(e){!t.searchable&&t.deactivate()},keydown:[function(e){return"button"in e||!t._k(e.keyCode,"down",40,e.key,["Down","ArrowDown"])?e.target!==e.currentTarget?null:(e.preventDefault(),void t.pointerForward()):null},function(e){return"button"in e||!t._k(e.keyCode,"up",38,e.key,["Up","ArrowUp"])?e.target!==e.currentTarget?null:(e.preventDefault(),void t.pointerBackward()):null},function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")||!t._k(e.keyCode,"tab",9,e.key,"Tab")?(e.stopPropagation(),e.target!==e.currentTarget?null:void t.addPointerElement(e)):null}],keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"esc",27,e.key,"Escape"))return null;t.deactivate()}}},[t._t("caret",[n("div",{staticClass:"multiselect__select",on:{mousedown:function(e){e.preventDefault(),e.stopPropagation(),t.toggle()}}})],{toggle:t.toggle}),t._v(" "),t._t("clear",null,{search:t.search}),t._v(" "),n("div",{ref:"tags",staticClass:"multiselect__tags"},[t._t("selection",[n("div",{directives:[{name:"show",rawName:"v-show",value:t.visibleValues.length>0,expression:"visibleValues.length > 0"}],staticClass:"multiselect__tags-wrap"},[t._l(t.visibleValues,function(e,i){return[t._t("tag",[n("span",{key:i,staticClass:"multiselect__tag"},[n("span",{domProps:{textContent:t._s(t.getOptionLabel(e))}}),t._v(" "),n("i",{staticClass:"multiselect__tag-icon",attrs:{"aria-hidden":"true",tabindex:"1"},on:{keydown:function(n){if(!("button"in n)&&t._k(n.keyCode,"enter",13,n.key,"Enter"))return null;n.preventDefault(),t.removeElement(e)},mousedown:function(n){n.preventDefault(),t.removeElement(e)}}})])],{option:e,search:t.search,remove:t.removeElement})]})],2),t._v(" "),t.internalValue&&t.internalValue.length>t.limit?[t._t("limit",[n("strong",{staticClass:"multiselect__strong",domProps:{textContent:t._s(t.limitText(t.internalValue.length-t.limit))}})])]:t._e()],{search:t.search,remove:t.removeElement,values:t.visibleValues,isOpen:t.isOpen}),t._v(" "),n("transition",{attrs:{name:"multiselect__loading"}},[t._t("loading",[n("div",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}],staticClass:"multiselect__spinner"})])],2),t._v(" "),t.searchable?n("input",{ref:"search",staticClass:"multiselect__input",style:t.inputStyle,attrs:{name:t.name,id:t.id,type:"text",autocomplete:"off",placeholder:t.placeholder,disabled:t.disabled,tabindex:t.tabindex},domProps:{value:t.search},on:{input:function(e){t.updateSearch(e.target.value)},focus:function(e){e.preventDefault(),t.activate()},blur:function(e){e.preventDefault(),t.deactivate()},keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"esc",27,e.key,"Escape"))return null;t.deactivate()},keydown:[function(e){if(!("button"in e)&&t._k(e.keyCode,"down",40,e.key,["Down","ArrowDown"]))return null;e.preventDefault(),t.pointerForward()},function(e){if(!("button"in e)&&t._k(e.keyCode,"up",38,e.key,["Up","ArrowUp"]))return null;e.preventDefault(),t.pointerBackward()},function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?(e.preventDefault(),e.stopPropagation(),e.target!==e.currentTarget?null:void t.addPointerElement(e)):null},function(e){if(!("button"in e)&&t._k(e.keyCode,"delete",[8,46],e.key,["Backspace","Delete"]))return null;e.stopPropagation(),t.removeLastElement()}]}}):t._e(),t._v(" "),t.isSingleLabelVisible?n("span",{staticClass:"multiselect__single",on:{mousedown:function(e){return e.preventDefault(),t.toggle(e)}}},[t._t("singleLabel",[[t._v(t._s(t.currentOptionLabel))]],{option:t.singleValue})],2):t._e(),t._v(" "),t.isPlaceholderVisible?n("span",{staticClass:"multiselect__placeholder",on:{mousedown:function(e){return e.preventDefault(),t.toggle(e)}}},[t._t("placeholder",[t._v("\n            "+t._s(t.placeholder)+"\n        ")])],2):t._e()],2),t._v(" "),n("transition",{attrs:{name:"multiselect"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.isOpen,expression:"isOpen"}],ref:"list",staticClass:"multiselect__content-wrapper",style:{maxHeight:t.optimizedHeight+"px"},attrs:{tabindex:"-1"},on:{focus:t.activate,mousedown:function(t){t.preventDefault()}}},[n("ul",{staticClass:"multiselect__content",style:t.contentStyle},[t._t("beforeList"),t._v(" "),t.multiple&&t.max===t.internalValue.length?n("li",[n("span",{staticClass:"multiselect__option"},[t._t("maxElements",[t._v("Maximum of "+t._s(t.max)+" options selected. First remove a selected option to select another.")])],2)]):t._e(),t._v(" "),!t.max||t.internalValue.length<t.max?t._l(t.filteredOptions,function(e,i){return n("li",{key:i,staticClass:"multiselect__element"},[e&&(e.$isLabel||e.$isDisabled)?t._e():n("span",{staticClass:"multiselect__option",class:t.optionHighlight(i,e),attrs:{"data-select":e&&e.isTag?t.tagPlaceholder:t.selectLabelText,"data-selected":t.selectedLabelText,"data-deselect":t.deselectLabelText},on:{click:function(n){n.stopPropagation(),t.select(e)},mouseenter:function(e){if(e.target!==e.currentTarget)return null;t.pointerSet(i)}}},[t._t("option",[n("span",[t._v(t._s(t.getOptionLabel(e)))])],{option:e,search:t.search})],2),t._v(" "),e&&(e.$isLabel||e.$isDisabled)?n("span",{staticClass:"multiselect__option",class:t.groupHighlight(i,e),attrs:{"data-select":t.groupSelect&&t.selectGroupLabelText,"data-deselect":t.groupSelect&&t.deselectGroupLabelText},on:{mouseenter:function(e){if(e.target!==e.currentTarget)return null;t.groupSelect&&t.pointerSet(i)},mousedown:function(n){n.preventDefault(),t.selectGroup(e)}}},[t._t("option",[n("span",[t._v(t._s(t.getOptionLabel(e)))])],{option:e,search:t.search})],2):t._e()])}):t._e(),t._v(" "),n("li",{directives:[{name:"show",rawName:"v-show",value:t.showNoResults&&0===t.filteredOptions.length&&t.search&&!t.loading,expression:"showNoResults && (filteredOptions.length === 0 && search && !loading)"}]},[n("span",{staticClass:"multiselect__option"},[t._t("noResult",[t._v("No elements found. Consider changing the search query.")])],2)]),t._v(" "),n("li",{directives:[{name:"show",rawName:"v-show",value:t.showNoOptions&&0===t.options.length&&!t.search&&!t.loading,expression:"showNoOptions && (options.length === 0 && !search && !loading)"}]},[n("span",{staticClass:"multiselect__option"},[t._t("noOptions",[t._v("List is empty.")])],2)]),t._v(" "),t._t("afterList")],2)])])],2)},r=[],o={render:i,staticRenderFns:r};e.a=o}])});

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?sourceMap!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-312d3e3c\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/sass-loader/lib/loader.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/js/components/Roles.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js?sourceMap!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-312d3e3c\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/sass-loader/lib/loader.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/js/components/Roles.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("22effd6d", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-312d3e3c\",\"scoped\":true,\"hasInlineConfig\":true}!../../../node_modules/sass-loader/lib/loader.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Roles.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-312d3e3c\",\"scoped\":true,\"hasInlineConfig\":true}!../../../node_modules/sass-loader/lib/loader.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Roles.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?sourceMap!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3e013b2b\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/sass-loader/lib/loader.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/js/components/Assignments.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js?sourceMap!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3e013b2b\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/sass-loader/lib/loader.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/js/components/Assignments.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("f51a6f42", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3e013b2b\",\"scoped\":true,\"hasInlineConfig\":true}!../../../node_modules/sass-loader/lib/loader.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Assignments.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3e013b2b\",\"scoped\":true,\"hasInlineConfig\":true}!../../../node_modules/sass-loader/lib/loader.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Assignments.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?sourceMap!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-50d030bd\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/sass-loader/lib/loader.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/js/components/RoleCreate.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js?sourceMap!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-50d030bd\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/sass-loader/lib/loader.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/js/components/RoleCreate.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("eabc07e6", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-50d030bd\",\"scoped\":true,\"hasInlineConfig\":true}!../../../node_modules/sass-loader/lib/loader.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./RoleCreate.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-50d030bd\",\"scoped\":true,\"hasInlineConfig\":true}!../../../node_modules/sass-loader/lib/loader.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./RoleCreate.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?sourceMap!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-e9ffe52e\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/sass-loader/lib/loader.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/js/components/Permissions.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js?sourceMap!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-e9ffe52e\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/sass-loader/lib/loader.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/js/components/Permissions.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("5fa86fb6", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-e9ffe52e\",\"scoped\":true,\"hasInlineConfig\":true}!../../../node_modules/sass-loader/lib/loader.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Permissions.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-e9ffe52e\",\"scoped\":true,\"hasInlineConfig\":true}!../../../node_modules/sass-loader/lib/loader.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Permissions.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./node_modules/vue-style-loader/lib/addStylesClient.js":
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__("./node_modules/vue-style-loader/lib/listToStyles.js")

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ "./node_modules/vue-style-loader/lib/listToStyles.js":
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),

/***/ "./resources/js/components/Assignments.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?sourceMap!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3e013b2b\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/sass-loader/lib/loader.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/js/components/Assignments.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/js/components/Assignments.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-3e013b2b\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/js/components/Assignments.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-3e013b2b"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/Assignments.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3e013b2b", Component.options)
  } else {
    hotAPI.reload("data-v-3e013b2b", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/js/components/Permissions.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?sourceMap!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-e9ffe52e\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/sass-loader/lib/loader.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/js/components/Permissions.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/js/components/Permissions.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-e9ffe52e\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/js/components/Permissions.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-e9ffe52e"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/Permissions.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e9ffe52e", Component.options)
  } else {
    hotAPI.reload("data-v-e9ffe52e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/js/components/RoleCreate.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?sourceMap!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-50d030bd\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/sass-loader/lib/loader.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/js/components/RoleCreate.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/js/components/RoleCreate.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-50d030bd\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/js/components/RoleCreate.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-50d030bd"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/RoleCreate.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-50d030bd", Component.options)
  } else {
    hotAPI.reload("data-v-50d030bd", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/js/components/Roles.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?sourceMap!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-312d3e3c\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/sass-loader/lib/loader.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/js/components/Roles.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/js/components/Roles.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-312d3e3c\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/js/components/Roles.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-312d3e3c"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/Roles.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-312d3e3c", Component.options)
  } else {
    hotAPI.reload("data-v-312d3e3c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/js/tool.js":
/***/ (function(module, exports, __webpack_require__) {

Nova.booting(function (Vue, router) {
    Vue.component("multiselect", __webpack_require__("./node_modules/vue-multiselect/dist/vue-multiselect.min.js").default);
    router.addRoutes([{
        name: 'laravel-nova-governor-roles',
        path: '/laravel-nova-governor/roles',
        component: __webpack_require__("./resources/js/components/Roles.vue")
    }, {
        name: 'laravel-nova-governor-role-create',
        path: '/laravel-nova-governor/roles/create',
        component: __webpack_require__("./resources/js/components/RoleCreate.vue")
    }, {
        name: 'laravel-nova-governor-permissions',
        path: '/laravel-nova-governor/permissions/:role',
        component: __webpack_require__("./resources/js/components/Permissions.vue")
    }, {
        name: 'laravel-nova-governor-assignments',
        path: '/laravel-nova-governor/assignments',
        component: __webpack_require__("./resources/js/components/Assignments.vue")
    }]);
});

/***/ }),

/***/ "./resources/sass/tool.scss":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("./resources/js/tool.js");
module.exports = __webpack_require__("./resources/sass/tool.scss");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZWNjYTk2ZTAzZDFlODE4MjZjMjkiLCJ3ZWJwYWNrOi8vL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL0Fzc2lnbm1lbnRzLnZ1ZSIsIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvUGVybWlzc2lvbnMudnVlIiwid2VicGFjazovLy9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9Sb2xlQ3JlYXRlLnZ1ZSIsIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvUm9sZXMudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL1JvbGVzLnZ1ZT9kYmRjIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL0Fzc2lnbm1lbnRzLnZ1ZT8zNDU1Iiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL1JvbGVDcmVhdGUudnVlP2IyYmIiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvUGVybWlzc2lvbnMudnVlPzMyOWEiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplci5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9Sb2xlcy52dWU/NWFjMSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9Bc3NpZ25tZW50cy52dWU/NmZmNSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9Sb2xlQ3JlYXRlLnZ1ZT85MTMzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL1Blcm1pc3Npb25zLnZ1ZT82ODcwIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92dWUtbXVsdGlzZWxlY3QvZGlzdC92dWUtbXVsdGlzZWxlY3QubWluLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL1JvbGVzLnZ1ZT85YmRhIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL0Fzc2lnbm1lbnRzLnZ1ZT81MDUzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL1JvbGVDcmVhdGUudnVlPzVmMDIiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvUGVybWlzc2lvbnMudnVlP2I5OGYiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvbGlzdFRvU3R5bGVzLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL0Fzc2lnbm1lbnRzLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9QZXJtaXNzaW9ucy52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvUm9sZUNyZWF0ZS52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvUm9sZXMudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy90b29sLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9zYXNzL3Rvb2wuc2NzcyJdLCJuYW1lcyI6WyJOb3ZhIiwiYm9vdGluZyIsIlZ1ZSIsInJvdXRlciIsImNvbXBvbmVudCIsInJlcXVpcmUiLCJkZWZhdWx0IiwiYWRkUm91dGVzIiwibmFtZSIsInBhdGgiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtB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QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQiwrQkFBK0IsK0JBQStCO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0IsK0JBQStCLCtCQUErQjtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCLCtCQUErQiwrQkFBK0I7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQiwrQkFBK0IsK0JBQStCO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0IsK0JBQStCLCtCQUErQjtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QjtBQXNCSCxDQXhCRCxFOzs7Ozs7O0FDQUEseUMiLCJmaWxlIjoiL2pzL3Rvb2wuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBlY2NhOTZlMDNkMWU4MTgyNmMyOSIsIjxzY3JpcHQ+XG4gICAgbW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgICAgIGRhdGE6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaXNMb2FkaW5nOiB0cnVlLFxuICAgICAgICAgICAgICAgIHJvbGVzOiBbXSxcbiAgICAgICAgICAgICAgICB1c2VyczogW10sXG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuXG4gICAgICAgIGNyZWF0ZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMubG9hZFJvbGVzKCk7XG4gICAgICAgICAgICB0aGlzLmxvYWRVc2VycygpO1xuICAgICAgICB9LFxuXG4gICAgICAgIG1ldGhvZHM6IHtcbiAgICAgICAgICAgIGxvYWRSb2xlczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICAgICAgICAgIE5vdmEucmVxdWVzdCgpLmdldChcIi9nZW5lYWxhYnMvbGFyYXZlbC1nb3Zlcm5vci9ub3ZhL3JvbGVzXCIpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5yb2xlcyA9IE9iamVjdC5hc3NpZ24oe30sIHJlc3BvbnNlLmRhdGEpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi51c2Vycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBsb2FkVXNlcnM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgICAgICAgICBOb3ZhLnJlcXVlc3QoKS5nZXQoXCIvZ2VuZWFsYWJzL2xhcmF2ZWwtZ292ZXJub3Ivbm92YS91c2Vyc1wiKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYudXNlcnMgPSBPYmplY3QuYXNzaWduKFtdLCByZXNwb25zZS5kYXRhKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYucm9sZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgdXBkYXRlQXNzaWdubWVudDogXy5kZWJvdW5jZShmdW5jdGlvbiAoc2VsZWN0ZWRVc2Vycykge1xuICAgICAgICAgICAgICAgIHZhciByb2xlID0gc2VsZWN0ZWRVc2Vyc1swXS5waXZvdC5yb2xlX2tleTtcbiAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICAgICAgdmFyIHVzZXJJZHMgPSBfLm1hcChzZWxlY3RlZFVzZXJzLCBmdW5jdGlvbiAodXNlcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdXNlci5pZDtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIE5vdmEucmVxdWVzdCgpLnB1dChcIi9nZW5lYWxhYnMvbGFyYXZlbC1nb3Zlcm5vci9ub3ZhL2Fzc2lnbm1lbnRzL1wiICsgcm9sZSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcl9pZHM6IHVzZXJJZHMsXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kdG9hc3RlZC5zaG93KFwiUm9sZSAnXCIgKyByb2xlICsgXCInIHVzZXIgYXNzaWdubWVudHMgdXBkYXRlZCBzdWNjZXNzZnVsbHkuXCIsIHt0eXBlOiBcInN1Y2Nlc3NcIn0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIDEwMDApLFxuICAgICAgICB9LFxuICAgIH07XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICAgIDxkaXY+XG4gICAgICAgIDxoZWFkaW5nIGNsYXNzPVwibWItNlwiPkFzc2lnbm1lbnRzPC9oZWFkaW5nPlxuICAgICAgICA8bG9hZGluZy1jYXJkXG4gICAgICAgICAgICA6bG9hZGluZz1cImlzTG9hZGluZ1wiXG4gICAgICAgID5cbiAgICAgICAgICAgIDxmb3JtIGF1dG9jb21wbGV0ZT1cIm9mZlwiPlxuICAgICAgICAgICAgICAgIDxkaXYgdi1mb3I9XCJyb2xlIGluIHJvbGVzXCJcbiAgICAgICAgICAgICAgICAgICAgOmtleT1cInJvbGUubmFtZVwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmxleCBib3JkZXItYiBib3JkZXItNDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3LTEvNSBweS02IHB4LThcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJpbmxpbmUtYmxvY2sgdGV4dC04MCBwdC0yIGxlYWRpbmctdGlnaHRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgcm9sZS5uYW1lIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInB5LTYgcHgtOCB3LTQvNVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxtdWx0aXNlbGVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LW1vZGVsPVwicm9sZS51c2Vyc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpvcHRpb25zPVwidXNlcnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6YWxsb3ctZW1wdHk9XCJmYWxzZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYWNrLWJ5PVwibmFtZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPVwibmFtZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDptdWx0aXBsZT1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6aGlkZVNlbGVjdGVkPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpjbGVhck9uU2VsZWN0PVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBpbnB1dD1cInVwZGF0ZUFzc2lnbm1lbnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID48L211bHRpc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICA8L2xvYWRpbmctY2FyZD5cbiAgICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZSBzY29wZWQgbGFuZz1cInNjc3NcIj5cbiAgICAuY2FyZCB0YWJsZTpsYXN0LWNoaWxkIHtcbiAgICAgICAgdHI6bGFzdC1jaGlsZCB7XG4gICAgICAgICAgICB0ZDpmaXJzdC1jaGlsZCB7XG4gICAgICAgICAgICAgICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogLjVyZW07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRkOmxhc3QtY2hpbGQge1xuICAgICAgICAgICAgICAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAuNXJlbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbjwvc3R5bGU+XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvQXNzaWdubWVudHMudnVlIiwiPHNjcmlwdD5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICAgICAgZGF0YTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBiaW5hcnlTZWxlY3RPcHRpb25zOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiYW55XCIsXG4gICAgICAgICAgICAgICAgICAgIFwibm9cIixcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIGRlbGV0ZU1vZGFsT3BlbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxSb2xlTmFtZTogXCJcIixcbiAgICAgICAgICAgICAgICBwZXJtaXNzaW9uc0lzTG9hZGluZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBwZXJtaXNzaW9uczogW10sXG4gICAgICAgICAgICAgICAgcm9sZToge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHJvbGVJc0xvYWRpbmc6IHRydWUsXG4gICAgICAgICAgICAgICAgc2VsZWN0T3B0aW9uczogW1xuICAgICAgICAgICAgICAgICAgICBcIm93blwiLFxuICAgICAgICAgICAgICAgICAgICBcImFueVwiLFxuICAgICAgICAgICAgICAgICAgICBcIm5vXCIsXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG5cbiAgICAgICAgY3JlYXRlZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5vcmlnaW5hbFJvbGVOYW1lID0gdGhpcy4kcm91dGUucGFyYW1zLnJvbGU7XG4gICAgICAgICAgICB0aGlzLmxvYWRSb2xlKCk7XG4gICAgICAgICAgICB0aGlzLmxvYWRQZXJtaXNzaW9ucygpO1xuICAgICAgICB9LFxuXG4gICAgICAgIG1ldGhvZHM6IHtcbiAgICAgICAgICAgIGNsb3NlRGVsZXRlTW9kYWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGV0ZU1vZGFsT3BlbiA9IGZhbHNlO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgY29uZmlybURlbGV0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICAgICAgICAgIE5vdmEucmVxdWVzdCgpXG4gICAgICAgICAgICAgICAgICAgIC5kZWxldGUoXCIvZ2VuZWFsYWJzL2xhcmF2ZWwtZ292ZXJub3Ivbm92YS9yb2xlcy9cIiArIHRoaXMub3JpZ2luYWxSb2xlTmFtZSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiR0b2FzdGVkLnNob3coXCJSb2xlICdcIiArIHNlbGYub3JpZ2luYWxSb2xlTmFtZSArIFwiJyBkZWxldGVkIHN1Y2Nlc3NmdWxseS5cIiwge3R5cGU6IFwic3VjY2Vzc1wifSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRyb3V0ZXIucHVzaCgnL2xhcmF2ZWwtbm92YS1nb3Zlcm5vci9yb2xlcycpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiR0b2FzdGVkLnNob3coZXJyb3IucmVzcG9uc2UsIHt0eXBlOiBcImVycm9yXCJ9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBsb2FkUGVybWlzc2lvbnM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgICAgICAgICBheGlvcy5nZXQoXCIvZ2VuZWFsYWJzL2xhcmF2ZWwtZ292ZXJub3Ivbm92YS9wZXJtaXNzaW9ucz9maWx0ZXI9cm9sZV9rZXkmdmFsdWU9XCIgKyB0aGlzLm9yaWdpbmFsUm9sZU5hbWUpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5wZXJtaXNzaW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5wZXJtaXNzaW9uc0lzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGxvYWRSb2xlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgICAgICAgICAgYXhpb3MuZ2V0KFwiL2dlbmVhbGFicy9sYXJhdmVsLWdvdmVybm9yL25vdmEvcm9sZXMvXCIgKyB0aGlzLm9yaWdpbmFsUm9sZU5hbWUpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5yb2xlID0gT2JqZWN0LmFzc2lnbih7fSwgcmVzcG9uc2UuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnJvbGVJc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBvcGVuRGVsZXRlTW9kYWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGV0ZU1vZGFsT3BlbiA9IHRydWU7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB1cGRhdGVQZXJtaXNzaW9uczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICAgICAgICAgIE5vdmEucmVxdWVzdCgpXG4gICAgICAgICAgICAgICAgICAgIC5wdXQoXCIvZ2VuZWFsYWJzL2xhcmF2ZWwtZ292ZXJub3Ivbm92YS9yb2xlcy9cIiArIHRoaXMub3JpZ2luYWxSb2xlTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLnJvbGUubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogdGhpcy5yb2xlLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcm1pc3Npb25zOiB0aGlzLnBlcm1pc3Npb25zLFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kdG9hc3RlZC5zaG93KFwiUGVybWlzc2lvbnMgdXBkYXRlZCBzdWNjZXNzZnVsbHkuXCIsIHt0eXBlOiBcInN1Y2Nlc3NcIn0pO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiR0b2FzdGVkLnNob3coZXJyb3IucmVzcG9uc2UsIHt0eXBlOiBcImVycm9yXCJ9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB1cGRhdGVSb2xlOiBfLmRlYm91bmNlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgICAgICAgICBOb3ZhLnJlcXVlc3QoKVxuICAgICAgICAgICAgICAgICAgICAucHV0KFwiL2dlbmVhbGFicy9sYXJhdmVsLWdvdmVybm9yL25vdmEvcm9sZXMvXCIgKyB0aGlzLm9yaWdpbmFsUm9sZU5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdGhpcy5yb2xlLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHRoaXMucm9sZS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJHRvYXN0ZWQuc2hvdyhcIlJvbGUgdXBkYXRlZCBzdWNjZXNzZnVsbHkuXCIsIHt0eXBlOiBcInN1Y2Nlc3NcIn0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5vcmlnaW5hbFJvbGVOYW1lID0gc2VsZi5yb2xlLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRyb3V0ZXIucmVwbGFjZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogJy9sYXJhdmVsLW5vdmEtZ292ZXJub3IvcGVybWlzc2lvbnMvJyArIHNlbGYucm9sZS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJHRvYXN0ZWQuc2hvdyhlcnJvci5yZXNwb25zZS5kYXRhLCB7dHlwZTogXCJlcnJvclwifSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgMzUwKSxcbiAgICAgICAgfSxcbiAgICB9O1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgICA8ZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZmxleFwiIHN0eWxlPVwiXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmVsYXRpdmUgaC05IG1iLTYgZmxleC1uby1zaHJpbmtcIj5cbiAgICAgICAgICAgICAgICA8aGVhZGluZyBjbGFzcz1cIm1iLTZcIj5FZGl0IFJvbGU8L2hlYWRpbmc+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3LWZ1bGwgZmxleCBpdGVtcy1jZW50ZXIgbWItNlwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmbGV4IHctZnVsbCBqdXN0aWZ5LWVuZCBpdGVtcy1jZW50ZXIgbXgtM1wiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmbGV4LW5vLXNocmluayBtbC1hdXRvXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIEBjbGljaz1cIm9wZW5EZWxldGVNb2RhbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBidG4taWNvbiBidG4td2hpdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgOnRpdGxlPVwiX18oJ0RlbGV0ZScpXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGljb24gdHlwZT1cImRlbGV0ZVwiIGNsYXNzPVwidGV4dC04MFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8cG9ydGFsIHRvPVwibW9kYWxzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dHJhbnNpdGlvbiBuYW1lPVwiZmFkZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkZWxldGUtcmVzb3VyY2UtbW9kYWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1pZj1cImRlbGV0ZU1vZGFsT3BlblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBjb25maXJtPVwiY29uZmlybURlbGV0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBjbG9zZT1cImNsb3NlRGVsZXRlTW9kYWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlPVwiZGVsZXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLThcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoZWFkaW5nIDpsZXZlbD1cIjJcIiBjbGFzcz1cIm1iLTZcIj57eyBfXygnRGVsZXRlIFJvbGUnKSB9fTwvaGVhZGluZz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwidGV4dC04MCBsZWFkaW5nLW5vcm1hbFwiPnt7X18oXCJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoZSB0aGUgJ1wiICsgcm9sZS5uYW1lICsgXCInIHJvbGU/XCIpfX08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGVsZXRlLXJlc291cmNlLW1vZGFsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cmFuc2l0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8L3BvcnRhbD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGxvYWRpbmctY2FyZFxuICAgICAgICAgICAgOmxvYWRpbmc9XCJyb2xlSXNMb2FkaW5nXCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPGZvcm0gYXV0b2NvbXBsZXRlPVwib2ZmXCI+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZsZXggYm9yZGVyLWIgYm9yZGVyLTQwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidy0xLzUgcHktNiBweC04XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiaW5saW5lLWJsb2NrIHRleHQtODAgcHQtMiBsZWFkaW5nLXRpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHktNiBweC04IHctMS8yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJOYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJ3LWZ1bGwgZm9ybS1jb250cm9sIGZvcm0taW5wdXQgZm9ybS1pbnB1dC1ib3JkZXJlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJyb2xlLm5hbWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAaW5wdXQ9XCJ1cGRhdGVSb2xlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZsZXggYm9yZGVyLWIgYm9yZGVyLTQwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidy0xLzUgcHktNiBweC04XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiaW5saW5lLWJsb2NrIHRleHQtODAgcHQtMiBsZWFkaW5nLXRpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERlc2NyaXB0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInB5LTYgcHgtOCB3LTQvNVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSByb3dzPVwiNVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRGVzY3JpcHRpb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInctZnVsbCBmb3JtLWNvbnRyb2wgZm9ybS1pbnB1dCBmb3JtLWlucHV0LWJvcmRlcmVkIHB5LTMgaC1hdXRvXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1tb2RlbD1cInJvbGUuZGVzY3JpcHRpb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAaW5wdXQ9XCJ1cGRhdGVSb2xlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgPC9sb2FkaW5nLWNhcmQ+XG4gICAgICAgIDxoZWFkaW5nIGNsYXNzPVwibXQtOCBtYi02XCI+UGVybWlzc2lvbnM8L2hlYWRpbmc+XG4gICAgICAgIDxsb2FkaW5nLWNhcmRcbiAgICAgICAgICAgIDpsb2FkaW5nPVwicGVybWlzc2lvbnNJc0xvYWRpbmdcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmVsYXRpdmVcIj5cbiAgICAgICAgICAgICAgICA8dGFibGUgY2VsbHBhZGRpbmc9XCIwXCJcbiAgICAgICAgICAgICAgICAgICAgY2VsbHNwYWNpbmc9XCIwXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJ0YWJsZSB3LWZ1bGxcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyIGNsYXNzPVwiYmctbm9uZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzcz1cInJvdW5kZWQtdGxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRW50aXR5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENyZWF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBWaWV3QW55XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFZpZXdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVXBkYXRlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERlbGV0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZXN0b3JlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3M9XCJyb3VuZGVkLXRyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZvcmNlIERlbGV0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LWZvcj1cIihwZXJtaXNzaW9uLCBuYW1lKSBpbiBwZXJtaXNzaW9uc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOmtleT1cIm5hbWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiaG92ZXI6Ymctbm9uZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwid2hpdGVzcGFjZS1uby13cmFwIHRleHQtbGVmdCBjYXBpdGFsaXplXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IG5hbWUgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG11bHRpc2VsZWN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LW1vZGVsPVwicGVybWlzc2lvbnNbbmFtZV1bJ2NyZWF0ZSddXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpvcHRpb25zPVwiYmluYXJ5U2VsZWN0T3B0aW9uc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3QtbGFiZWw9XCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzZWxlY3QtbGFiZWw9XCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQtbGFiZWw9XCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOnNlYXJjaGFibGU9XCJmYWxzZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6Y2xvc2Utb24tc2VsZWN0PVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6YWxsb3ctZW1wdHk9XCJmYWxzZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAaW5wdXQ9XCJ1cGRhdGVQZXJtaXNzaW9uc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID48L211bHRpc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bXVsdGlzZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJwZXJtaXNzaW9uc1tuYW1lXVsndmlld0FueSddXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpvcHRpb25zPVwiYmluYXJ5U2VsZWN0T3B0aW9uc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3QtbGFiZWw9XCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzZWxlY3QtbGFiZWw9XCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQtbGFiZWw9XCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOnNlYXJjaGFibGU9XCJmYWxzZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6Y2xvc2Utb24tc2VsZWN0PVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6YWxsb3ctZW1wdHk9XCJmYWxzZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAaW5wdXQ9XCJ1cGRhdGVQZXJtaXNzaW9uc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID48L211bHRpc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bXVsdGlzZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJwZXJtaXNzaW9uc1tuYW1lXVsndmlldyddXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpvcHRpb25zPVwic2VsZWN0T3B0aW9uc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3QtbGFiZWw9XCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzZWxlY3QtbGFiZWw9XCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQtbGFiZWw9XCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOnNlYXJjaGFibGU9XCJmYWxzZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6Y2xvc2Utb24tc2VsZWN0PVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6YWxsb3ctZW1wdHk9XCJmYWxzZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAaW5wdXQ9XCJ1cGRhdGVQZXJtaXNzaW9uc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID48L211bHRpc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bXVsdGlzZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJwZXJtaXNzaW9uc1tuYW1lXVsndXBkYXRlJ11cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOm9wdGlvbnM9XCJzZWxlY3RPcHRpb25zXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdC1sYWJlbD1cIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNlbGVjdC1sYWJlbD1cIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZC1sYWJlbD1cIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6c2VhcmNoYWJsZT1cImZhbHNlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpjbG9zZS1vbi1zZWxlY3Q9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDphbGxvdy1lbXB0eT1cImZhbHNlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBpbnB1dD1cInVwZGF0ZVBlcm1pc3Npb25zXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPjwvbXVsdGlzZWxlY3Q+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxtdWx0aXNlbGVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1tb2RlbD1cInBlcm1pc3Npb25zW25hbWVdWydkZWxldGUnXVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6b3B0aW9ucz1cInNlbGVjdE9wdGlvbnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0LWxhYmVsPVwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2VsZWN0LWxhYmVsPVwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkLWxhYmVsPVwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpzZWFyY2hhYmxlPVwiZmFsc2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmNsb3NlLW9uLXNlbGVjdD1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmFsbG93LWVtcHR5PVwiZmFsc2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQGlucHV0PVwidXBkYXRlUGVybWlzc2lvbnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+PC9tdWx0aXNlbGVjdD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG11bHRpc2VsZWN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LW1vZGVsPVwicGVybWlzc2lvbnNbbmFtZV1bJ3Jlc3RvcmUnXVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6b3B0aW9ucz1cInNlbGVjdE9wdGlvbnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0LWxhYmVsPVwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2VsZWN0LWxhYmVsPVwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkLWxhYmVsPVwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpzZWFyY2hhYmxlPVwiZmFsc2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmNsb3NlLW9uLXNlbGVjdD1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmFsbG93LWVtcHR5PVwiZmFsc2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQGlucHV0PVwidXBkYXRlUGVybWlzc2lvbnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+PC9tdWx0aXNlbGVjdD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG11bHRpc2VsZWN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LW1vZGVsPVwicGVybWlzc2lvbnNbbmFtZV1bJ2ZvcmNlRGVsZXRlJ11cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOm9wdGlvbnM9XCJzZWxlY3RPcHRpb25zXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdC1sYWJlbD1cIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNlbGVjdC1sYWJlbD1cIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZC1sYWJlbD1cIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6c2VhcmNoYWJsZT1cImZhbHNlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpjbG9zZS1vbi1zZWxlY3Q9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDphbGxvdy1lbXB0eT1cImZhbHNlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBpbnB1dD1cInVwZGF0ZVBlcm1pc3Npb25zXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPjwvbXVsdGlzZWxlY3Q+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2xvYWRpbmctY2FyZD5cbiAgICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZSBzY29wZWQgbGFuZz1cInNjc3NcIj5cbiAgICAuY2FyZCB0YWJsZTpsYXN0LWNoaWxkIHtcbiAgICAgICAgdHI6bGFzdC1jaGlsZCB7XG4gICAgICAgICAgICB0ZDpmaXJzdC1jaGlsZCB7XG4gICAgICAgICAgICAgICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogLjVyZW07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRkOmxhc3QtY2hpbGQge1xuICAgICAgICAgICAgICAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAuNXJlbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbjwvc3R5bGU+XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvUGVybWlzc2lvbnMudnVlIiwiPHNjcmlwdD5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICAgICAgZGF0YTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByb2xlOiB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuXG4gICAgICAgIG1ldGhvZHM6IHtcbiAgICAgICAgICAgIHVwZGF0ZVJvbGU6IF8uZGVib3VuY2UoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICAgICAgICAgIE5vdmEucmVxdWVzdCgpXG4gICAgICAgICAgICAgICAgICAgIC5wb3N0KFwiL2dlbmVhbGFicy9sYXJhdmVsLWdvdmVybm9yL25vdmEvcm9sZXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLnJvbGUubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogdGhpcy5yb2xlLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kdG9hc3RlZC5zaG93KFwiUm9sZSAnXCIgKyBzZWxmLnJvbGUubmFtZSArIFwiJyBjcmVhdGVkIHN1Y2Nlc3NmdWxseS5cIiwge3R5cGU6IFwic3VjY2Vzc1wifSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRyb3V0ZXIucHVzaCgnL2xhcmF2ZWwtbm92YS1nb3Zlcm5vci9wZXJtaXNzaW9ucy8nICsgc2VsZi5yb2xlLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiR0b2FzdGVkLnNob3coZXJyb3IucmVzcG9uc2UuZGF0YSwge3R5cGU6IFwiZXJyb3JcIn0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIDM1MCksXG4gICAgICAgIH0sXG4gICAgfTtcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gICAgPGRpdj5cbiAgICAgICAgPGhlYWRpbmcgY2xhc3M9XCJtYi02XCI+Q3JlYXRlIFJvbGU8L2hlYWRpbmc+XG4gICAgICAgIDxsb2FkaW5nLWNhcmRcbiAgICAgICAgICAgIDpsb2FkaW5nPVwiZmFsc2VcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8Zm9ybSBhdXRvY29tcGxldGU9XCJvZmZcIj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmxleCBib3JkZXItYiBib3JkZXItNDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3LTEvNSBweS02IHB4LThcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJpbmxpbmUtYmxvY2sgdGV4dC04MCBwdC0yIGxlYWRpbmctdGlnaHRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJweS02IHB4LTggdy0xLzJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIk5hbWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInctZnVsbCBmb3JtLWNvbnRyb2wgZm9ybS1pbnB1dCBmb3JtLWlucHV0LWJvcmRlcmVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1tb2RlbD1cInJvbGUubmFtZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBpbnB1dD1cInVwZGF0ZVJvbGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmxleCBib3JkZXItYiBib3JkZXItNDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3LTEvNSBweS02IHB4LThcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJpbmxpbmUtYmxvY2sgdGV4dC04MCBwdC0yIGxlYWRpbmctdGlnaHRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRGVzY3JpcHRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHktNiBweC04IHctNC81XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIHJvd3M9XCI1XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJEZXNjcmlwdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwidy1mdWxsIGZvcm0tY29udHJvbCBmb3JtLWlucHV0IGZvcm0taW5wdXQtYm9yZGVyZWQgcHktMyBoLWF1dG9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LW1vZGVsPVwicm9sZS5kZXNjcmlwdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBpbnB1dD1cInVwZGF0ZVJvbGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID48L3RleHRhcmVhPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICA8L2xvYWRpbmctY2FyZD5cbiAgICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZSBzY29wZWQgbGFuZz1cInNjc3NcIj5cbiAgICAuY2FyZCB0YWJsZTpsYXN0LWNoaWxkIHtcbiAgICAgICAgdHI6bGFzdC1jaGlsZCB7XG4gICAgICAgICAgICB0ZDpmaXJzdC1jaGlsZCB7XG4gICAgICAgICAgICAgICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogLjVyZW07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRkOmxhc3QtY2hpbGQge1xuICAgICAgICAgICAgICAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAuNXJlbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbjwvc3R5bGU+XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvUm9sZUNyZWF0ZS52dWUiLCI8c2NyaXB0PlxuICAgIG1vZHVsZS5leHBvcnRzID0ge1xuICAgICAgICBkYXRhOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGlzTG9hZGluZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICByb2xlczogW10sXG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuXG4gICAgICAgIGNyZWF0ZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMubG9hZFJvbGVzKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgbWV0aG9kczoge1xuICAgICAgICAgICAgbG9hZFJvbGVzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgICAgICAgICAgYXhpb3MuZ2V0KFwiL2dlbmVhbGFicy9sYXJhdmVsLWdvdmVybm9yL25vdmEvcm9sZXNcIilcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnJvbGVzID0gT2JqZWN0LmFzc2lnbih7fSwgcmVzcG9uc2UuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgfTtcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gICAgPGRpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZsZXhcIiBzdHlsZT1cIlwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJlbGF0aXZlIGgtOSBtYi02IGZsZXgtbm8tc2hyaW5rXCI+XG4gICAgICAgICAgICAgICAgPGhlYWRpbmcgY2xhc3M9XCJtYi02XCI+Um9sZXM8L2hlYWRpbmc+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3LWZ1bGwgZmxleCBpdGVtcy1jZW50ZXIgbWItNlwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmbGV4IHctZnVsbCBqdXN0aWZ5LWVuZCBpdGVtcy1jZW50ZXIgbXgtM1wiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmbGV4LW5vLXNocmluayBtbC1hdXRvXCI+XG4gICAgICAgICAgICAgICAgICAgIDxyb3V0ZXItbGlua1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFnPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIDp0bz1cIntuYW1lOiAnbGFyYXZlbC1ub3ZhLWdvdmVybm9yLXJvbGUtY3JlYXRlJ31cIlxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYnRuLXByaW1hcnlcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICBDcmVhdGUgUm9sZVxuICAgICAgICAgICAgICAgICAgICA8L3JvdXRlci1saW5rPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxsb2FkaW5nLWNhcmRcbiAgICAgICAgICAgIDpsb2FkaW5nPVwiaXNMb2FkaW5nXCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm92ZXJmbG93LWhpZGRlbiBvdmVyZmxvdy14LWF1dG8gcmVsYXRpdmVcIj5cbiAgICAgICAgICAgICAgICA8dGFibGUgY2VsbHBhZGRpbmc9XCIwXCIgY2VsbHNwYWNpbmc9XCIwXCIgZGF0YS10ZXN0aWQ9XCJyZXNvdXJjZS10YWJsZVwiIGNsYXNzPVwidGFibGUgdy1mdWxsXCI+XG4gICAgICAgICAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3M9XCJ0ZXh0LWxlZnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gZHVzaz1cInNvcnQtbmFtZVwiIGNsYXNzPVwiY3Vyc29yLXBvaW50ZXIgaW5saW5lLWZsZXggaXRlbXMtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzcz1cInRleHQtbGVmdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEZXNjcmlwdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cm91dGVyLWxpbmtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LWZvcj1cInJvbGUgaW4gcm9sZXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDprZXk9XCJyb2xlLm5hbWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZz1cInRyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6dG89XCJ7bmFtZTogJ2xhcmF2ZWwtbm92YS1nb3Zlcm5vci1wZXJtaXNzaW9ucycsIHBhcmFtczoge3JvbGU6IHJvbGUubmFtZX0gfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOmNsYXNzPVwieydkaXNhYmxlZCc6IHJvbGUubmFtZSA9PSAnU3VwZXJBZG1pbid9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImN1cnNvci1wb2ludGVyIGZvbnQtbm9ybWFsIGRpbSB0ZXh0LXdoaXRlIG1iLTYgdGV4dC1iYXNlIG5vLXVuZGVybGluZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIndoaXRlc3BhY2Utbm8td3JhcCB0ZXh0LWxlZnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IHJvbGUubmFtZSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1sZWZ0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyByb2xlLmRlc2NyaXB0aW9uIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9yb3V0ZXItbGluaz5cbiAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvbG9hZGluZy1jYXJkPlxuICAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlIHNjb3BlZCBsYW5nPVwic2Nzc1wiPlxuICAgIHRyLmRpc2FibGVkIHtcbiAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgfVxuPC9zdHlsZT5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyByZXNvdXJjZXMvanMvY29tcG9uZW50cy9Sb2xlcy52dWUiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxudHIuZGlzYWJsZWRbZGF0YS12LTMxMmQzZTNjXSB7XFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG59XFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIi9Vc2Vycy9taWtlL0RldmVsb3Blci9TaXRlcy9sYXJhdmVsLWdvdmVybm9yL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL1JvbGVzLnZ1ZVwiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiO0FBQUE7RUFDRSxxQkFBcUI7Q0FBRVwiLFwiZmlsZVwiOlwiUm9sZXMudnVlXCIsXCJzb3VyY2VzQ29udGVudFwiOltcInRyLmRpc2FibGVkIHtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lOyB9XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTMxMmQzZTNjXCIsXCJzY29wZWRcIjp0cnVlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvUm9sZXMudnVlXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi0zMTJkM2UzY1wiLFwic2NvcGVkXCI6dHJ1ZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL1JvbGVzLnZ1ZVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxuLmNhcmQgdGFibGU6bGFzdC1jaGlsZCB0cjpsYXN0LWNoaWxkIHRkW2RhdGEtdi0zZTAxM2IyYl06Zmlyc3QtY2hpbGQge1xcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogLjVyZW07XFxufVxcbi5jYXJkIHRhYmxlOmxhc3QtY2hpbGQgdHI6bGFzdC1jaGlsZCB0ZFtkYXRhLXYtM2UwMTNiMmJdOmxhc3QtY2hpbGQge1xcbiAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IC41cmVtO1xcbn1cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiL1VzZXJzL21pa2UvRGV2ZWxvcGVyL1NpdGVzL2xhcmF2ZWwtZ292ZXJub3IvcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvQXNzaWdubWVudHMudnVlXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCI7QUFBQTtFQUNFLGlDQUFpQztDQUFFO0FBRXJDO0VBQ0Usa0NBQWtDO0NBQUVcIixcImZpbGVcIjpcIkFzc2lnbm1lbnRzLnZ1ZVwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIuY2FyZCB0YWJsZTpsYXN0LWNoaWxkIHRyOmxhc3QtY2hpbGQgdGQ6Zmlyc3QtY2hpbGQge1xcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogLjVyZW07IH1cXG5cXG4uY2FyZCB0YWJsZTpsYXN0LWNoaWxkIHRyOmxhc3QtY2hpbGQgdGQ6bGFzdC1jaGlsZCB7XFxuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogLjVyZW07IH1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtM2UwMTNiMmJcIixcInNjb3BlZFwiOnRydWUsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9Bc3NpZ25tZW50cy52dWVcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTNlMDEzYjJiXCIsXCJzY29wZWRcIjp0cnVlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvQXNzaWdubWVudHMudnVlXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG4uY2FyZCB0YWJsZTpsYXN0LWNoaWxkIHRyOmxhc3QtY2hpbGQgdGRbZGF0YS12LTUwZDAzMGJkXTpmaXJzdC1jaGlsZCB7XFxuICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAuNXJlbTtcXG59XFxuLmNhcmQgdGFibGU6bGFzdC1jaGlsZCB0cjpsYXN0LWNoaWxkIHRkW2RhdGEtdi01MGQwMzBiZF06bGFzdC1jaGlsZCB7XFxuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogLjVyZW07XFxufVxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCIvVXNlcnMvbWlrZS9EZXZlbG9wZXIvU2l0ZXMvbGFyYXZlbC1nb3Zlcm5vci9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9Sb2xlQ3JlYXRlLnZ1ZVwiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiO0FBQUE7RUFDRSxpQ0FBaUM7Q0FBRTtBQUVyQztFQUNFLGtDQUFrQztDQUFFXCIsXCJmaWxlXCI6XCJSb2xlQ3JlYXRlLnZ1ZVwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIuY2FyZCB0YWJsZTpsYXN0LWNoaWxkIHRyOmxhc3QtY2hpbGQgdGQ6Zmlyc3QtY2hpbGQge1xcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogLjVyZW07IH1cXG5cXG4uY2FyZCB0YWJsZTpsYXN0LWNoaWxkIHRyOmxhc3QtY2hpbGQgdGQ6bGFzdC1jaGlsZCB7XFxuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogLjVyZW07IH1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtNTBkMDMwYmRcIixcInNjb3BlZFwiOnRydWUsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9Sb2xlQ3JlYXRlLnZ1ZVxuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtNTBkMDMwYmRcIixcInNjb3BlZFwiOnRydWUsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9Sb2xlQ3JlYXRlLnZ1ZVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxuLmNhcmQgdGFibGU6bGFzdC1jaGlsZCB0cjpsYXN0LWNoaWxkIHRkW2RhdGEtdi1lOWZmZTUyZV06Zmlyc3QtY2hpbGQge1xcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogLjVyZW07XFxufVxcbi5jYXJkIHRhYmxlOmxhc3QtY2hpbGQgdHI6bGFzdC1jaGlsZCB0ZFtkYXRhLXYtZTlmZmU1MmVdOmxhc3QtY2hpbGQge1xcbiAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IC41cmVtO1xcbn1cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiL1VzZXJzL21pa2UvRGV2ZWxvcGVyL1NpdGVzL2xhcmF2ZWwtZ292ZXJub3IvcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvUGVybWlzc2lvbnMudnVlXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCI7QUFBQTtFQUNFLGlDQUFpQztDQUFFO0FBRXJDO0VBQ0Usa0NBQWtDO0NBQUVcIixcImZpbGVcIjpcIlBlcm1pc3Npb25zLnZ1ZVwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIuY2FyZCB0YWJsZTpsYXN0LWNoaWxkIHRyOmxhc3QtY2hpbGQgdGQ6Zmlyc3QtY2hpbGQge1xcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogLjVyZW07IH1cXG5cXG4uY2FyZCB0YWJsZTpsYXN0LWNoaWxkIHRyOmxhc3QtY2hpbGQgdGQ6bGFzdC1jaGlsZCB7XFxuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogLjVyZW07IH1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtZTlmZmU1MmVcIixcInNjb3BlZFwiOnRydWUsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9QZXJtaXNzaW9ucy52dWVcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LWU5ZmZlNTJlXCIsXCJzY29wZWRcIjp0cnVlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvUGVybWlzc2lvbnMudnVlXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih1c2VTb3VyY2VNYXApIHtcblx0dmFyIGxpc3QgPSBbXTtcblxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcblx0XHRyZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcblx0XHRcdHZhciBjb250ZW50ID0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApO1xuXHRcdFx0aWYoaXRlbVsyXSkge1xuXHRcdFx0XHRyZXR1cm4gXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBjb250ZW50ICsgXCJ9XCI7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gY29udGVudDtcblx0XHRcdH1cblx0XHR9KS5qb2luKFwiXCIpO1xuXHR9O1xuXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cdGxpc3QuaSA9IGZ1bmN0aW9uKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcblx0XHR2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXHRcdFx0aWYodHlwZW9mIGlkID09PSBcIm51bWJlclwiKVxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG5cdFx0fVxuXHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcblx0XHRcdC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcblx0XHRcdGlmKHR5cGVvZiBpdGVtWzBdICE9PSBcIm51bWJlclwiIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcblx0XHRcdFx0fSBlbHNlIGlmKG1lZGlhUXVlcnkpIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGlzdC5wdXNoKGl0ZW0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblx0cmV0dXJuIGxpc3Q7XG59O1xuXG5mdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgY29udGVudCA9IGl0ZW1bMV0gfHwgJyc7XG5cdHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblx0aWYgKCFjc3NNYXBwaW5nKSB7XG5cdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdH1cblxuXHRpZiAodXNlU291cmNlTWFwICYmIHR5cGVvZiBidG9hID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0dmFyIHNvdXJjZU1hcHBpbmcgPSB0b0NvbW1lbnQoY3NzTWFwcGluZyk7XG5cdFx0dmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcblx0XHRcdHJldHVybiAnLyojIHNvdXJjZVVSTD0nICsgY3NzTWFwcGluZy5zb3VyY2VSb290ICsgc291cmNlICsgJyAqLydcblx0XHR9KTtcblxuXHRcdHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oJ1xcbicpO1xuXHR9XG5cblx0cmV0dXJuIFtjb250ZW50XS5qb2luKCdcXG4nKTtcbn1cblxuLy8gQWRhcHRlZCBmcm9tIGNvbnZlcnQtc291cmNlLW1hcCAoTUlUKVxuZnVuY3Rpb24gdG9Db21tZW50KHNvdXJjZU1hcCkge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcblx0dmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSk7XG5cdHZhciBkYXRhID0gJ3NvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LCcgKyBiYXNlNjQ7XG5cblx0cmV0dXJuICcvKiMgJyArIGRhdGEgKyAnICovJztcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiBnbG9iYWxzIF9fVlVFX1NTUl9DT05URVhUX18gKi9cblxuLy8gSU1QT1JUQU5UOiBEbyBOT1QgdXNlIEVTMjAxNSBmZWF0dXJlcyBpbiB0aGlzIGZpbGUuXG4vLyBUaGlzIG1vZHVsZSBpcyBhIHJ1bnRpbWUgdXRpbGl0eSBmb3IgY2xlYW5lciBjb21wb25lbnQgbW9kdWxlIG91dHB1dCBhbmQgd2lsbFxuLy8gYmUgaW5jbHVkZWQgaW4gdGhlIGZpbmFsIHdlYnBhY2sgdXNlciBidW5kbGUuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbm9ybWFsaXplQ29tcG9uZW50IChcbiAgcmF3U2NyaXB0RXhwb3J0cyxcbiAgY29tcGlsZWRUZW1wbGF0ZSxcbiAgZnVuY3Rpb25hbFRlbXBsYXRlLFxuICBpbmplY3RTdHlsZXMsXG4gIHNjb3BlSWQsXG4gIG1vZHVsZUlkZW50aWZpZXIgLyogc2VydmVyIG9ubHkgKi9cbikge1xuICB2YXIgZXNNb2R1bGVcbiAgdmFyIHNjcmlwdEV4cG9ydHMgPSByYXdTY3JpcHRFeHBvcnRzID0gcmF3U2NyaXB0RXhwb3J0cyB8fCB7fVxuXG4gIC8vIEVTNiBtb2R1bGVzIGludGVyb3BcbiAgdmFyIHR5cGUgPSB0eXBlb2YgcmF3U2NyaXB0RXhwb3J0cy5kZWZhdWx0XG4gIGlmICh0eXBlID09PSAnb2JqZWN0JyB8fCB0eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZXNNb2R1bGUgPSByYXdTY3JpcHRFeHBvcnRzXG4gICAgc2NyaXB0RXhwb3J0cyA9IHJhd1NjcmlwdEV4cG9ydHMuZGVmYXVsdFxuICB9XG5cbiAgLy8gVnVlLmV4dGVuZCBjb25zdHJ1Y3RvciBleHBvcnQgaW50ZXJvcFxuICB2YXIgb3B0aW9ucyA9IHR5cGVvZiBzY3JpcHRFeHBvcnRzID09PSAnZnVuY3Rpb24nXG4gICAgPyBzY3JpcHRFeHBvcnRzLm9wdGlvbnNcbiAgICA6IHNjcmlwdEV4cG9ydHNcblxuICAvLyByZW5kZXIgZnVuY3Rpb25zXG4gIGlmIChjb21waWxlZFRlbXBsYXRlKSB7XG4gICAgb3B0aW9ucy5yZW5kZXIgPSBjb21waWxlZFRlbXBsYXRlLnJlbmRlclxuICAgIG9wdGlvbnMuc3RhdGljUmVuZGVyRm5zID0gY29tcGlsZWRUZW1wbGF0ZS5zdGF0aWNSZW5kZXJGbnNcbiAgICBvcHRpb25zLl9jb21waWxlZCA9IHRydWVcbiAgfVxuXG4gIC8vIGZ1bmN0aW9uYWwgdGVtcGxhdGVcbiAgaWYgKGZ1bmN0aW9uYWxUZW1wbGF0ZSkge1xuICAgIG9wdGlvbnMuZnVuY3Rpb25hbCA9IHRydWVcbiAgfVxuXG4gIC8vIHNjb3BlZElkXG4gIGlmIChzY29wZUlkKSB7XG4gICAgb3B0aW9ucy5fc2NvcGVJZCA9IHNjb3BlSWRcbiAgfVxuXG4gIHZhciBob29rXG4gIGlmIChtb2R1bGVJZGVudGlmaWVyKSB7IC8vIHNlcnZlciBidWlsZFxuICAgIGhvb2sgPSBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgICAgLy8gMi4zIGluamVjdGlvblxuICAgICAgY29udGV4dCA9XG4gICAgICAgIGNvbnRleHQgfHwgLy8gY2FjaGVkIGNhbGxcbiAgICAgICAgKHRoaXMuJHZub2RlICYmIHRoaXMuJHZub2RlLnNzckNvbnRleHQpIHx8IC8vIHN0YXRlZnVsXG4gICAgICAgICh0aGlzLnBhcmVudCAmJiB0aGlzLnBhcmVudC4kdm5vZGUgJiYgdGhpcy5wYXJlbnQuJHZub2RlLnNzckNvbnRleHQpIC8vIGZ1bmN0aW9uYWxcbiAgICAgIC8vIDIuMiB3aXRoIHJ1bkluTmV3Q29udGV4dDogdHJ1ZVxuICAgICAgaWYgKCFjb250ZXh0ICYmIHR5cGVvZiBfX1ZVRV9TU1JfQ09OVEVYVF9fICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb250ZXh0ID0gX19WVUVfU1NSX0NPTlRFWFRfX1xuICAgICAgfVxuICAgICAgLy8gaW5qZWN0IGNvbXBvbmVudCBzdHlsZXNcbiAgICAgIGlmIChpbmplY3RTdHlsZXMpIHtcbiAgICAgICAgaW5qZWN0U3R5bGVzLmNhbGwodGhpcywgY29udGV4dClcbiAgICAgIH1cbiAgICAgIC8vIHJlZ2lzdGVyIGNvbXBvbmVudCBtb2R1bGUgaWRlbnRpZmllciBmb3IgYXN5bmMgY2h1bmsgaW5mZXJyZW5jZVxuICAgICAgaWYgKGNvbnRleHQgJiYgY29udGV4dC5fcmVnaXN0ZXJlZENvbXBvbmVudHMpIHtcbiAgICAgICAgY29udGV4dC5fcmVnaXN0ZXJlZENvbXBvbmVudHMuYWRkKG1vZHVsZUlkZW50aWZpZXIpXG4gICAgICB9XG4gICAgfVxuICAgIC8vIHVzZWQgYnkgc3NyIGluIGNhc2UgY29tcG9uZW50IGlzIGNhY2hlZCBhbmQgYmVmb3JlQ3JlYXRlXG4gICAgLy8gbmV2ZXIgZ2V0cyBjYWxsZWRcbiAgICBvcHRpb25zLl9zc3JSZWdpc3RlciA9IGhvb2tcbiAgfSBlbHNlIGlmIChpbmplY3RTdHlsZXMpIHtcbiAgICBob29rID0gaW5qZWN0U3R5bGVzXG4gIH1cblxuICBpZiAoaG9vaykge1xuICAgIHZhciBmdW5jdGlvbmFsID0gb3B0aW9ucy5mdW5jdGlvbmFsXG4gICAgdmFyIGV4aXN0aW5nID0gZnVuY3Rpb25hbFxuICAgICAgPyBvcHRpb25zLnJlbmRlclxuICAgICAgOiBvcHRpb25zLmJlZm9yZUNyZWF0ZVxuXG4gICAgaWYgKCFmdW5jdGlvbmFsKSB7XG4gICAgICAvLyBpbmplY3QgY29tcG9uZW50IHJlZ2lzdHJhdGlvbiBhcyBiZWZvcmVDcmVhdGUgaG9va1xuICAgICAgb3B0aW9ucy5iZWZvcmVDcmVhdGUgPSBleGlzdGluZ1xuICAgICAgICA/IFtdLmNvbmNhdChleGlzdGluZywgaG9vaylcbiAgICAgICAgOiBbaG9va11cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZm9yIHRlbXBsYXRlLW9ubHkgaG90LXJlbG9hZCBiZWNhdXNlIGluIHRoYXQgY2FzZSB0aGUgcmVuZGVyIGZuIGRvZXNuJ3RcbiAgICAgIC8vIGdvIHRocm91Z2ggdGhlIG5vcm1hbGl6ZXJcbiAgICAgIG9wdGlvbnMuX2luamVjdFN0eWxlcyA9IGhvb2tcbiAgICAgIC8vIHJlZ2lzdGVyIGZvciBmdW5jdGlvYWwgY29tcG9uZW50IGluIHZ1ZSBmaWxlXG4gICAgICBvcHRpb25zLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcldpdGhTdHlsZUluamVjdGlvbiAoaCwgY29udGV4dCkge1xuICAgICAgICBob29rLmNhbGwoY29udGV4dClcbiAgICAgICAgcmV0dXJuIGV4aXN0aW5nKGgsIGNvbnRleHQpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBlc01vZHVsZTogZXNNb2R1bGUsXG4gICAgZXhwb3J0czogc2NyaXB0RXhwb3J0cyxcbiAgICBvcHRpb25zOiBvcHRpb25zXG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplci5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwiZGl2XCIsXG4gICAgW1xuICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJmbGV4XCIgfSwgW1xuICAgICAgICBfYyhcbiAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwicmVsYXRpdmUgaC05IG1iLTYgZmxleC1uby1zaHJpbmtcIiB9LFxuICAgICAgICAgIFtfYyhcImhlYWRpbmdcIiwgeyBzdGF0aWNDbGFzczogXCJtYi02XCIgfSwgW192bS5fdihcIlJvbGVzXCIpXSldLFxuICAgICAgICAgIDFcbiAgICAgICAgKSxcbiAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJ3LWZ1bGwgZmxleCBpdGVtcy1jZW50ZXIgbWItNlwiIH0sIFtcbiAgICAgICAgICBfYyhcImRpdlwiLCB7XG4gICAgICAgICAgICBzdGF0aWNDbGFzczogXCJmbGV4IHctZnVsbCBqdXN0aWZ5LWVuZCBpdGVtcy1jZW50ZXIgbXgtM1wiXG4gICAgICAgICAgfSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImZsZXgtbm8tc2hyaW5rIG1sLWF1dG9cIiB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcInJvdXRlci1saW5rXCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiYnRuIGJ0bi1kZWZhdWx0IGJ0bi1wcmltYXJ5XCIsXG4gICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICB0YWc6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgIHRvOiB7IG5hbWU6IFwibGFyYXZlbC1ub3ZhLWdvdmVybm9yLXJvbGUtY3JlYXRlXCIgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW192bS5fdihcIlxcbiAgICAgICAgICAgICAgICAgICAgQ3JlYXRlIFJvbGVcXG4gICAgICAgICAgICAgICAgXCIpXVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgXSlcbiAgICAgIF0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwibG9hZGluZy1jYXJkXCIsIHsgYXR0cnM6IHsgbG9hZGluZzogX3ZtLmlzTG9hZGluZyB9IH0sIFtcbiAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJvdmVyZmxvdy1oaWRkZW4gb3ZlcmZsb3cteC1hdXRvIHJlbGF0aXZlXCIgfSwgW1xuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJ0YWJsZVwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJ0YWJsZSB3LWZ1bGxcIixcbiAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICBjZWxscGFkZGluZzogXCIwXCIsXG4gICAgICAgICAgICAgICAgY2VsbHNwYWNpbmc6IFwiMFwiLFxuICAgICAgICAgICAgICAgIFwiZGF0YS10ZXN0aWRcIjogXCJyZXNvdXJjZS10YWJsZVwiXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFwidGhlYWRcIiwgW1xuICAgICAgICAgICAgICAgIF9jKFwidHJcIiwgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJ0aFwiLCB7IHN0YXRpY0NsYXNzOiBcInRleHQtbGVmdFwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgXCJzcGFuXCIsXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY3Vyc29yLXBvaW50ZXIgaW5saW5lLWZsZXggaXRlbXMtY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBkdXNrOiBcInNvcnQtbmFtZVwiIH1cbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5hbWVcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgIF9jKFwidGhcIiwgeyBzdGF0aWNDbGFzczogXCJ0ZXh0LWxlZnRcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBEZXNjcmlwdGlvblxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwidGJvZHlcIixcbiAgICAgICAgICAgICAgICBfdm0uX2woX3ZtLnJvbGVzLCBmdW5jdGlvbihyb2xlKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gX2MoXG4gICAgICAgICAgICAgICAgICAgIFwicm91dGVyLWxpbmtcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIGtleTogcm9sZS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOlxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjdXJzb3ItcG9pbnRlciBmb250LW5vcm1hbCBkaW0gdGV4dC13aGl0ZSBtYi02IHRleHQtYmFzZSBuby11bmRlcmxpbmVcIixcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzczogeyBkaXNhYmxlZDogcm9sZS5uYW1lID09IFwiU3VwZXJBZG1pblwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhZzogXCJ0clwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG86IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJsYXJhdmVsLW5vdmEtZ292ZXJub3ItcGVybWlzc2lvbnNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiB7IHJvbGU6IHJvbGUubmFtZSB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXCJ0ZFwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzcGFuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwid2hpdGVzcGFjZS1uby13cmFwIHRleHQtbGVmdFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3Mocm9sZS5uYW1lKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcInRkXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwic3BhblwiLCB7IHN0YXRpY0NsYXNzOiBcInRleHQtbGVmdFwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3Mocm9sZS5kZXNjcmlwdGlvbikgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXVxuICAgICAgICAgIClcbiAgICAgICAgXSlcbiAgICAgIF0pXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikgICAgICAucmVyZW5kZXIoXCJkYXRhLXYtMzEyZDNlM2NcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LTMxMmQzZTNjXCIsXCJoYXNTY29wZWRcIjp0cnVlLFwiYnVibGVcIjp7XCJ0cmFuc2Zvcm1zXCI6e319fSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9Sb2xlcy52dWVcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4LmpzP3tcImlkXCI6XCJkYXRhLXYtMzEyZDNlM2NcIixcImhhc1Njb3BlZFwiOnRydWUsXCJidWJsZVwiOntcInRyYW5zZm9ybXNcIjp7fX19IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL1JvbGVzLnZ1ZVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwiZGl2XCIsXG4gICAgW1xuICAgICAgX2MoXCJoZWFkaW5nXCIsIHsgc3RhdGljQ2xhc3M6IFwibWItNlwiIH0sIFtfdm0uX3YoXCJBc3NpZ25tZW50c1wiKV0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwibG9hZGluZy1jYXJkXCIsIHsgYXR0cnM6IHsgbG9hZGluZzogX3ZtLmlzTG9hZGluZyB9IH0sIFtcbiAgICAgICAgX2MoXG4gICAgICAgICAgXCJmb3JtXCIsXG4gICAgICAgICAgeyBhdHRyczogeyBhdXRvY29tcGxldGU6IFwib2ZmXCIgfSB9LFxuICAgICAgICAgIF92bS5fbChfdm0ucm9sZXMsIGZ1bmN0aW9uKHJvbGUpIHtcbiAgICAgICAgICAgIHJldHVybiBfYyhcImRpdlwiLCB7IGtleTogcm9sZS5uYW1lIH0sIFtcbiAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJmbGV4IGJvcmRlci1iIGJvcmRlci00MFwiIH0sIFtcbiAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInctMS81IHB5LTYgcHgtOFwiIH0sIFtcbiAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCIsXG4gICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiaW5saW5lLWJsb2NrIHRleHQtODAgcHQtMiBsZWFkaW5nLXRpZ2h0XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKHJvbGUubmFtZSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInB5LTYgcHgtOCB3LTQvNVwiIH0sXG4gICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIF9jKFwibXVsdGlzZWxlY3RcIiwge1xuICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBfdm0udXNlcnMsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFsbG93LWVtcHR5XCI6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0cmFjay1ieVwiOiBcIm5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIm5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG11bHRpcGxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGlkZVNlbGVjdGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJPblNlbGVjdDogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgb246IHsgaW5wdXQ6IF92bS51cGRhdGVBc3NpZ25tZW50IH0sXG4gICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiByb2xlLnVzZXJzLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uJHNldChyb2xlLCBcInVzZXJzXCIsICQkdilcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInJvbGUudXNlcnNcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICBdKVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpICAgICAgLnJlcmVuZGVyKFwiZGF0YS12LTNlMDEzYjJiXCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi0zZTAxM2IyYlwiLFwiaGFzU2NvcGVkXCI6dHJ1ZSxcImJ1YmxlXCI6e1widHJhbnNmb3Jtc1wiOnt9fX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvQXNzaWdubWVudHMudnVlXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleC5qcz97XCJpZFwiOlwiZGF0YS12LTNlMDEzYjJiXCIsXCJoYXNTY29wZWRcIjp0cnVlLFwiYnVibGVcIjp7XCJ0cmFuc2Zvcm1zXCI6e319fSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9Bc3NpZ25tZW50cy52dWVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcImRpdlwiLFxuICAgIFtcbiAgICAgIF9jKFwiaGVhZGluZ1wiLCB7IHN0YXRpY0NsYXNzOiBcIm1iLTZcIiB9LCBbX3ZtLl92KFwiQ3JlYXRlIFJvbGVcIildKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcImxvYWRpbmctY2FyZFwiLCB7IGF0dHJzOiB7IGxvYWRpbmc6IGZhbHNlIH0gfSwgW1xuICAgICAgICBfYyhcImZvcm1cIiwgeyBhdHRyczogeyBhdXRvY29tcGxldGU6IFwib2ZmXCIgfSB9LCBbXG4gICAgICAgICAgX2MoXCJkaXZcIiwgW1xuICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJmbGV4IGJvcmRlci1iIGJvcmRlci00MFwiIH0sIFtcbiAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJ3LTEvNSBweS02IHB4LThcIiB9LCBbXG4gICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICBcImxhYmVsXCIsXG4gICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImlubGluZS1ibG9jayB0ZXh0LTgwIHB0LTIgbGVhZGluZy10aWdodFwiIH0sXG4gICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBOYW1lXFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwicHktNiBweC04IHctMS8yXCIgfSwgW1xuICAgICAgICAgICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtb2RlbFwiLFxuICAgICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi1tb2RlbFwiLFxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0ucm9sZS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwicm9sZS5uYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOlxuICAgICAgICAgICAgICAgICAgICBcInctZnVsbCBmb3JtLWNvbnRyb2wgZm9ybS1pbnB1dCBmb3JtLWlucHV0LWJvcmRlcmVkXCIsXG4gICAgICAgICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcInRleHRcIiwgcGxhY2Vob2xkZXI6IFwiTmFtZVwiIH0sXG4gICAgICAgICAgICAgICAgICBkb21Qcm9wczogeyB2YWx1ZTogX3ZtLnJvbGUubmFtZSB9LFxuICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQ6IFtcbiAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkZXZlbnQudGFyZ2V0LmNvbXBvc2luZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS4kc2V0KF92bS5yb2xlLCBcIm5hbWVcIiwgJGV2ZW50LnRhcmdldC52YWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIF92bS51cGRhdGVSb2xlXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICBdKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwiZGl2XCIsIFtcbiAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiZmxleCBib3JkZXItYiBib3JkZXItNDBcIiB9LCBbXG4gICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwidy0xLzUgcHktNiBweC04XCIgfSwgW1xuICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiLFxuICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJpbmxpbmUtYmxvY2sgdGV4dC04MCBwdC0yIGxlYWRpbmctdGlnaHRcIiB9LFxuICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRGVzY3JpcHRpb25cXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJweS02IHB4LTggdy00LzVcIiB9LCBbXG4gICAgICAgICAgICAgICAgX2MoXCJ0ZXh0YXJlYVwiLCB7XG4gICAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1vZGVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LW1vZGVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5yb2xlLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwicm9sZS5kZXNjcmlwdGlvblwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczpcbiAgICAgICAgICAgICAgICAgICAgXCJ3LWZ1bGwgZm9ybS1jb250cm9sIGZvcm0taW5wdXQgZm9ybS1pbnB1dC1ib3JkZXJlZCBweS0zIGgtYXV0b1wiLFxuICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgcm93czogXCI1XCIsIHBsYWNlaG9sZGVyOiBcIkRlc2NyaXB0aW9uXCIgfSxcbiAgICAgICAgICAgICAgICAgIGRvbVByb3BzOiB7IHZhbHVlOiBfdm0ucm9sZS5kZXNjcmlwdGlvbiB9LFxuICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQ6IFtcbiAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkZXZlbnQudGFyZ2V0LmNvbXBvc2luZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS4kc2V0KF92bS5yb2xlLCBcImRlc2NyaXB0aW9uXCIsICRldmVudC50YXJnZXQudmFsdWUpXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBfdm0udXBkYXRlUm9sZVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgXSlcbiAgICAgICAgXSlcbiAgICAgIF0pXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikgICAgICAucmVyZW5kZXIoXCJkYXRhLXYtNTBkMDMwYmRcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LTUwZDAzMGJkXCIsXCJoYXNTY29wZWRcIjp0cnVlLFwiYnVibGVcIjp7XCJ0cmFuc2Zvcm1zXCI6e319fSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9Sb2xlQ3JlYXRlLnZ1ZVxuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXguanM/e1wiaWRcIjpcImRhdGEtdi01MGQwMzBiZFwiLFwiaGFzU2NvcGVkXCI6dHJ1ZSxcImJ1YmxlXCI6e1widHJhbnNmb3Jtc1wiOnt9fX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvUm9sZUNyZWF0ZS52dWVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcImRpdlwiLFxuICAgIFtcbiAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiZmxleFwiIH0sIFtcbiAgICAgICAgX2MoXG4gICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInJlbGF0aXZlIGgtOSBtYi02IGZsZXgtbm8tc2hyaW5rXCIgfSxcbiAgICAgICAgICBbX2MoXCJoZWFkaW5nXCIsIHsgc3RhdGljQ2xhc3M6IFwibWItNlwiIH0sIFtfdm0uX3YoXCJFZGl0IFJvbGVcIildKV0sXG4gICAgICAgICAgMVxuICAgICAgICApLFxuICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInctZnVsbCBmbGV4IGl0ZW1zLWNlbnRlciBtYi02XCIgfSwgW1xuICAgICAgICAgIF9jKFwiZGl2XCIsIHtcbiAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImZsZXggdy1mdWxsIGp1c3RpZnktZW5kIGl0ZW1zLWNlbnRlciBteC0zXCJcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiZmxleC1uby1zaHJpbmsgbWwtYXV0b1wiIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiYnRuIGJ0bi1kZWZhdWx0IGJ0bi1pY29uIGJ0bi13aGl0ZVwiLFxuICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgdGl0bGU6IF92bS5fXyhcIkRlbGV0ZVwiKSB9LFxuICAgICAgICAgICAgICAgICAgb246IHsgY2xpY2s6IF92bS5vcGVuRGVsZXRlTW9kYWwgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJpY29uXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwidGV4dC04MFwiLFxuICAgICAgICAgICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcImRlbGV0ZVwiIH1cbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwicG9ydGFsXCIsXG4gICAgICAgICAgICAgICAgeyBhdHRyczogeyB0bzogXCJtb2RhbHNcIiB9IH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgIFwidHJhbnNpdGlvblwiLFxuICAgICAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IG5hbWU6IFwiZmFkZVwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF92bS5kZWxldGVNb2RhbE9wZW5cbiAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkZWxldGUtcmVzb3VyY2UtbW9kYWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBtb2RlOiBcImRlbGV0ZVwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25maXJtOiBfdm0uY29uZmlybURlbGV0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2U6IF92bS5jbG9zZURlbGV0ZU1vZGFsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJwLThcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImhlYWRpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibWItNlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBsZXZlbDogMiB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihfdm0uX3MoX3ZtLl9fKFwiRGVsZXRlIFJvbGVcIikpKV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwidGV4dC04MCBsZWFkaW5nLW5vcm1hbFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX18oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGUgdGhlICdcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnJvbGUubmFtZSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCInIHJvbGU/XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgXSlcbiAgICAgIF0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwibG9hZGluZy1jYXJkXCIsIHsgYXR0cnM6IHsgbG9hZGluZzogX3ZtLnJvbGVJc0xvYWRpbmcgfSB9LCBbXG4gICAgICAgIF9jKFwiZm9ybVwiLCB7IGF0dHJzOiB7IGF1dG9jb21wbGV0ZTogXCJvZmZcIiB9IH0sIFtcbiAgICAgICAgICBfYyhcImRpdlwiLCBbXG4gICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImZsZXggYm9yZGVyLWIgYm9yZGVyLTQwXCIgfSwgW1xuICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInctMS81IHB5LTYgcHgtOFwiIH0sIFtcbiAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgIFwibGFiZWxcIixcbiAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiaW5saW5lLWJsb2NrIHRleHQtODAgcHQtMiBsZWFkaW5nLXRpZ2h0XCIgfSxcbiAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5hbWVcXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJweS02IHB4LTggdy0xLzJcIiB9LCBbXG4gICAgICAgICAgICAgICAgX2MoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1vZGVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LW1vZGVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5yb2xlLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJyb2xlLm5hbWVcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6XG4gICAgICAgICAgICAgICAgICAgIFwidy1mdWxsIGZvcm0tY29udHJvbCBmb3JtLWlucHV0IGZvcm0taW5wdXQtYm9yZGVyZWRcIixcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHR5cGU6IFwidGV4dFwiLCBwbGFjZWhvbGRlcjogXCJOYW1lXCIgfSxcbiAgICAgICAgICAgICAgICAgIGRvbVByb3BzOiB7IHZhbHVlOiBfdm0ucm9sZS5uYW1lIH0sXG4gICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICBpbnB1dDogW1xuICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRldmVudC50YXJnZXQuY29tcG9zaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLiRzZXQoX3ZtLnJvbGUsIFwibmFtZVwiLCAkZXZlbnQudGFyZ2V0LnZhbHVlKVxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLnVwZGF0ZVJvbGVcbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICBdKVxuICAgICAgICAgIF0pLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXCJkaXZcIiwgW1xuICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJmbGV4IGJvcmRlci1iIGJvcmRlci00MFwiIH0sIFtcbiAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJ3LTEvNSBweS02IHB4LThcIiB9LCBbXG4gICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICBcImxhYmVsXCIsXG4gICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImlubGluZS1ibG9jayB0ZXh0LTgwIHB0LTIgbGVhZGluZy10aWdodFwiIH0sXG4gICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBEZXNjcmlwdGlvblxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInB5LTYgcHgtOCB3LTQvNVwiIH0sIFtcbiAgICAgICAgICAgICAgICBfYyhcInRleHRhcmVhXCIsIHtcbiAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibW9kZWxcIixcbiAgICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtbW9kZWxcIixcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLnJvbGUuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJyb2xlLmRlc2NyaXB0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOlxuICAgICAgICAgICAgICAgICAgICBcInctZnVsbCBmb3JtLWNvbnRyb2wgZm9ybS1pbnB1dCBmb3JtLWlucHV0LWJvcmRlcmVkIHB5LTMgaC1hdXRvXCIsXG4gICAgICAgICAgICAgICAgICBhdHRyczogeyByb3dzOiBcIjVcIiwgcGxhY2Vob2xkZXI6IFwiRGVzY3JpcHRpb25cIiB9LFxuICAgICAgICAgICAgICAgICAgZG9tUHJvcHM6IHsgdmFsdWU6IF92bS5yb2xlLmRlc2NyaXB0aW9uIH0sXG4gICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICBpbnB1dDogW1xuICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRldmVudC50YXJnZXQuY29tcG9zaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLiRzZXQoX3ZtLnJvbGUsIFwiZGVzY3JpcHRpb25cIiwgJGV2ZW50LnRhcmdldC52YWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIF92bS51cGRhdGVSb2xlXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICBdKVxuICAgICAgICBdKVxuICAgICAgXSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXCJoZWFkaW5nXCIsIHsgc3RhdGljQ2xhc3M6IFwibXQtOCBtYi02XCIgfSwgW192bS5fdihcIlBlcm1pc3Npb25zXCIpXSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXCJsb2FkaW5nLWNhcmRcIiwgeyBhdHRyczogeyBsb2FkaW5nOiBfdm0ucGVybWlzc2lvbnNJc0xvYWRpbmcgfSB9LCBbXG4gICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwicmVsYXRpdmVcIiB9LCBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInRhYmxlXCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInRhYmxlIHctZnVsbFwiLFxuICAgICAgICAgICAgICBhdHRyczogeyBjZWxscGFkZGluZzogXCIwXCIsIGNlbGxzcGFjaW5nOiBcIjBcIiB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcInRoZWFkXCIsIFtcbiAgICAgICAgICAgICAgICBfYyhcInRyXCIsIHsgc3RhdGljQ2xhc3M6IFwiYmctbm9uZVwiIH0sIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwidGhcIiwgeyBzdGF0aWNDbGFzczogXCJyb3VuZGVkLXRsXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRW50aXR5XFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgX2MoXCJ0aFwiLCBbXG4gICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDcmVhdGVcXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICBfYyhcInRoXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFZpZXdBbnlcXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICBfYyhcInRoXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFZpZXdcXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICBfYyhcInRoXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFVwZGF0ZVxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgIF9jKFwidGhcIiwgW1xuICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRGVsZXRlXFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgX2MoXCJ0aFwiLCBbXG4gICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZXN0b3JlXFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgX2MoXCJ0aFwiLCB7IHN0YXRpY0NsYXNzOiBcInJvdW5kZWQtdHJcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBGb3JjZSBEZWxldGVcXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcInRib2R5XCIsXG4gICAgICAgICAgICAgICAgX3ZtLl9sKF92bS5wZXJtaXNzaW9ucywgZnVuY3Rpb24ocGVybWlzc2lvbiwgbmFtZSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jKFwidHJcIiwgeyBrZXk6IG5hbWUsIHN0YXRpY0NsYXNzOiBcImhvdmVyOmJnLW5vbmVcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgIFwidGRcIixcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJ3aGl0ZXNwYWNlLW5vLXdyYXAgdGV4dC1sZWZ0IGNhcGl0YWxpemVcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKG5hbWUpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICBcInRkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJtdWx0aXNlbGVjdFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogX3ZtLmJpbmFyeVNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzZWxlY3QtbGFiZWxcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRlc2VsZWN0LWxhYmVsXCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzZWxlY3RlZC1sYWJlbFwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xvc2Utb24tc2VsZWN0XCI6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhbGxvdy1lbXB0eVwiOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbjogeyBpbnB1dDogX3ZtLnVwZGF0ZVBlcm1pc3Npb25zIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5wZXJtaXNzaW9uc1tuYW1lXVtcImNyZWF0ZVwiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uJHNldChfdm0ucGVybWlzc2lvbnNbbmFtZV0sIFwiY3JlYXRlXCIsICQkdilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwicGVybWlzc2lvbnNbbmFtZV1bJ2NyZWF0ZSddXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgXCJ0ZFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwibXVsdGlzZWxlY3RcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IF92bS5iaW5hcnlTZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2VsZWN0LWxhYmVsXCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkZXNlbGVjdC1sYWJlbFwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2VsZWN0ZWQtbGFiZWxcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsb3NlLW9uLXNlbGVjdFwiOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWxsb3ctZW1wdHlcIjogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb246IHsgaW5wdXQ6IF92bS51cGRhdGVQZXJtaXNzaW9ucyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0ucGVybWlzc2lvbnNbbmFtZV1bXCJ2aWV3QW55XCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS4kc2V0KF92bS5wZXJtaXNzaW9uc1tuYW1lXSwgXCJ2aWV3QW55XCIsICQkdilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwicGVybWlzc2lvbnNbbmFtZV1bJ3ZpZXdBbnknXVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgIFwidGRcIixcbiAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICBfYyhcIm11bHRpc2VsZWN0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBfdm0uc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlbGVjdC1sYWJlbFwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGVzZWxlY3QtbGFiZWxcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlbGVjdGVkLWxhYmVsXCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoYWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbG9zZS1vbi1zZWxlY3RcIjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFsbG93LWVtcHR5XCI6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7IGlucHV0OiBfdm0udXBkYXRlUGVybWlzc2lvbnMgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLnBlcm1pc3Npb25zW25hbWVdW1widmlld1wiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uJHNldChfdm0ucGVybWlzc2lvbnNbbmFtZV0sIFwidmlld1wiLCAkJHYpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInBlcm1pc3Npb25zW25hbWVdWyd2aWV3J11cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICBcInRkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJtdWx0aXNlbGVjdFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogX3ZtLnNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzZWxlY3QtbGFiZWxcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRlc2VsZWN0LWxhYmVsXCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzZWxlY3RlZC1sYWJlbFwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xvc2Utb24tc2VsZWN0XCI6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhbGxvdy1lbXB0eVwiOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbjogeyBpbnB1dDogX3ZtLnVwZGF0ZVBlcm1pc3Npb25zIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5wZXJtaXNzaW9uc1tuYW1lXVtcInVwZGF0ZVwiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uJHNldChfdm0ucGVybWlzc2lvbnNbbmFtZV0sIFwidXBkYXRlXCIsICQkdilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwicGVybWlzc2lvbnNbbmFtZV1bJ3VwZGF0ZSddXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgXCJ0ZFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwibXVsdGlzZWxlY3RcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IF92bS5zZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2VsZWN0LWxhYmVsXCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkZXNlbGVjdC1sYWJlbFwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2VsZWN0ZWQtbGFiZWxcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsb3NlLW9uLXNlbGVjdFwiOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWxsb3ctZW1wdHlcIjogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb246IHsgaW5wdXQ6IF92bS51cGRhdGVQZXJtaXNzaW9ucyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0ucGVybWlzc2lvbnNbbmFtZV1bXCJkZWxldGVcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLiRzZXQoX3ZtLnBlcm1pc3Npb25zW25hbWVdLCBcImRlbGV0ZVwiLCAkJHYpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInBlcm1pc3Npb25zW25hbWVdWydkZWxldGUnXVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgIFwidGRcIixcbiAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICBfYyhcIm11bHRpc2VsZWN0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBfdm0uc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlbGVjdC1sYWJlbFwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGVzZWxlY3QtbGFiZWxcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlbGVjdGVkLWxhYmVsXCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoYWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbG9zZS1vbi1zZWxlY3RcIjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFsbG93LWVtcHR5XCI6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7IGlucHV0OiBfdm0udXBkYXRlUGVybWlzc2lvbnMgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLnBlcm1pc3Npb25zW25hbWVdW1wicmVzdG9yZVwiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uJHNldChfdm0ucGVybWlzc2lvbnNbbmFtZV0sIFwicmVzdG9yZVwiLCAkJHYpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInBlcm1pc3Npb25zW25hbWVdWydyZXN0b3JlJ11cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICBcInRkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJtdWx0aXNlbGVjdFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogX3ZtLnNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzZWxlY3QtbGFiZWxcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRlc2VsZWN0LWxhYmVsXCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzZWxlY3RlZC1sYWJlbFwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xvc2Utb24tc2VsZWN0XCI6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhbGxvdy1lbXB0eVwiOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbjogeyBpbnB1dDogX3ZtLnVwZGF0ZVBlcm1pc3Npb25zIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5wZXJtaXNzaW9uc1tuYW1lXVtcImZvcmNlRGVsZXRlXCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS4kc2V0KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0ucGVybWlzc2lvbnNbbmFtZV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9yY2VEZWxldGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCR2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInBlcm1pc3Npb25zW25hbWVdWydmb3JjZURlbGV0ZSddXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdXG4gICAgICAgICAgKVxuICAgICAgICBdKVxuICAgICAgXSlcbiAgICBdLFxuICAgIDFcbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbm1vZHVsZS5leHBvcnRzID0geyByZW5kZXI6IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnMgfVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKSAgICAgIC5yZXJlbmRlcihcImRhdGEtdi1lOWZmZTUyZVwiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtZTlmZmU1MmVcIixcImhhc1Njb3BlZFwiOnRydWUsXCJidWJsZVwiOntcInRyYW5zZm9ybXNcIjp7fX19IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL1Blcm1pc3Npb25zLnZ1ZVxuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXguanM/e1wiaWRcIjpcImRhdGEtdi1lOWZmZTUyZVwiLFwiaGFzU2NvcGVkXCI6dHJ1ZSxcImJ1YmxlXCI6e1widHJhbnNmb3Jtc1wiOnt9fX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvUGVybWlzc2lvbnMudnVlXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIiFmdW5jdGlvbih0LGUpe1wib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlP21vZHVsZS5leHBvcnRzPWUoKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFtdLGUpOlwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzP2V4cG9ydHMuVnVlTXVsdGlzZWxlY3Q9ZSgpOnQuVnVlTXVsdGlzZWxlY3Q9ZSgpfSh0aGlzLGZ1bmN0aW9uKCl7cmV0dXJuIGZ1bmN0aW9uKHQpe2Z1bmN0aW9uIGUoaSl7aWYobltpXSlyZXR1cm4gbltpXS5leHBvcnRzO3ZhciByPW5baV09e2k6aSxsOiExLGV4cG9ydHM6e319O3JldHVybiB0W2ldLmNhbGwoci5leHBvcnRzLHIsci5leHBvcnRzLGUpLHIubD0hMCxyLmV4cG9ydHN9dmFyIG49e307cmV0dXJuIGUubT10LGUuYz1uLGUuaT1mdW5jdGlvbih0KXtyZXR1cm4gdH0sZS5kPWZ1bmN0aW9uKHQsbixpKXtlLm8odCxuKXx8T2JqZWN0LmRlZmluZVByb3BlcnR5KHQsbix7Y29uZmlndXJhYmxlOiExLGVudW1lcmFibGU6ITAsZ2V0Oml9KX0sZS5uPWZ1bmN0aW9uKHQpe3ZhciBuPXQmJnQuX19lc01vZHVsZT9mdW5jdGlvbigpe3JldHVybiB0LmRlZmF1bHR9OmZ1bmN0aW9uKCl7cmV0dXJuIHR9O3JldHVybiBlLmQobixcImFcIixuKSxufSxlLm89ZnVuY3Rpb24odCxlKXtyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHQsZSl9LGUucD1cIi9cIixlKGUucz02MCl9KFtmdW5jdGlvbih0LGUpe3ZhciBuPXQuZXhwb3J0cz1cInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93JiZ3aW5kb3cuTWF0aD09TWF0aD93aW5kb3c6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGYmJnNlbGYuTWF0aD09TWF0aD9zZWxmOkZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcIm51bWJlclwiPT10eXBlb2YgX19nJiYoX19nPW4pfSxmdW5jdGlvbih0LGUsbil7dmFyIGk9big0OSkoXCJ3a3NcIikscj1uKDMwKSxvPW4oMCkuU3ltYm9sLHM9XCJmdW5jdGlvblwiPT10eXBlb2YgbzsodC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiBpW3RdfHwoaVt0XT1zJiZvW3RdfHwocz9vOnIpKFwiU3ltYm9sLlwiK3QpKX0pLnN0b3JlPWl9LGZ1bmN0aW9uKHQsZSxuKXt2YXIgaT1uKDUpO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtpZighaSh0KSl0aHJvdyBUeXBlRXJyb3IodCtcIiBpcyBub3QgYW4gb2JqZWN0IVwiKTtyZXR1cm4gdH19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgaT1uKDApLHI9bigxMCksbz1uKDgpLHM9big2KSx1PW4oMTEpLGE9ZnVuY3Rpb24odCxlLG4pe3ZhciBsLGMsZixwLGg9dCZhLkYsZD10JmEuRyx2PXQmYS5TLGc9dCZhLlAsbT10JmEuQix5PWQ/aTp2P2lbZV18fChpW2VdPXt9KTooaVtlXXx8e30pLnByb3RvdHlwZSxiPWQ/cjpyW2VdfHwocltlXT17fSksXz1iLnByb3RvdHlwZXx8KGIucHJvdG90eXBlPXt9KTtkJiYobj1lKTtmb3IobCBpbiBuKWM9IWgmJnkmJnZvaWQgMCE9PXlbbF0sZj0oYz95Om4pW2xdLHA9bSYmYz91KGYsaSk6ZyYmXCJmdW5jdGlvblwiPT10eXBlb2YgZj91KEZ1bmN0aW9uLmNhbGwsZik6Zix5JiZzKHksbCxmLHQmYS5VKSxiW2xdIT1mJiZvKGIsbCxwKSxnJiZfW2xdIT1mJiYoX1tsXT1mKX07aS5jb3JlPXIsYS5GPTEsYS5HPTIsYS5TPTQsYS5QPTgsYS5CPTE2LGEuVz0zMixhLlU9NjQsYS5SPTEyOCx0LmV4cG9ydHM9YX0sZnVuY3Rpb24odCxlLG4pe3QuZXhwb3J0cz0hbig3KShmdW5jdGlvbigpe3JldHVybiA3IT1PYmplY3QuZGVmaW5lUHJvcGVydHkoe30sXCJhXCIse2dldDpmdW5jdGlvbigpe3JldHVybiA3fX0pLmF9KX0sZnVuY3Rpb24odCxlKXt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7cmV0dXJuXCJvYmplY3RcIj09dHlwZW9mIHQ/bnVsbCE9PXQ6XCJmdW5jdGlvblwiPT10eXBlb2YgdH19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgaT1uKDApLHI9big4KSxvPW4oMTIpLHM9bigzMCkoXCJzcmNcIiksdT1GdW5jdGlvbi50b1N0cmluZyxhPShcIlwiK3UpLnNwbGl0KFwidG9TdHJpbmdcIik7bigxMCkuaW5zcGVjdFNvdXJjZT1mdW5jdGlvbih0KXtyZXR1cm4gdS5jYWxsKHQpfSwodC5leHBvcnRzPWZ1bmN0aW9uKHQsZSxuLHUpe3ZhciBsPVwiZnVuY3Rpb25cIj09dHlwZW9mIG47bCYmKG8obixcIm5hbWVcIil8fHIobixcIm5hbWVcIixlKSksdFtlXSE9PW4mJihsJiYobyhuLHMpfHxyKG4scyx0W2VdP1wiXCIrdFtlXTphLmpvaW4oU3RyaW5nKGUpKSkpLHQ9PT1pP3RbZV09bjp1P3RbZV0/dFtlXT1uOnIodCxlLG4pOihkZWxldGUgdFtlXSxyKHQsZSxuKSkpfSkoRnVuY3Rpb24ucHJvdG90eXBlLFwidG9TdHJpbmdcIixmdW5jdGlvbigpe3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIHRoaXMmJnRoaXNbc118fHUuY2FsbCh0aGlzKX0pfSxmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz1mdW5jdGlvbih0KXt0cnl7cmV0dXJuISF0KCl9Y2F0Y2godCl7cmV0dXJuITB9fX0sZnVuY3Rpb24odCxlLG4pe3ZhciBpPW4oMTMpLHI9bigyNSk7dC5leHBvcnRzPW4oNCk/ZnVuY3Rpb24odCxlLG4pe3JldHVybiBpLmYodCxlLHIoMSxuKSl9OmZ1bmN0aW9uKHQsZSxuKXtyZXR1cm4gdFtlXT1uLHR9fSxmdW5jdGlvbih0LGUpe3ZhciBuPXt9LnRvU3RyaW5nO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm4gbi5jYWxsKHQpLnNsaWNlKDgsLTEpfX0sZnVuY3Rpb24odCxlKXt2YXIgbj10LmV4cG9ydHM9e3ZlcnNpb246XCIyLjUuN1wifTtcIm51bWJlclwiPT10eXBlb2YgX19lJiYoX19lPW4pfSxmdW5jdGlvbih0LGUsbil7dmFyIGk9bigxNCk7dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSxuKXtpZihpKHQpLHZvaWQgMD09PWUpcmV0dXJuIHQ7c3dpdGNoKG4pe2Nhc2UgMTpyZXR1cm4gZnVuY3Rpb24obil7cmV0dXJuIHQuY2FsbChlLG4pfTtjYXNlIDI6cmV0dXJuIGZ1bmN0aW9uKG4saSl7cmV0dXJuIHQuY2FsbChlLG4saSl9O2Nhc2UgMzpyZXR1cm4gZnVuY3Rpb24obixpLHIpe3JldHVybiB0LmNhbGwoZSxuLGkscil9fXJldHVybiBmdW5jdGlvbigpe3JldHVybiB0LmFwcGx5KGUsYXJndW1lbnRzKX19fSxmdW5jdGlvbih0LGUpe3ZhciBuPXt9Lmhhc093blByb3BlcnR5O3QuZXhwb3J0cz1mdW5jdGlvbih0LGUpe3JldHVybiBuLmNhbGwodCxlKX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgaT1uKDIpLHI9big0MSksbz1uKDI5KSxzPU9iamVjdC5kZWZpbmVQcm9wZXJ0eTtlLmY9big0KT9PYmplY3QuZGVmaW5lUHJvcGVydHk6ZnVuY3Rpb24odCxlLG4pe2lmKGkodCksZT1vKGUsITApLGkobikscil0cnl7cmV0dXJuIHModCxlLG4pfWNhdGNoKHQpe31pZihcImdldFwiaW4gbnx8XCJzZXRcImluIG4pdGhyb3cgVHlwZUVycm9yKFwiQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQhXCIpO3JldHVyblwidmFsdWVcImluIG4mJih0W2VdPW4udmFsdWUpLHR9fSxmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz1mdW5jdGlvbih0KXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiB0KXRocm93IFR5cGVFcnJvcih0K1wiIGlzIG5vdCBhIGZ1bmN0aW9uIVwiKTtyZXR1cm4gdH19LGZ1bmN0aW9uKHQsZSl7dC5leHBvcnRzPXt9fSxmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz1mdW5jdGlvbih0KXtpZih2b2lkIDA9PXQpdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiK3QpO3JldHVybiB0fX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO3ZhciBpPW4oNyk7dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSl7cmV0dXJuISF0JiZpKGZ1bmN0aW9uKCl7ZT90LmNhbGwobnVsbCxmdW5jdGlvbigpe30sMSk6dC5jYWxsKG51bGwpfSl9fSxmdW5jdGlvbih0LGUsbil7dmFyIGk9bigyMykscj1uKDE2KTt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7cmV0dXJuIGkocih0KSl9fSxmdW5jdGlvbih0LGUsbil7dmFyIGk9big1Mykscj1NYXRoLm1pbjt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7cmV0dXJuIHQ+MD9yKGkodCksOTAwNzE5OTI1NDc0MDk5MSk6MH19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgaT1uKDExKSxyPW4oMjMpLG89bigyOCkscz1uKDE5KSx1PW4oNjQpO3QuZXhwb3J0cz1mdW5jdGlvbih0LGUpe3ZhciBuPTE9PXQsYT0yPT10LGw9Mz09dCxjPTQ9PXQsZj02PT10LHA9NT09dHx8ZixoPWV8fHU7cmV0dXJuIGZ1bmN0aW9uKGUsdSxkKXtmb3IodmFyIHYsZyxtPW8oZSkseT1yKG0pLGI9aSh1LGQsMyksXz1zKHkubGVuZ3RoKSx4PTAsdz1uP2goZSxfKTphP2goZSwwKTp2b2lkIDA7Xz54O3grKylpZigocHx8eCBpbiB5KSYmKHY9eVt4XSxnPWIodix4LG0pLHQpKWlmKG4pd1t4XT1nO2Vsc2UgaWYoZylzd2l0Y2godCl7Y2FzZSAzOnJldHVybiEwO2Nhc2UgNTpyZXR1cm4gdjtjYXNlIDY6cmV0dXJuIHg7Y2FzZSAyOncucHVzaCh2KX1lbHNlIGlmKGMpcmV0dXJuITE7cmV0dXJuIGY/LTE6bHx8Yz9jOnd9fX0sZnVuY3Rpb24odCxlLG4pe3ZhciBpPW4oNSkscj1uKDApLmRvY3VtZW50LG89aShyKSYmaShyLmNyZWF0ZUVsZW1lbnQpO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm4gbz9yLmNyZWF0ZUVsZW1lbnQodCk6e319fSxmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz1cImNvbnN0cnVjdG9yLGhhc093blByb3BlcnR5LGlzUHJvdG90eXBlT2YscHJvcGVydHlJc0VudW1lcmFibGUsdG9Mb2NhbGVTdHJpbmcsdG9TdHJpbmcsdmFsdWVPZlwiLnNwbGl0KFwiLFwiKX0sZnVuY3Rpb24odCxlLG4pe3ZhciBpPW4oOSk7dC5leHBvcnRzPU9iamVjdChcInpcIikucHJvcGVydHlJc0VudW1lcmFibGUoMCk/T2JqZWN0OmZ1bmN0aW9uKHQpe3JldHVyblwiU3RyaW5nXCI9PWkodCk/dC5zcGxpdChcIlwiKTpPYmplY3QodCl9fSxmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz0hMX0sZnVuY3Rpb24odCxlKXt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlKXtyZXR1cm57ZW51bWVyYWJsZTohKDEmdCksY29uZmlndXJhYmxlOiEoMiZ0KSx3cml0YWJsZTohKDQmdCksdmFsdWU6ZX19fSxmdW5jdGlvbih0LGUsbil7dmFyIGk9bigxMykuZixyPW4oMTIpLG89bigxKShcInRvU3RyaW5nVGFnXCIpO3QuZXhwb3J0cz1mdW5jdGlvbih0LGUsbil7dCYmIXIodD1uP3Q6dC5wcm90b3R5cGUsbykmJmkodCxvLHtjb25maWd1cmFibGU6ITAsdmFsdWU6ZX0pfX0sZnVuY3Rpb24odCxlLG4pe3ZhciBpPW4oNDkpKFwia2V5c1wiKSxyPW4oMzApO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm4gaVt0XXx8KGlbdF09cih0KSl9fSxmdW5jdGlvbih0LGUsbil7dmFyIGk9bigxNik7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiBPYmplY3QoaSh0KSl9fSxmdW5jdGlvbih0LGUsbil7dmFyIGk9big1KTt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlKXtpZighaSh0KSlyZXR1cm4gdDt2YXIgbixyO2lmKGUmJlwiZnVuY3Rpb25cIj09dHlwZW9mKG49dC50b1N0cmluZykmJiFpKHI9bi5jYWxsKHQpKSlyZXR1cm4gcjtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZihuPXQudmFsdWVPZikmJiFpKHI9bi5jYWxsKHQpKSlyZXR1cm4gcjtpZighZSYmXCJmdW5jdGlvblwiPT10eXBlb2Yobj10LnRvU3RyaW5nKSYmIWkocj1uLmNhbGwodCkpKXJldHVybiByO3Rocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKX19LGZ1bmN0aW9uKHQsZSl7dmFyIG49MCxpPU1hdGgucmFuZG9tKCk7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVyblwiU3ltYm9sKFwiLmNvbmNhdCh2b2lkIDA9PT10P1wiXCI6dCxcIilfXCIsKCsrbitpKS50b1N0cmluZygzNikpfX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO3ZhciBpPW4oMCkscj1uKDEyKSxvPW4oOSkscz1uKDY3KSx1PW4oMjkpLGE9big3KSxsPW4oNzcpLmYsYz1uKDQ1KS5mLGY9bigxMykuZixwPW4oNTEpLnRyaW0saD1pLk51bWJlcixkPWgsdj1oLnByb3RvdHlwZSxnPVwiTnVtYmVyXCI9PW8obig0NCkodikpLG09XCJ0cmltXCJpbiBTdHJpbmcucHJvdG90eXBlLHk9ZnVuY3Rpb24odCl7dmFyIGU9dSh0LCExKTtpZihcInN0cmluZ1wiPT10eXBlb2YgZSYmZS5sZW5ndGg+Mil7ZT1tP2UudHJpbSgpOnAoZSwzKTt2YXIgbixpLHIsbz1lLmNoYXJDb2RlQXQoMCk7aWYoNDM9PT1vfHw0NT09PW8pe2lmKDg4PT09KG49ZS5jaGFyQ29kZUF0KDIpKXx8MTIwPT09bilyZXR1cm4gTmFOfWVsc2UgaWYoNDg9PT1vKXtzd2l0Y2goZS5jaGFyQ29kZUF0KDEpKXtjYXNlIDY2OmNhc2UgOTg6aT0yLHI9NDk7YnJlYWs7Y2FzZSA3OTpjYXNlIDExMTppPTgscj01NTticmVhaztkZWZhdWx0OnJldHVybitlfWZvcih2YXIgcyxhPWUuc2xpY2UoMiksbD0wLGM9YS5sZW5ndGg7bDxjO2wrKylpZigocz1hLmNoYXJDb2RlQXQobCkpPDQ4fHxzPnIpcmV0dXJuIE5hTjtyZXR1cm4gcGFyc2VJbnQoYSxpKX19cmV0dXJuK2V9O2lmKCFoKFwiIDBvMVwiKXx8IWgoXCIwYjFcIil8fGgoXCIrMHgxXCIpKXtoPWZ1bmN0aW9uKHQpe3ZhciBlPWFyZ3VtZW50cy5sZW5ndGg8MT8wOnQsbj10aGlzO3JldHVybiBuIGluc3RhbmNlb2YgaCYmKGc/YShmdW5jdGlvbigpe3YudmFsdWVPZi5jYWxsKG4pfSk6XCJOdW1iZXJcIiE9byhuKSk/cyhuZXcgZCh5KGUpKSxuLGgpOnkoZSl9O2Zvcih2YXIgYixfPW4oNCk/bChkKTpcIk1BWF9WQUxVRSxNSU5fVkFMVUUsTmFOLE5FR0FUSVZFX0lORklOSVRZLFBPU0lUSVZFX0lORklOSVRZLEVQU0lMT04saXNGaW5pdGUsaXNJbnRlZ2VyLGlzTmFOLGlzU2FmZUludGVnZXIsTUFYX1NBRkVfSU5URUdFUixNSU5fU0FGRV9JTlRFR0VSLHBhcnNlRmxvYXQscGFyc2VJbnQsaXNJbnRlZ2VyXCIuc3BsaXQoXCIsXCIpLHg9MDtfLmxlbmd0aD54O3grKylyKGQsYj1fW3hdKSYmIXIoaCxiKSYmZihoLGIsYyhkLGIpKTtoLnByb3RvdHlwZT12LHYuY29uc3RydWN0b3I9aCxuKDYpKGksXCJOdW1iZXJcIixoKX19LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBpKHQpe3JldHVybiAwIT09dCYmKCEoIUFycmF5LmlzQXJyYXkodCl8fDAhPT10Lmxlbmd0aCl8fCF0KX1mdW5jdGlvbiByKHQpe3JldHVybiBmdW5jdGlvbigpe3JldHVybiF0LmFwcGx5KHZvaWQgMCxhcmd1bWVudHMpfX1mdW5jdGlvbiBvKHQsZSl7cmV0dXJuIHZvaWQgMD09PXQmJih0PVwidW5kZWZpbmVkXCIpLG51bGw9PT10JiYodD1cIm51bGxcIiksITE9PT10JiYodD1cImZhbHNlXCIpLC0xIT09dC50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihlLnRyaW0oKSl9ZnVuY3Rpb24gcyh0LGUsbixpKXtyZXR1cm4gdC5maWx0ZXIoZnVuY3Rpb24odCl7cmV0dXJuIG8oaSh0LG4pLGUpfSl9ZnVuY3Rpb24gdSh0KXtyZXR1cm4gdC5maWx0ZXIoZnVuY3Rpb24odCl7cmV0dXJuIXQuJGlzTGFiZWx9KX1mdW5jdGlvbiBhKHQsZSl7cmV0dXJuIGZ1bmN0aW9uKG4pe3JldHVybiBuLnJlZHVjZShmdW5jdGlvbihuLGkpe3JldHVybiBpW3RdJiZpW3RdLmxlbmd0aD8obi5wdXNoKHskZ3JvdXBMYWJlbDppW2VdLCRpc0xhYmVsOiEwfSksbi5jb25jYXQoaVt0XSkpOm59LFtdKX19ZnVuY3Rpb24gbCh0LGUsaSxyLG8pe3JldHVybiBmdW5jdGlvbih1KXtyZXR1cm4gdS5tYXAoZnVuY3Rpb24odSl7dmFyIGE7aWYoIXVbaV0pcmV0dXJuIGNvbnNvbGUud2FybihcIk9wdGlvbnMgcGFzc2VkIHRvIHZ1ZS1tdWx0aXNlbGVjdCBkbyBub3QgY29udGFpbiBncm91cHMsIGRlc3BpdGUgdGhlIGNvbmZpZy5cIiksW107dmFyIGw9cyh1W2ldLHQsZSxvKTtyZXR1cm4gbC5sZW5ndGg/KGE9e30sbi5pKGQuYSkoYSxyLHVbcl0pLG4uaShkLmEpKGEsaSxsKSxhKTpbXX0pfX12YXIgYz1uKDU5KSxmPW4oNTQpLHA9KG4ubihmKSxuKDk1KSksaD0obi5uKHApLG4oMzEpKSxkPShuLm4oaCksbig1OCkpLHY9big5MSksZz0obi5uKHYpLG4oOTgpKSxtPShuLm4oZyksbig5MikpLHk9KG4ubihtKSxuKDg4KSksYj0obi5uKHkpLG4oOTcpKSxfPShuLm4oYiksbig4OSkpLHg9KG4ubihfKSxuKDk2KSksdz0obi5uKHgpLG4oOTMpKSxTPShuLm4odyksbig5MCkpLE89KG4ubihTKSxmdW5jdGlvbigpe2Zvcih2YXIgdD1hcmd1bWVudHMubGVuZ3RoLGU9bmV3IEFycmF5KHQpLG49MDtuPHQ7bisrKWVbbl09YXJndW1lbnRzW25dO3JldHVybiBmdW5jdGlvbih0KXtyZXR1cm4gZS5yZWR1Y2UoZnVuY3Rpb24odCxlKXtyZXR1cm4gZSh0KX0sdCl9fSk7ZS5hPXtkYXRhOmZ1bmN0aW9uKCl7cmV0dXJue3NlYXJjaDpcIlwiLGlzT3BlbjohMSxwcmVmZmVyZWRPcGVuRGlyZWN0aW9uOlwiYmVsb3dcIixvcHRpbWl6ZWRIZWlnaHQ6dGhpcy5tYXhIZWlnaHR9fSxwcm9wczp7aW50ZXJuYWxTZWFyY2g6e3R5cGU6Qm9vbGVhbixkZWZhdWx0OiEwfSxvcHRpb25zOnt0eXBlOkFycmF5LHJlcXVpcmVkOiEwfSxtdWx0aXBsZTp7dHlwZTpCb29sZWFuLGRlZmF1bHQ6ITF9LHZhbHVlOnt0eXBlOm51bGwsZGVmYXVsdDpmdW5jdGlvbigpe3JldHVybltdfX0sdHJhY2tCeTp7dHlwZTpTdHJpbmd9LGxhYmVsOnt0eXBlOlN0cmluZ30sc2VhcmNoYWJsZTp7dHlwZTpCb29sZWFuLGRlZmF1bHQ6ITB9LGNsZWFyT25TZWxlY3Q6e3R5cGU6Qm9vbGVhbixkZWZhdWx0OiEwfSxoaWRlU2VsZWN0ZWQ6e3R5cGU6Qm9vbGVhbixkZWZhdWx0OiExfSxwbGFjZWhvbGRlcjp7dHlwZTpTdHJpbmcsZGVmYXVsdDpcIlNlbGVjdCBvcHRpb25cIn0sYWxsb3dFbXB0eTp7dHlwZTpCb29sZWFuLGRlZmF1bHQ6ITB9LHJlc2V0QWZ0ZXI6e3R5cGU6Qm9vbGVhbixkZWZhdWx0OiExfSxjbG9zZU9uU2VsZWN0Ont0eXBlOkJvb2xlYW4sZGVmYXVsdDohMH0sY3VzdG9tTGFiZWw6e3R5cGU6RnVuY3Rpb24sZGVmYXVsdDpmdW5jdGlvbih0LGUpe3JldHVybiBpKHQpP1wiXCI6ZT90W2VdOnR9fSx0YWdnYWJsZTp7dHlwZTpCb29sZWFuLGRlZmF1bHQ6ITF9LHRhZ1BsYWNlaG9sZGVyOnt0eXBlOlN0cmluZyxkZWZhdWx0OlwiUHJlc3MgZW50ZXIgdG8gY3JlYXRlIGEgdGFnXCJ9LHRhZ1Bvc2l0aW9uOnt0eXBlOlN0cmluZyxkZWZhdWx0OlwidG9wXCJ9LG1heDp7dHlwZTpbTnVtYmVyLEJvb2xlYW5dLGRlZmF1bHQ6ITF9LGlkOntkZWZhdWx0Om51bGx9LG9wdGlvbnNMaW1pdDp7dHlwZTpOdW1iZXIsZGVmYXVsdDoxZTN9LGdyb3VwVmFsdWVzOnt0eXBlOlN0cmluZ30sZ3JvdXBMYWJlbDp7dHlwZTpTdHJpbmd9LGdyb3VwU2VsZWN0Ont0eXBlOkJvb2xlYW4sZGVmYXVsdDohMX0sYmxvY2tLZXlzOnt0eXBlOkFycmF5LGRlZmF1bHQ6ZnVuY3Rpb24oKXtyZXR1cm5bXX19LHByZXNlcnZlU2VhcmNoOnt0eXBlOkJvb2xlYW4sZGVmYXVsdDohMX0scHJlc2VsZWN0Rmlyc3Q6e3R5cGU6Qm9vbGVhbixkZWZhdWx0OiExfX0sbW91bnRlZDpmdW5jdGlvbigpe3RoaXMubXVsdGlwbGV8fHRoaXMuY2xlYXJPblNlbGVjdHx8Y29uc29sZS53YXJuKFwiW1Z1ZS1NdWx0aXNlbGVjdCB3YXJuXTogQ2xlYXJPblNlbGVjdCBhbmQgTXVsdGlwbGUgcHJvcHMgY2Fu4oCZdCBiZSBib3RoIHNldCB0byBmYWxzZS5cIiksIXRoaXMubXVsdGlwbGUmJnRoaXMubWF4JiZjb25zb2xlLndhcm4oXCJbVnVlLU11bHRpc2VsZWN0IHdhcm5dOiBNYXggcHJvcCBzaG91bGQgbm90IGJlIHVzZWQgd2hlbiBwcm9wIE11bHRpcGxlIGVxdWFscyBmYWxzZS5cIiksdGhpcy5wcmVzZWxlY3RGaXJzdCYmIXRoaXMuaW50ZXJuYWxWYWx1ZS5sZW5ndGgmJnRoaXMub3B0aW9ucy5sZW5ndGgmJnRoaXMuc2VsZWN0KHRoaXMuZmlsdGVyZWRPcHRpb25zWzBdKX0sY29tcHV0ZWQ6e2ludGVybmFsVmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy52YWx1ZXx8MD09PXRoaXMudmFsdWU/QXJyYXkuaXNBcnJheSh0aGlzLnZhbHVlKT90aGlzLnZhbHVlOlt0aGlzLnZhbHVlXTpbXX0sZmlsdGVyZWRPcHRpb25zOmZ1bmN0aW9uKCl7dmFyIHQ9dGhpcy5zZWFyY2h8fFwiXCIsZT10LnRvTG93ZXJDYXNlKCkudHJpbSgpLG49dGhpcy5vcHRpb25zLmNvbmNhdCgpO3JldHVybiBuPXRoaXMuaW50ZXJuYWxTZWFyY2g/dGhpcy5ncm91cFZhbHVlcz90aGlzLmZpbHRlckFuZEZsYXQobixlLHRoaXMubGFiZWwpOnMobixlLHRoaXMubGFiZWwsdGhpcy5jdXN0b21MYWJlbCk6dGhpcy5ncm91cFZhbHVlcz9hKHRoaXMuZ3JvdXBWYWx1ZXMsdGhpcy5ncm91cExhYmVsKShuKTpuLG49dGhpcy5oaWRlU2VsZWN0ZWQ/bi5maWx0ZXIocih0aGlzLmlzU2VsZWN0ZWQpKTpuLHRoaXMudGFnZ2FibGUmJmUubGVuZ3RoJiYhdGhpcy5pc0V4aXN0aW5nT3B0aW9uKGUpJiYoXCJib3R0b21cIj09PXRoaXMudGFnUG9zaXRpb24/bi5wdXNoKHtpc1RhZzohMCxsYWJlbDp0fSk6bi51bnNoaWZ0KHtpc1RhZzohMCxsYWJlbDp0fSkpLG4uc2xpY2UoMCx0aGlzLm9wdGlvbnNMaW1pdCl9LHZhbHVlS2V5czpmdW5jdGlvbigpe3ZhciB0PXRoaXM7cmV0dXJuIHRoaXMudHJhY2tCeT90aGlzLmludGVybmFsVmFsdWUubWFwKGZ1bmN0aW9uKGUpe3JldHVybiBlW3QudHJhY2tCeV19KTp0aGlzLmludGVybmFsVmFsdWV9LG9wdGlvbktleXM6ZnVuY3Rpb24oKXt2YXIgdD10aGlzO3JldHVybih0aGlzLmdyb3VwVmFsdWVzP3RoaXMuZmxhdEFuZFN0cmlwKHRoaXMub3B0aW9ucyk6dGhpcy5vcHRpb25zKS5tYXAoZnVuY3Rpb24oZSl7cmV0dXJuIHQuY3VzdG9tTGFiZWwoZSx0LmxhYmVsKS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCl9KX0sY3VycmVudE9wdGlvbkxhYmVsOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMubXVsdGlwbGU/dGhpcy5zZWFyY2hhYmxlP1wiXCI6dGhpcy5wbGFjZWhvbGRlcjp0aGlzLmludGVybmFsVmFsdWUubGVuZ3RoP3RoaXMuZ2V0T3B0aW9uTGFiZWwodGhpcy5pbnRlcm5hbFZhbHVlWzBdKTp0aGlzLnNlYXJjaGFibGU/XCJcIjp0aGlzLnBsYWNlaG9sZGVyfX0sd2F0Y2g6e2ludGVybmFsVmFsdWU6ZnVuY3Rpb24oKXt0aGlzLnJlc2V0QWZ0ZXImJnRoaXMuaW50ZXJuYWxWYWx1ZS5sZW5ndGgmJih0aGlzLnNlYXJjaD1cIlwiLHRoaXMuJGVtaXQoXCJpbnB1dFwiLHRoaXMubXVsdGlwbGU/W106bnVsbCkpfSxzZWFyY2g6ZnVuY3Rpb24oKXt0aGlzLiRlbWl0KFwic2VhcmNoLWNoYW5nZVwiLHRoaXMuc2VhcmNoLHRoaXMuaWQpfX0sbWV0aG9kczp7Z2V0VmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5tdWx0aXBsZT90aGlzLmludGVybmFsVmFsdWU6MD09PXRoaXMuaW50ZXJuYWxWYWx1ZS5sZW5ndGg/bnVsbDp0aGlzLmludGVybmFsVmFsdWVbMF19LGZpbHRlckFuZEZsYXQ6ZnVuY3Rpb24odCxlLG4pe3JldHVybiBPKGwoZSxuLHRoaXMuZ3JvdXBWYWx1ZXMsdGhpcy5ncm91cExhYmVsLHRoaXMuY3VzdG9tTGFiZWwpLGEodGhpcy5ncm91cFZhbHVlcyx0aGlzLmdyb3VwTGFiZWwpKSh0KX0sZmxhdEFuZFN0cmlwOmZ1bmN0aW9uKHQpe3JldHVybiBPKGEodGhpcy5ncm91cFZhbHVlcyx0aGlzLmdyb3VwTGFiZWwpLHUpKHQpfSx1cGRhdGVTZWFyY2g6ZnVuY3Rpb24odCl7dGhpcy5zZWFyY2g9dH0saXNFeGlzdGluZ09wdGlvbjpmdW5jdGlvbih0KXtyZXR1cm4hIXRoaXMub3B0aW9ucyYmdGhpcy5vcHRpb25LZXlzLmluZGV4T2YodCk+LTF9LGlzU2VsZWN0ZWQ6ZnVuY3Rpb24odCl7dmFyIGU9dGhpcy50cmFja0J5P3RbdGhpcy50cmFja0J5XTp0O3JldHVybiB0aGlzLnZhbHVlS2V5cy5pbmRleE9mKGUpPi0xfSxnZXRPcHRpb25MYWJlbDpmdW5jdGlvbih0KXtpZihpKHQpKXJldHVyblwiXCI7aWYodC5pc1RhZylyZXR1cm4gdC5sYWJlbDtpZih0LiRpc0xhYmVsKXJldHVybiB0LiRncm91cExhYmVsO3ZhciBlPXRoaXMuY3VzdG9tTGFiZWwodCx0aGlzLmxhYmVsKTtyZXR1cm4gaShlKT9cIlwiOmV9LHNlbGVjdDpmdW5jdGlvbih0LGUpe2lmKHQuJGlzTGFiZWwmJnRoaXMuZ3JvdXBTZWxlY3QpcmV0dXJuIHZvaWQgdGhpcy5zZWxlY3RHcm91cCh0KTtpZighKC0xIT09dGhpcy5ibG9ja0tleXMuaW5kZXhPZihlKXx8dGhpcy5kaXNhYmxlZHx8dC4kaXNEaXNhYmxlZHx8dC4kaXNMYWJlbCkmJighdGhpcy5tYXh8fCF0aGlzLm11bHRpcGxlfHx0aGlzLmludGVybmFsVmFsdWUubGVuZ3RoIT09dGhpcy5tYXgpJiYoXCJUYWJcIiE9PWV8fHRoaXMucG9pbnRlckRpcnR5KSl7aWYodC5pc1RhZyl0aGlzLiRlbWl0KFwidGFnXCIsdC5sYWJlbCx0aGlzLmlkKSx0aGlzLnNlYXJjaD1cIlwiLHRoaXMuY2xvc2VPblNlbGVjdCYmIXRoaXMubXVsdGlwbGUmJnRoaXMuZGVhY3RpdmF0ZSgpO2Vsc2V7aWYodGhpcy5pc1NlbGVjdGVkKHQpKXJldHVybiB2b2lkKFwiVGFiXCIhPT1lJiZ0aGlzLnJlbW92ZUVsZW1lbnQodCkpO3RoaXMuJGVtaXQoXCJzZWxlY3RcIix0LHRoaXMuaWQpLHRoaXMubXVsdGlwbGU/dGhpcy4kZW1pdChcImlucHV0XCIsdGhpcy5pbnRlcm5hbFZhbHVlLmNvbmNhdChbdF0pLHRoaXMuaWQpOnRoaXMuJGVtaXQoXCJpbnB1dFwiLHQsdGhpcy5pZCksdGhpcy5jbGVhck9uU2VsZWN0JiYodGhpcy5zZWFyY2g9XCJcIil9dGhpcy5jbG9zZU9uU2VsZWN0JiZ0aGlzLmRlYWN0aXZhdGUoKX19LHNlbGVjdEdyb3VwOmZ1bmN0aW9uKHQpe3ZhciBlPXRoaXMsbj10aGlzLm9wdGlvbnMuZmluZChmdW5jdGlvbihuKXtyZXR1cm4gbltlLmdyb3VwTGFiZWxdPT09dC4kZ3JvdXBMYWJlbH0pO2lmKG4paWYodGhpcy53aG9sZUdyb3VwU2VsZWN0ZWQobikpe3RoaXMuJGVtaXQoXCJyZW1vdmVcIixuW3RoaXMuZ3JvdXBWYWx1ZXNdLHRoaXMuaWQpO3ZhciBpPXRoaXMuaW50ZXJuYWxWYWx1ZS5maWx0ZXIoZnVuY3Rpb24odCl7cmV0dXJuLTE9PT1uW2UuZ3JvdXBWYWx1ZXNdLmluZGV4T2YodCl9KTt0aGlzLiRlbWl0KFwiaW5wdXRcIixpLHRoaXMuaWQpfWVsc2V7dmFyIG89blt0aGlzLmdyb3VwVmFsdWVzXS5maWx0ZXIocih0aGlzLmlzU2VsZWN0ZWQpKTt0aGlzLiRlbWl0KFwic2VsZWN0XCIsbyx0aGlzLmlkKSx0aGlzLiRlbWl0KFwiaW5wdXRcIix0aGlzLmludGVybmFsVmFsdWUuY29uY2F0KG8pLHRoaXMuaWQpfX0sd2hvbGVHcm91cFNlbGVjdGVkOmZ1bmN0aW9uKHQpe3JldHVybiB0W3RoaXMuZ3JvdXBWYWx1ZXNdLmV2ZXJ5KHRoaXMuaXNTZWxlY3RlZCl9LHJlbW92ZUVsZW1lbnQ6ZnVuY3Rpb24odCl7dmFyIGU9IShhcmd1bWVudHMubGVuZ3RoPjEmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXSl8fGFyZ3VtZW50c1sxXTtpZighdGhpcy5kaXNhYmxlZCl7aWYoIXRoaXMuYWxsb3dFbXB0eSYmdGhpcy5pbnRlcm5hbFZhbHVlLmxlbmd0aDw9MSlyZXR1cm4gdm9pZCB0aGlzLmRlYWN0aXZhdGUoKTt2YXIgaT1cIm9iamVjdFwiPT09bi5pKGMuYSkodCk/dGhpcy52YWx1ZUtleXMuaW5kZXhPZih0W3RoaXMudHJhY2tCeV0pOnRoaXMudmFsdWVLZXlzLmluZGV4T2YodCk7aWYodGhpcy4kZW1pdChcInJlbW92ZVwiLHQsdGhpcy5pZCksdGhpcy5tdWx0aXBsZSl7dmFyIHI9dGhpcy5pbnRlcm5hbFZhbHVlLnNsaWNlKDAsaSkuY29uY2F0KHRoaXMuaW50ZXJuYWxWYWx1ZS5zbGljZShpKzEpKTt0aGlzLiRlbWl0KFwiaW5wdXRcIixyLHRoaXMuaWQpfWVsc2UgdGhpcy4kZW1pdChcImlucHV0XCIsbnVsbCx0aGlzLmlkKTt0aGlzLmNsb3NlT25TZWxlY3QmJmUmJnRoaXMuZGVhY3RpdmF0ZSgpfX0scmVtb3ZlTGFzdEVsZW1lbnQ6ZnVuY3Rpb24oKXstMT09PXRoaXMuYmxvY2tLZXlzLmluZGV4T2YoXCJEZWxldGVcIikmJjA9PT10aGlzLnNlYXJjaC5sZW5ndGgmJkFycmF5LmlzQXJyYXkodGhpcy5pbnRlcm5hbFZhbHVlKSYmdGhpcy5yZW1vdmVFbGVtZW50KHRoaXMuaW50ZXJuYWxWYWx1ZVt0aGlzLmludGVybmFsVmFsdWUubGVuZ3RoLTFdLCExKX0sYWN0aXZhdGU6ZnVuY3Rpb24oKXt2YXIgdD10aGlzO3RoaXMuaXNPcGVufHx0aGlzLmRpc2FibGVkfHwodGhpcy5hZGp1c3RQb3NpdGlvbigpLHRoaXMuZ3JvdXBWYWx1ZXMmJjA9PT10aGlzLnBvaW50ZXImJnRoaXMuZmlsdGVyZWRPcHRpb25zLmxlbmd0aCYmKHRoaXMucG9pbnRlcj0xKSx0aGlzLmlzT3Blbj0hMCx0aGlzLnNlYXJjaGFibGU/KHRoaXMucHJlc2VydmVTZWFyY2h8fCh0aGlzLnNlYXJjaD1cIlwiKSx0aGlzLiRuZXh0VGljayhmdW5jdGlvbigpe3JldHVybiB0LiRyZWZzLnNlYXJjaC5mb2N1cygpfSkpOnRoaXMuJGVsLmZvY3VzKCksdGhpcy4kZW1pdChcIm9wZW5cIix0aGlzLmlkKSl9LGRlYWN0aXZhdGU6ZnVuY3Rpb24oKXt0aGlzLmlzT3BlbiYmKHRoaXMuaXNPcGVuPSExLHRoaXMuc2VhcmNoYWJsZT90aGlzLiRyZWZzLnNlYXJjaC5ibHVyKCk6dGhpcy4kZWwuYmx1cigpLHRoaXMucHJlc2VydmVTZWFyY2h8fCh0aGlzLnNlYXJjaD1cIlwiKSx0aGlzLiRlbWl0KFwiY2xvc2VcIix0aGlzLmdldFZhbHVlKCksdGhpcy5pZCkpfSx0b2dnbGU6ZnVuY3Rpb24oKXt0aGlzLmlzT3Blbj90aGlzLmRlYWN0aXZhdGUoKTp0aGlzLmFjdGl2YXRlKCl9LGFkanVzdFBvc2l0aW9uOmZ1bmN0aW9uKCl7aWYoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyl7dmFyIHQ9dGhpcy4kZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wLGU9d2luZG93LmlubmVySGVpZ2h0LXRoaXMuJGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmJvdHRvbTtlPnRoaXMubWF4SGVpZ2h0fHxlPnR8fFwiYmVsb3dcIj09PXRoaXMub3BlbkRpcmVjdGlvbnx8XCJib3R0b21cIj09PXRoaXMub3BlbkRpcmVjdGlvbj8odGhpcy5wcmVmZmVyZWRPcGVuRGlyZWN0aW9uPVwiYmVsb3dcIix0aGlzLm9wdGltaXplZEhlaWdodD1NYXRoLm1pbihlLTQwLHRoaXMubWF4SGVpZ2h0KSk6KHRoaXMucHJlZmZlcmVkT3BlbkRpcmVjdGlvbj1cImFib3ZlXCIsdGhpcy5vcHRpbWl6ZWRIZWlnaHQ9TWF0aC5taW4odC00MCx0aGlzLm1heEhlaWdodCkpfX19fX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO3ZhciBpPW4oNTQpLHI9KG4ubihpKSxuKDMxKSk7bi5uKHIpO2UuYT17ZGF0YTpmdW5jdGlvbigpe3JldHVybntwb2ludGVyOjAscG9pbnRlckRpcnR5OiExfX0scHJvcHM6e3Nob3dQb2ludGVyOnt0eXBlOkJvb2xlYW4sZGVmYXVsdDohMH0sb3B0aW9uSGVpZ2h0Ont0eXBlOk51bWJlcixkZWZhdWx0OjQwfX0sY29tcHV0ZWQ6e3BvaW50ZXJQb3NpdGlvbjpmdW5jdGlvbigpe3JldHVybiB0aGlzLnBvaW50ZXIqdGhpcy5vcHRpb25IZWlnaHR9LHZpc2libGVFbGVtZW50czpmdW5jdGlvbigpe3JldHVybiB0aGlzLm9wdGltaXplZEhlaWdodC90aGlzLm9wdGlvbkhlaWdodH19LHdhdGNoOntmaWx0ZXJlZE9wdGlvbnM6ZnVuY3Rpb24oKXt0aGlzLnBvaW50ZXJBZGp1c3QoKX0saXNPcGVuOmZ1bmN0aW9uKCl7dGhpcy5wb2ludGVyRGlydHk9ITF9fSxtZXRob2RzOntvcHRpb25IaWdobGlnaHQ6ZnVuY3Rpb24odCxlKXtyZXR1cm57XCJtdWx0aXNlbGVjdF9fb3B0aW9uLS1oaWdobGlnaHRcIjp0PT09dGhpcy5wb2ludGVyJiZ0aGlzLnNob3dQb2ludGVyLFwibXVsdGlzZWxlY3RfX29wdGlvbi0tc2VsZWN0ZWRcIjp0aGlzLmlzU2VsZWN0ZWQoZSl9fSxncm91cEhpZ2hsaWdodDpmdW5jdGlvbih0LGUpe3ZhciBuPXRoaXM7aWYoIXRoaXMuZ3JvdXBTZWxlY3QpcmV0dXJuW1wibXVsdGlzZWxlY3RfX29wdGlvbi0tZ3JvdXBcIixcIm11bHRpc2VsZWN0X19vcHRpb24tLWRpc2FibGVkXCJdO3ZhciBpPXRoaXMub3B0aW9ucy5maW5kKGZ1bmN0aW9uKHQpe3JldHVybiB0W24uZ3JvdXBMYWJlbF09PT1lLiRncm91cExhYmVsfSk7cmV0dXJuW1wibXVsdGlzZWxlY3RfX29wdGlvbi0tZ3JvdXBcIix7XCJtdWx0aXNlbGVjdF9fb3B0aW9uLS1oaWdobGlnaHRcIjp0PT09dGhpcy5wb2ludGVyJiZ0aGlzLnNob3dQb2ludGVyfSx7XCJtdWx0aXNlbGVjdF9fb3B0aW9uLS1ncm91cC1zZWxlY3RlZFwiOnRoaXMud2hvbGVHcm91cFNlbGVjdGVkKGkpfV19LGFkZFBvaW50ZXJFbGVtZW50OmZ1bmN0aW9uKCl7dmFyIHQ9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0/YXJndW1lbnRzWzBdOlwiRW50ZXJcIixlPXQua2V5O3RoaXMuZmlsdGVyZWRPcHRpb25zLmxlbmd0aD4wJiZ0aGlzLnNlbGVjdCh0aGlzLmZpbHRlcmVkT3B0aW9uc1t0aGlzLnBvaW50ZXJdLGUpLHRoaXMucG9pbnRlclJlc2V0KCl9LHBvaW50ZXJGb3J3YXJkOmZ1bmN0aW9uKCl7dGhpcy5wb2ludGVyPHRoaXMuZmlsdGVyZWRPcHRpb25zLmxlbmd0aC0xJiYodGhpcy5wb2ludGVyKyssdGhpcy4kcmVmcy5saXN0LnNjcm9sbFRvcDw9dGhpcy5wb2ludGVyUG9zaXRpb24tKHRoaXMudmlzaWJsZUVsZW1lbnRzLTEpKnRoaXMub3B0aW9uSGVpZ2h0JiYodGhpcy4kcmVmcy5saXN0LnNjcm9sbFRvcD10aGlzLnBvaW50ZXJQb3NpdGlvbi0odGhpcy52aXNpYmxlRWxlbWVudHMtMSkqdGhpcy5vcHRpb25IZWlnaHQpLHRoaXMuZmlsdGVyZWRPcHRpb25zW3RoaXMucG9pbnRlcl0mJnRoaXMuZmlsdGVyZWRPcHRpb25zW3RoaXMucG9pbnRlcl0uJGlzTGFiZWwmJiF0aGlzLmdyb3VwU2VsZWN0JiZ0aGlzLnBvaW50ZXJGb3J3YXJkKCkpLHRoaXMucG9pbnRlckRpcnR5PSEwfSxwb2ludGVyQmFja3dhcmQ6ZnVuY3Rpb24oKXt0aGlzLnBvaW50ZXI+MD8odGhpcy5wb2ludGVyLS0sdGhpcy4kcmVmcy5saXN0LnNjcm9sbFRvcD49dGhpcy5wb2ludGVyUG9zaXRpb24mJih0aGlzLiRyZWZzLmxpc3Quc2Nyb2xsVG9wPXRoaXMucG9pbnRlclBvc2l0aW9uKSx0aGlzLmZpbHRlcmVkT3B0aW9uc1t0aGlzLnBvaW50ZXJdJiZ0aGlzLmZpbHRlcmVkT3B0aW9uc1t0aGlzLnBvaW50ZXJdLiRpc0xhYmVsJiYhdGhpcy5ncm91cFNlbGVjdCYmdGhpcy5wb2ludGVyQmFja3dhcmQoKSk6dGhpcy5maWx0ZXJlZE9wdGlvbnNbdGhpcy5wb2ludGVyXSYmdGhpcy5maWx0ZXJlZE9wdGlvbnNbMF0uJGlzTGFiZWwmJiF0aGlzLmdyb3VwU2VsZWN0JiZ0aGlzLnBvaW50ZXJGb3J3YXJkKCksdGhpcy5wb2ludGVyRGlydHk9ITB9LHBvaW50ZXJSZXNldDpmdW5jdGlvbigpe3RoaXMuY2xvc2VPblNlbGVjdCYmKHRoaXMucG9pbnRlcj0wLHRoaXMuJHJlZnMubGlzdCYmKHRoaXMuJHJlZnMubGlzdC5zY3JvbGxUb3A9MCkpfSxwb2ludGVyQWRqdXN0OmZ1bmN0aW9uKCl7dGhpcy5wb2ludGVyPj10aGlzLmZpbHRlcmVkT3B0aW9ucy5sZW5ndGgtMSYmKHRoaXMucG9pbnRlcj10aGlzLmZpbHRlcmVkT3B0aW9ucy5sZW5ndGg/dGhpcy5maWx0ZXJlZE9wdGlvbnMubGVuZ3RoLTE6MCksdGhpcy5maWx0ZXJlZE9wdGlvbnMubGVuZ3RoPjAmJnRoaXMuZmlsdGVyZWRPcHRpb25zW3RoaXMucG9pbnRlcl0uJGlzTGFiZWwmJiF0aGlzLmdyb3VwU2VsZWN0JiZ0aGlzLnBvaW50ZXJGb3J3YXJkKCl9LHBvaW50ZXJTZXQ6ZnVuY3Rpb24odCl7dGhpcy5wb2ludGVyPXQsdGhpcy5wb2ludGVyRGlydHk9ITB9fX19LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjt2YXIgaT1uKDM2KSxyPW4oNzQpLG89bigxNSkscz1uKDE4KTt0LmV4cG9ydHM9big3MikoQXJyYXksXCJBcnJheVwiLGZ1bmN0aW9uKHQsZSl7dGhpcy5fdD1zKHQpLHRoaXMuX2k9MCx0aGlzLl9rPWV9LGZ1bmN0aW9uKCl7dmFyIHQ9dGhpcy5fdCxlPXRoaXMuX2ssbj10aGlzLl9pKys7cmV0dXJuIXR8fG4+PXQubGVuZ3RoPyh0aGlzLl90PXZvaWQgMCxyKDEpKTpcImtleXNcIj09ZT9yKDAsbik6XCJ2YWx1ZXNcIj09ZT9yKDAsdFtuXSk6cigwLFtuLHRbbl1dKX0sXCJ2YWx1ZXNcIiksby5Bcmd1bWVudHM9by5BcnJheSxpKFwia2V5c1wiKSxpKFwidmFsdWVzXCIpLGkoXCJlbnRyaWVzXCIpfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIGk9bigzMSkscj0obi5uKGkpLG4oMzIpKSxvPW4oMzMpO2UuYT17bmFtZTpcInZ1ZS1tdWx0aXNlbGVjdFwiLG1peGluczpbci5hLG8uYV0scHJvcHM6e25hbWU6e3R5cGU6U3RyaW5nLGRlZmF1bHQ6XCJcIn0sc2VsZWN0TGFiZWw6e3R5cGU6U3RyaW5nLGRlZmF1bHQ6XCJQcmVzcyBlbnRlciB0byBzZWxlY3RcIn0sc2VsZWN0R3JvdXBMYWJlbDp7dHlwZTpTdHJpbmcsZGVmYXVsdDpcIlByZXNzIGVudGVyIHRvIHNlbGVjdCBncm91cFwifSxzZWxlY3RlZExhYmVsOnt0eXBlOlN0cmluZyxkZWZhdWx0OlwiU2VsZWN0ZWRcIn0sZGVzZWxlY3RMYWJlbDp7dHlwZTpTdHJpbmcsZGVmYXVsdDpcIlByZXNzIGVudGVyIHRvIHJlbW92ZVwifSxkZXNlbGVjdEdyb3VwTGFiZWw6e3R5cGU6U3RyaW5nLGRlZmF1bHQ6XCJQcmVzcyBlbnRlciB0byBkZXNlbGVjdCBncm91cFwifSxzaG93TGFiZWxzOnt0eXBlOkJvb2xlYW4sZGVmYXVsdDohMH0sbGltaXQ6e3R5cGU6TnVtYmVyLGRlZmF1bHQ6OTk5OTl9LG1heEhlaWdodDp7dHlwZTpOdW1iZXIsZGVmYXVsdDozMDB9LGxpbWl0VGV4dDp7dHlwZTpGdW5jdGlvbixkZWZhdWx0OmZ1bmN0aW9uKHQpe3JldHVyblwiYW5kIFwiLmNvbmNhdCh0LFwiIG1vcmVcIil9fSxsb2FkaW5nOnt0eXBlOkJvb2xlYW4sZGVmYXVsdDohMX0sZGlzYWJsZWQ6e3R5cGU6Qm9vbGVhbixkZWZhdWx0OiExfSxvcGVuRGlyZWN0aW9uOnt0eXBlOlN0cmluZyxkZWZhdWx0OlwiXCJ9LHNob3dOb09wdGlvbnM6e3R5cGU6Qm9vbGVhbixkZWZhdWx0OiEwfSxzaG93Tm9SZXN1bHRzOnt0eXBlOkJvb2xlYW4sZGVmYXVsdDohMH0sdGFiaW5kZXg6e3R5cGU6TnVtYmVyLGRlZmF1bHQ6MH19LGNvbXB1dGVkOntpc1NpbmdsZUxhYmVsVmlzaWJsZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLnNpbmdsZVZhbHVlJiYoIXRoaXMuaXNPcGVufHwhdGhpcy5zZWFyY2hhYmxlKSYmIXRoaXMudmlzaWJsZVZhbHVlcy5sZW5ndGh9LGlzUGxhY2Vob2xkZXJWaXNpYmxlOmZ1bmN0aW9uKCl7cmV0dXJuISh0aGlzLmludGVybmFsVmFsdWUubGVuZ3RofHx0aGlzLnNlYXJjaGFibGUmJnRoaXMuaXNPcGVuKX0sdmlzaWJsZVZhbHVlczpmdW5jdGlvbigpe3JldHVybiB0aGlzLm11bHRpcGxlP3RoaXMuaW50ZXJuYWxWYWx1ZS5zbGljZSgwLHRoaXMubGltaXQpOltdfSxzaW5nbGVWYWx1ZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLmludGVybmFsVmFsdWVbMF19LGRlc2VsZWN0TGFiZWxUZXh0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuc2hvd0xhYmVscz90aGlzLmRlc2VsZWN0TGFiZWw6XCJcIn0sZGVzZWxlY3RHcm91cExhYmVsVGV4dDpmdW5jdGlvbigpe3JldHVybiB0aGlzLnNob3dMYWJlbHM/dGhpcy5kZXNlbGVjdEdyb3VwTGFiZWw6XCJcIn0sc2VsZWN0TGFiZWxUZXh0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuc2hvd0xhYmVscz90aGlzLnNlbGVjdExhYmVsOlwiXCJ9LHNlbGVjdEdyb3VwTGFiZWxUZXh0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuc2hvd0xhYmVscz90aGlzLnNlbGVjdEdyb3VwTGFiZWw6XCJcIn0sc2VsZWN0ZWRMYWJlbFRleHQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5zaG93TGFiZWxzP3RoaXMuc2VsZWN0ZWRMYWJlbDpcIlwifSxpbnB1dFN0eWxlOmZ1bmN0aW9uKCl7aWYodGhpcy5zZWFyY2hhYmxlfHx0aGlzLm11bHRpcGxlJiZ0aGlzLnZhbHVlJiZ0aGlzLnZhbHVlLmxlbmd0aClyZXR1cm4gdGhpcy5pc09wZW4/e3dpZHRoOlwiYXV0b1wifTp7d2lkdGg6XCIwXCIscG9zaXRpb246XCJhYnNvbHV0ZVwiLHBhZGRpbmc6XCIwXCJ9fSxjb250ZW50U3R5bGU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5vcHRpb25zLmxlbmd0aD97ZGlzcGxheTpcImlubGluZS1ibG9ja1wifTp7ZGlzcGxheTpcImJsb2NrXCJ9fSxpc0Fib3ZlOmZ1bmN0aW9uKCl7cmV0dXJuXCJhYm92ZVwiPT09dGhpcy5vcGVuRGlyZWN0aW9ufHxcInRvcFwiPT09dGhpcy5vcGVuRGlyZWN0aW9ufHxcImJlbG93XCIhPT10aGlzLm9wZW5EaXJlY3Rpb24mJlwiYm90dG9tXCIhPT10aGlzLm9wZW5EaXJlY3Rpb24mJlwiYWJvdmVcIj09PXRoaXMucHJlZmZlcmVkT3BlbkRpcmVjdGlvbn0sc2hvd1NlYXJjaElucHV0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuc2VhcmNoYWJsZSYmKCF0aGlzLmhhc1NpbmdsZVNlbGVjdGVkU2xvdHx8IXRoaXMudmlzaWJsZVNpbmdsZVZhbHVlJiYwIT09dGhpcy52aXNpYmxlU2luZ2xlVmFsdWV8fHRoaXMuaXNPcGVuKX19fX0sZnVuY3Rpb24odCxlLG4pe3ZhciBpPW4oMSkoXCJ1bnNjb3BhYmxlc1wiKSxyPUFycmF5LnByb3RvdHlwZTt2b2lkIDA9PXJbaV0mJm4oOCkocixpLHt9KSx0LmV4cG9ydHM9ZnVuY3Rpb24odCl7cltpXVt0XT0hMH19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgaT1uKDE4KSxyPW4oMTkpLG89big4NSk7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiBmdW5jdGlvbihlLG4scyl7dmFyIHUsYT1pKGUpLGw9cihhLmxlbmd0aCksYz1vKHMsbCk7aWYodCYmbiE9bil7Zm9yKDtsPmM7KWlmKCh1PWFbYysrXSkhPXUpcmV0dXJuITB9ZWxzZSBmb3IoO2w+YztjKyspaWYoKHR8fGMgaW4gYSkmJmFbY109PT1uKXJldHVybiB0fHxjfHwwO3JldHVybiF0JiYtMX19fSxmdW5jdGlvbih0LGUsbil7dmFyIGk9big5KSxyPW4oMSkoXCJ0b1N0cmluZ1RhZ1wiKSxvPVwiQXJndW1lbnRzXCI9PWkoZnVuY3Rpb24oKXtyZXR1cm4gYXJndW1lbnRzfSgpKSxzPWZ1bmN0aW9uKHQsZSl7dHJ5e3JldHVybiB0W2VdfWNhdGNoKHQpe319O3QuZXhwb3J0cz1mdW5jdGlvbih0KXt2YXIgZSxuLHU7cmV0dXJuIHZvaWQgMD09PXQ/XCJVbmRlZmluZWRcIjpudWxsPT09dD9cIk51bGxcIjpcInN0cmluZ1wiPT10eXBlb2Yobj1zKGU9T2JqZWN0KHQpLHIpKT9uOm8/aShlKTpcIk9iamVjdFwiPT0odT1pKGUpKSYmXCJmdW5jdGlvblwiPT10eXBlb2YgZS5jYWxsZWU/XCJBcmd1bWVudHNcIjp1fX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO3ZhciBpPW4oMik7dC5leHBvcnRzPWZ1bmN0aW9uKCl7dmFyIHQ9aSh0aGlzKSxlPVwiXCI7cmV0dXJuIHQuZ2xvYmFsJiYoZSs9XCJnXCIpLHQuaWdub3JlQ2FzZSYmKGUrPVwiaVwiKSx0Lm11bHRpbGluZSYmKGUrPVwibVwiKSx0LnVuaWNvZGUmJihlKz1cInVcIiksdC5zdGlja3kmJihlKz1cInlcIiksZX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgaT1uKDApLmRvY3VtZW50O3QuZXhwb3J0cz1pJiZpLmRvY3VtZW50RWxlbWVudH0sZnVuY3Rpb24odCxlLG4pe3QuZXhwb3J0cz0hbig0KSYmIW4oNykoZnVuY3Rpb24oKXtyZXR1cm4gNyE9T2JqZWN0LmRlZmluZVByb3BlcnR5KG4oMjEpKFwiZGl2XCIpLFwiYVwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gN319KS5hfSl9LGZ1bmN0aW9uKHQsZSxuKXt2YXIgaT1uKDkpO3QuZXhwb3J0cz1BcnJheS5pc0FycmF5fHxmdW5jdGlvbih0KXtyZXR1cm5cIkFycmF5XCI9PWkodCl9fSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gaSh0KXt2YXIgZSxuO3RoaXMucHJvbWlzZT1uZXcgdChmdW5jdGlvbih0LGkpe2lmKHZvaWQgMCE9PWV8fHZvaWQgMCE9PW4pdGhyb3cgVHlwZUVycm9yKFwiQmFkIFByb21pc2UgY29uc3RydWN0b3JcIik7ZT10LG49aX0pLHRoaXMucmVzb2x2ZT1yKGUpLHRoaXMucmVqZWN0PXIobil9dmFyIHI9bigxNCk7dC5leHBvcnRzLmY9ZnVuY3Rpb24odCl7cmV0dXJuIG5ldyBpKHQpfX0sZnVuY3Rpb24odCxlLG4pe3ZhciBpPW4oMikscj1uKDc2KSxvPW4oMjIpLHM9bigyNykoXCJJRV9QUk9UT1wiKSx1PWZ1bmN0aW9uKCl7fSxhPWZ1bmN0aW9uKCl7dmFyIHQsZT1uKDIxKShcImlmcmFtZVwiKSxpPW8ubGVuZ3RoO2ZvcihlLnN0eWxlLmRpc3BsYXk9XCJub25lXCIsbig0MCkuYXBwZW5kQ2hpbGQoZSksZS5zcmM9XCJqYXZhc2NyaXB0OlwiLHQ9ZS5jb250ZW50V2luZG93LmRvY3VtZW50LHQub3BlbigpLHQud3JpdGUoXCI8c2NyaXB0PmRvY3VtZW50LkY9T2JqZWN0PFxcL3NjcmlwdD5cIiksdC5jbG9zZSgpLGE9dC5GO2ktLTspZGVsZXRlIGEucHJvdG90eXBlW29baV1dO3JldHVybiBhKCl9O3QuZXhwb3J0cz1PYmplY3QuY3JlYXRlfHxmdW5jdGlvbih0LGUpe3ZhciBuO3JldHVybiBudWxsIT09dD8odS5wcm90b3R5cGU9aSh0KSxuPW5ldyB1LHUucHJvdG90eXBlPW51bGwsbltzXT10KTpuPWEoKSx2b2lkIDA9PT1lP246cihuLGUpfX0sZnVuY3Rpb24odCxlLG4pe3ZhciBpPW4oNzkpLHI9bigyNSksbz1uKDE4KSxzPW4oMjkpLHU9bigxMiksYT1uKDQxKSxsPU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7ZS5mPW4oNCk/bDpmdW5jdGlvbih0LGUpe2lmKHQ9byh0KSxlPXMoZSwhMCksYSl0cnl7cmV0dXJuIGwodCxlKX1jYXRjaCh0KXt9aWYodSh0LGUpKXJldHVybiByKCFpLmYuY2FsbCh0LGUpLHRbZV0pfX0sZnVuY3Rpb24odCxlLG4pe3ZhciBpPW4oMTIpLHI9bigxOCksbz1uKDM3KSghMSkscz1uKDI3KShcIklFX1BST1RPXCIpO3QuZXhwb3J0cz1mdW5jdGlvbih0LGUpe3ZhciBuLHU9cih0KSxhPTAsbD1bXTtmb3IobiBpbiB1KW4hPXMmJmkodSxuKSYmbC5wdXNoKG4pO2Zvcig7ZS5sZW5ndGg+YTspaSh1LG49ZVthKytdKSYmKH5vKGwsbil8fGwucHVzaChuKSk7cmV0dXJuIGx9fSxmdW5jdGlvbih0LGUsbil7dmFyIGk9big0Nikscj1uKDIyKTt0LmV4cG9ydHM9T2JqZWN0LmtleXN8fGZ1bmN0aW9uKHQpe3JldHVybiBpKHQscil9fSxmdW5jdGlvbih0LGUsbil7dmFyIGk9bigyKSxyPW4oNSksbz1uKDQzKTt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlKXtpZihpKHQpLHIoZSkmJmUuY29uc3RydWN0b3I9PT10KXJldHVybiBlO3ZhciBuPW8uZih0KTtyZXR1cm4oMCxuLnJlc29sdmUpKGUpLG4ucHJvbWlzZX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgaT1uKDEwKSxyPW4oMCksbz1yW1wiX19jb3JlLWpzX3NoYXJlZF9fXCJdfHwocltcIl9fY29yZS1qc19zaGFyZWRfX1wiXT17fSk7KHQuZXhwb3J0cz1mdW5jdGlvbih0LGUpe3JldHVybiBvW3RdfHwob1t0XT12b2lkIDAhPT1lP2U6e30pfSkoXCJ2ZXJzaW9uc1wiLFtdKS5wdXNoKHt2ZXJzaW9uOmkudmVyc2lvbixtb2RlOm4oMjQpP1wicHVyZVwiOlwiZ2xvYmFsXCIsY29weXJpZ2h0OlwiwqkgMjAxOCBEZW5pcyBQdXNoa2FyZXYgKHpsb2lyb2NrLnJ1KVwifSl9LGZ1bmN0aW9uKHQsZSxuKXt2YXIgaT1uKDIpLHI9bigxNCksbz1uKDEpKFwic3BlY2llc1wiKTt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlKXt2YXIgbixzPWkodCkuY29uc3RydWN0b3I7cmV0dXJuIHZvaWQgMD09PXN8fHZvaWQgMD09KG49aShzKVtvXSk/ZTpyKG4pfX0sZnVuY3Rpb24odCxlLG4pe3ZhciBpPW4oMykscj1uKDE2KSxvPW4oNykscz1uKDg0KSx1PVwiW1wiK3MrXCJdXCIsYT1cIuKAi8KFXCIsbD1SZWdFeHAoXCJeXCIrdSt1K1wiKlwiKSxjPVJlZ0V4cCh1K3UrXCIqJFwiKSxmPWZ1bmN0aW9uKHQsZSxuKXt2YXIgcj17fSx1PW8oZnVuY3Rpb24oKXtyZXR1cm4hIXNbdF0oKXx8YVt0XSgpIT1hfSksbD1yW3RdPXU/ZShwKTpzW3RdO24mJihyW25dPWwpLGkoaS5QK2kuRip1LFwiU3RyaW5nXCIscil9LHA9Zi50cmltPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIHQ9U3RyaW5nKHIodCkpLDEmZSYmKHQ9dC5yZXBsYWNlKGwsXCJcIikpLDImZSYmKHQ9dC5yZXBsYWNlKGMsXCJcIikpLHR9O3QuZXhwb3J0cz1mfSxmdW5jdGlvbih0LGUsbil7dmFyIGkscixvLHM9bigxMSksdT1uKDY4KSxhPW4oNDApLGw9bigyMSksYz1uKDApLGY9Yy5wcm9jZXNzLHA9Yy5zZXRJbW1lZGlhdGUsaD1jLmNsZWFySW1tZWRpYXRlLGQ9Yy5NZXNzYWdlQ2hhbm5lbCx2PWMuRGlzcGF0Y2gsZz0wLG09e30seT1mdW5jdGlvbigpe3ZhciB0PSt0aGlzO2lmKG0uaGFzT3duUHJvcGVydHkodCkpe3ZhciBlPW1bdF07ZGVsZXRlIG1bdF0sZSgpfX0sYj1mdW5jdGlvbih0KXt5LmNhbGwodC5kYXRhKX07cCYmaHx8KHA9ZnVuY3Rpb24odCl7Zm9yKHZhciBlPVtdLG49MTthcmd1bWVudHMubGVuZ3RoPm47KWUucHVzaChhcmd1bWVudHNbbisrXSk7cmV0dXJuIG1bKytnXT1mdW5jdGlvbigpe3UoXCJmdW5jdGlvblwiPT10eXBlb2YgdD90OkZ1bmN0aW9uKHQpLGUpfSxpKGcpLGd9LGg9ZnVuY3Rpb24odCl7ZGVsZXRlIG1bdF19LFwicHJvY2Vzc1wiPT1uKDkpKGYpP2k9ZnVuY3Rpb24odCl7Zi5uZXh0VGljayhzKHksdCwxKSl9OnYmJnYubm93P2k9ZnVuY3Rpb24odCl7di5ub3cocyh5LHQsMSkpfTpkPyhyPW5ldyBkLG89ci5wb3J0MixyLnBvcnQxLm9ubWVzc2FnZT1iLGk9cyhvLnBvc3RNZXNzYWdlLG8sMSkpOmMuYWRkRXZlbnRMaXN0ZW5lciYmXCJmdW5jdGlvblwiPT10eXBlb2YgcG9zdE1lc3NhZ2UmJiFjLmltcG9ydFNjcmlwdHM/KGk9ZnVuY3Rpb24odCl7Yy5wb3N0TWVzc2FnZSh0K1wiXCIsXCIqXCIpfSxjLmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsYiwhMSkpOmk9XCJvbnJlYWR5c3RhdGVjaGFuZ2VcImluIGwoXCJzY3JpcHRcIik/ZnVuY3Rpb24odCl7YS5hcHBlbmRDaGlsZChsKFwic2NyaXB0XCIpKS5vbnJlYWR5c3RhdGVjaGFuZ2U9ZnVuY3Rpb24oKXthLnJlbW92ZUNoaWxkKHRoaXMpLHkuY2FsbCh0KX19OmZ1bmN0aW9uKHQpe3NldFRpbWVvdXQocyh5LHQsMSksMCl9KSx0LmV4cG9ydHM9e3NldDpwLGNsZWFyOmh9fSxmdW5jdGlvbih0LGUpe3ZhciBuPU1hdGguY2VpbCxpPU1hdGguZmxvb3I7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiBpc05hTih0PSt0KT8wOih0PjA/aTpuKSh0KX19LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjt2YXIgaT1uKDMpLHI9bigyMCkoNSksbz0hMDtcImZpbmRcImluW10mJkFycmF5KDEpLmZpbmQoZnVuY3Rpb24oKXtvPSExfSksaShpLlAraS5GKm8sXCJBcnJheVwiLHtmaW5kOmZ1bmN0aW9uKHQpe3JldHVybiByKHRoaXMsdCxhcmd1bWVudHMubGVuZ3RoPjE/YXJndW1lbnRzWzFdOnZvaWQgMCl9fSksbigzNikoXCJmaW5kXCIpfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIGkscixvLHMsdT1uKDI0KSxhPW4oMCksbD1uKDExKSxjPW4oMzgpLGY9bigzKSxwPW4oNSksaD1uKDE0KSxkPW4oNjEpLHY9big2NiksZz1uKDUwKSxtPW4oNTIpLnNldCx5PW4oNzUpKCksYj1uKDQzKSxfPW4oODApLHg9big4Niksdz1uKDQ4KSxTPWEuVHlwZUVycm9yLE89YS5wcm9jZXNzLEw9TyYmTy52ZXJzaW9ucyxQPUwmJkwudjh8fFwiXCIsaz1hLlByb21pc2UsVD1cInByb2Nlc3NcIj09YyhPKSxFPWZ1bmN0aW9uKCl7fSxWPXI9Yi5mLEE9ISFmdW5jdGlvbigpe3RyeXt2YXIgdD1rLnJlc29sdmUoMSksZT0odC5jb25zdHJ1Y3Rvcj17fSlbbigxKShcInNwZWNpZXNcIildPWZ1bmN0aW9uKHQpe3QoRSxFKX07cmV0dXJuKFR8fFwiZnVuY3Rpb25cIj09dHlwZW9mIFByb21pc2VSZWplY3Rpb25FdmVudCkmJnQudGhlbihFKWluc3RhbmNlb2YgZSYmMCE9PVAuaW5kZXhPZihcIjYuNlwiKSYmLTE9PT14LmluZGV4T2YoXCJDaHJvbWUvNjZcIil9Y2F0Y2godCl7fX0oKSxDPWZ1bmN0aW9uKHQpe3ZhciBlO3JldHVybiEoIXAodCl8fFwiZnVuY3Rpb25cIiE9dHlwZW9mKGU9dC50aGVuKSkmJmV9LGo9ZnVuY3Rpb24odCxlKXtpZighdC5fbil7dC5fbj0hMDt2YXIgbj10Ll9jO3koZnVuY3Rpb24oKXtmb3IodmFyIGk9dC5fdixyPTE9PXQuX3Msbz0wO24ubGVuZ3RoPm87KSFmdW5jdGlvbihlKXt2YXIgbixvLHMsdT1yP2Uub2s6ZS5mYWlsLGE9ZS5yZXNvbHZlLGw9ZS5yZWplY3QsYz1lLmRvbWFpbjt0cnl7dT8ocnx8KDI9PXQuX2gmJiQodCksdC5faD0xKSwhMD09PXU/bj1pOihjJiZjLmVudGVyKCksbj11KGkpLGMmJihjLmV4aXQoKSxzPSEwKSksbj09PWUucHJvbWlzZT9sKFMoXCJQcm9taXNlLWNoYWluIGN5Y2xlXCIpKToobz1DKG4pKT9vLmNhbGwobixhLGwpOmEobikpOmwoaSl9Y2F0Y2godCl7YyYmIXMmJmMuZXhpdCgpLGwodCl9fShuW28rK10pO3QuX2M9W10sdC5fbj0hMSxlJiYhdC5faCYmTih0KX0pfX0sTj1mdW5jdGlvbih0KXttLmNhbGwoYSxmdW5jdGlvbigpe3ZhciBlLG4saSxyPXQuX3Ysbz1EKHQpO2lmKG8mJihlPV8oZnVuY3Rpb24oKXtUP08uZW1pdChcInVuaGFuZGxlZFJlamVjdGlvblwiLHIsdCk6KG49YS5vbnVuaGFuZGxlZHJlamVjdGlvbik/bih7cHJvbWlzZTp0LHJlYXNvbjpyfSk6KGk9YS5jb25zb2xlKSYmaS5lcnJvciYmaS5lcnJvcihcIlVuaGFuZGxlZCBwcm9taXNlIHJlamVjdGlvblwiLHIpfSksdC5faD1UfHxEKHQpPzI6MSksdC5fYT12b2lkIDAsbyYmZS5lKXRocm93IGUudn0pfSxEPWZ1bmN0aW9uKHQpe3JldHVybiAxIT09dC5faCYmMD09PSh0Ll9hfHx0Ll9jKS5sZW5ndGh9LCQ9ZnVuY3Rpb24odCl7bS5jYWxsKGEsZnVuY3Rpb24oKXt2YXIgZTtUP08uZW1pdChcInJlamVjdGlvbkhhbmRsZWRcIix0KTooZT1hLm9ucmVqZWN0aW9uaGFuZGxlZCkmJmUoe3Byb21pc2U6dCxyZWFzb246dC5fdn0pfSl9LE09ZnVuY3Rpb24odCl7dmFyIGU9dGhpcztlLl9kfHwoZS5fZD0hMCxlPWUuX3d8fGUsZS5fdj10LGUuX3M9MixlLl9hfHwoZS5fYT1lLl9jLnNsaWNlKCkpLGooZSwhMCkpfSxGPWZ1bmN0aW9uKHQpe3ZhciBlLG49dGhpcztpZighbi5fZCl7bi5fZD0hMCxuPW4uX3d8fG47dHJ5e2lmKG49PT10KXRocm93IFMoXCJQcm9taXNlIGNhbid0IGJlIHJlc29sdmVkIGl0c2VsZlwiKTsoZT1DKHQpKT95KGZ1bmN0aW9uKCl7dmFyIGk9e193Om4sX2Q6ITF9O3RyeXtlLmNhbGwodCxsKEYsaSwxKSxsKE0saSwxKSl9Y2F0Y2godCl7TS5jYWxsKGksdCl9fSk6KG4uX3Y9dCxuLl9zPTEsaihuLCExKSl9Y2F0Y2godCl7TS5jYWxsKHtfdzpuLF9kOiExfSx0KX19fTtBfHwoaz1mdW5jdGlvbih0KXtkKHRoaXMsayxcIlByb21pc2VcIixcIl9oXCIpLGgodCksaS5jYWxsKHRoaXMpO3RyeXt0KGwoRix0aGlzLDEpLGwoTSx0aGlzLDEpKX1jYXRjaCh0KXtNLmNhbGwodGhpcyx0KX19LGk9ZnVuY3Rpb24odCl7dGhpcy5fYz1bXSx0aGlzLl9hPXZvaWQgMCx0aGlzLl9zPTAsdGhpcy5fZD0hMSx0aGlzLl92PXZvaWQgMCx0aGlzLl9oPTAsdGhpcy5fbj0hMX0saS5wcm90b3R5cGU9big4MSkoay5wcm90b3R5cGUse3RoZW46ZnVuY3Rpb24odCxlKXt2YXIgbj1WKGcodGhpcyxrKSk7cmV0dXJuIG4ub2s9XCJmdW5jdGlvblwiIT10eXBlb2YgdHx8dCxuLmZhaWw9XCJmdW5jdGlvblwiPT10eXBlb2YgZSYmZSxuLmRvbWFpbj1UP08uZG9tYWluOnZvaWQgMCx0aGlzLl9jLnB1c2gobiksdGhpcy5fYSYmdGhpcy5fYS5wdXNoKG4pLHRoaXMuX3MmJmoodGhpcywhMSksbi5wcm9taXNlfSxjYXRjaDpmdW5jdGlvbih0KXtyZXR1cm4gdGhpcy50aGVuKHZvaWQgMCx0KX19KSxvPWZ1bmN0aW9uKCl7dmFyIHQ9bmV3IGk7dGhpcy5wcm9taXNlPXQsdGhpcy5yZXNvbHZlPWwoRix0LDEpLHRoaXMucmVqZWN0PWwoTSx0LDEpfSxiLmY9Vj1mdW5jdGlvbih0KXtyZXR1cm4gdD09PWt8fHQ9PT1zP25ldyBvKHQpOnIodCl9KSxmKGYuRytmLlcrZi5GKiFBLHtQcm9taXNlOmt9KSxuKDI2KShrLFwiUHJvbWlzZVwiKSxuKDgzKShcIlByb21pc2VcIikscz1uKDEwKS5Qcm9taXNlLGYoZi5TK2YuRiohQSxcIlByb21pc2VcIix7cmVqZWN0OmZ1bmN0aW9uKHQpe3ZhciBlPVYodGhpcyk7cmV0dXJuKDAsZS5yZWplY3QpKHQpLGUucHJvbWlzZX19KSxmKGYuUytmLkYqKHV8fCFBKSxcIlByb21pc2VcIix7cmVzb2x2ZTpmdW5jdGlvbih0KXtyZXR1cm4gdyh1JiZ0aGlzPT09cz9rOnRoaXMsdCl9fSksZihmLlMrZi5GKiEoQSYmbig3MykoZnVuY3Rpb24odCl7ay5hbGwodCkuY2F0Y2goRSl9KSksXCJQcm9taXNlXCIse2FsbDpmdW5jdGlvbih0KXt2YXIgZT10aGlzLG49VihlKSxpPW4ucmVzb2x2ZSxyPW4ucmVqZWN0LG89XyhmdW5jdGlvbigpe3ZhciBuPVtdLG89MCxzPTE7dih0LCExLGZ1bmN0aW9uKHQpe3ZhciB1PW8rKyxhPSExO24ucHVzaCh2b2lkIDApLHMrKyxlLnJlc29sdmUodCkudGhlbihmdW5jdGlvbih0KXthfHwoYT0hMCxuW3VdPXQsLS1zfHxpKG4pKX0scil9KSwtLXN8fGkobil9KTtyZXR1cm4gby5lJiZyKG8udiksbi5wcm9taXNlfSxyYWNlOmZ1bmN0aW9uKHQpe3ZhciBlPXRoaXMsbj1WKGUpLGk9bi5yZWplY3Qscj1fKGZ1bmN0aW9uKCl7dih0LCExLGZ1bmN0aW9uKHQpe2UucmVzb2x2ZSh0KS50aGVuKG4ucmVzb2x2ZSxpKX0pfSk7cmV0dXJuIHIuZSYmaShyLnYpLG4ucHJvbWlzZX19KX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO3ZhciBpPW4oMykscj1uKDEwKSxvPW4oMCkscz1uKDUwKSx1PW4oNDgpO2koaS5QK2kuUixcIlByb21pc2VcIix7ZmluYWxseTpmdW5jdGlvbih0KXt2YXIgZT1zKHRoaXMsci5Qcm9taXNlfHxvLlByb21pc2UpLG49XCJmdW5jdGlvblwiPT10eXBlb2YgdDtyZXR1cm4gdGhpcy50aGVuKG4/ZnVuY3Rpb24obil7cmV0dXJuIHUoZSx0KCkpLnRoZW4oZnVuY3Rpb24oKXtyZXR1cm4gbn0pfTp0LG4/ZnVuY3Rpb24obil7cmV0dXJuIHUoZSx0KCkpLnRoZW4oZnVuY3Rpb24oKXt0aHJvdyBufSl9OnQpfX0pfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gaSh0KXtuKDk5KX12YXIgcj1uKDM1KSxvPW4oMTAxKSxzPW4oMTAwKSx1PWksYT1zKHIuYSxvLmEsITEsdSxudWxsLG51bGwpO2UuYT1hLmV4cG9ydHN9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBpKHQsZSxuKXtyZXR1cm4gZSBpbiB0P09iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LGUse3ZhbHVlOm4sZW51bWVyYWJsZTohMCxjb25maWd1cmFibGU6ITAsd3JpdGFibGU6ITB9KTp0W2VdPW4sdH1lLmE9aX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIGkodCl7cmV0dXJuKGk9XCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZcInN5bWJvbFwiPT10eXBlb2YgU3ltYm9sLml0ZXJhdG9yP2Z1bmN0aW9uKHQpe3JldHVybiB0eXBlb2YgdH06ZnVuY3Rpb24odCl7cmV0dXJuIHQmJlwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmdC5jb25zdHJ1Y3Rvcj09PVN5bWJvbCYmdCE9PVN5bWJvbC5wcm90b3R5cGU/XCJzeW1ib2xcIjp0eXBlb2YgdH0pKHQpfWZ1bmN0aW9uIHIodCl7cmV0dXJuKHI9XCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZcInN5bWJvbFwiPT09aShTeW1ib2wuaXRlcmF0b3IpP2Z1bmN0aW9uKHQpe3JldHVybiBpKHQpfTpmdW5jdGlvbih0KXtyZXR1cm4gdCYmXCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZ0LmNvbnN0cnVjdG9yPT09U3ltYm9sJiZ0IT09U3ltYm9sLnByb3RvdHlwZT9cInN5bWJvbFwiOmkodCl9KSh0KX1lLmE9cn0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBpPW4oMzQpLHI9KG4ubihpKSxuKDU1KSksbz0obi5uKHIpLG4oNTYpKSxzPShuLm4obyksbig1NykpLHU9bigzMiksYT1uKDMzKTtuLmQoZSxcIk11bHRpc2VsZWN0XCIsZnVuY3Rpb24oKXtyZXR1cm4gcy5hfSksbi5kKGUsXCJtdWx0aXNlbGVjdE1peGluXCIsZnVuY3Rpb24oKXtyZXR1cm4gdS5hfSksbi5kKGUsXCJwb2ludGVyTWl4aW5cIixmdW5jdGlvbigpe3JldHVybiBhLmF9KSxlLmRlZmF1bHQ9cy5hfSxmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz1mdW5jdGlvbih0LGUsbixpKXtpZighKHQgaW5zdGFuY2VvZiBlKXx8dm9pZCAwIT09aSYmaSBpbiB0KXRocm93IFR5cGVFcnJvcihuK1wiOiBpbmNvcnJlY3QgaW52b2NhdGlvbiFcIik7cmV0dXJuIHR9fSxmdW5jdGlvbih0LGUsbil7dmFyIGk9bigxNCkscj1uKDI4KSxvPW4oMjMpLHM9bigxOSk7dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSxuLHUsYSl7aShlKTt2YXIgbD1yKHQpLGM9byhsKSxmPXMobC5sZW5ndGgpLHA9YT9mLTE6MCxoPWE/LTE6MTtpZihuPDIpZm9yKDs7KXtpZihwIGluIGMpe3U9Y1twXSxwKz1oO2JyZWFrfWlmKHArPWgsYT9wPDA6Zjw9cCl0aHJvdyBUeXBlRXJyb3IoXCJSZWR1Y2Ugb2YgZW1wdHkgYXJyYXkgd2l0aCBubyBpbml0aWFsIHZhbHVlXCIpfWZvcig7YT9wPj0wOmY+cDtwKz1oKXAgaW4gYyYmKHU9ZSh1LGNbcF0scCxsKSk7cmV0dXJuIHV9fSxmdW5jdGlvbih0LGUsbil7dmFyIGk9big1KSxyPW4oNDIpLG89bigxKShcInNwZWNpZXNcIik7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3ZhciBlO3JldHVybiByKHQpJiYoZT10LmNvbnN0cnVjdG9yLFwiZnVuY3Rpb25cIiE9dHlwZW9mIGV8fGUhPT1BcnJheSYmIXIoZS5wcm90b3R5cGUpfHwoZT12b2lkIDApLGkoZSkmJm51bGw9PT0oZT1lW29dKSYmKGU9dm9pZCAwKSksdm9pZCAwPT09ZT9BcnJheTplfX0sZnVuY3Rpb24odCxlLG4pe3ZhciBpPW4oNjMpO3QuZXhwb3J0cz1mdW5jdGlvbih0LGUpe3JldHVybiBuZXcoaSh0KSkoZSl9fSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIGk9big4KSxyPW4oNiksbz1uKDcpLHM9bigxNiksdT1uKDEpO3QuZXhwb3J0cz1mdW5jdGlvbih0LGUsbil7dmFyIGE9dSh0KSxsPW4ocyxhLFwiXCJbdF0pLGM9bFswXSxmPWxbMV07byhmdW5jdGlvbigpe3ZhciBlPXt9O3JldHVybiBlW2FdPWZ1bmN0aW9uKCl7cmV0dXJuIDd9LDchPVwiXCJbdF0oZSl9KSYmKHIoU3RyaW5nLnByb3RvdHlwZSx0LGMpLGkoUmVnRXhwLnByb3RvdHlwZSxhLDI9PWU/ZnVuY3Rpb24odCxlKXtyZXR1cm4gZi5jYWxsKHQsdGhpcyxlKX06ZnVuY3Rpb24odCl7cmV0dXJuIGYuY2FsbCh0LHRoaXMpfSkpfX0sZnVuY3Rpb24odCxlLG4pe3ZhciBpPW4oMTEpLHI9big3MCksbz1uKDY5KSxzPW4oMiksdT1uKDE5KSxhPW4oODcpLGw9e30sYz17fSxlPXQuZXhwb3J0cz1mdW5jdGlvbih0LGUsbixmLHApe3ZhciBoLGQsdixnLG09cD9mdW5jdGlvbigpe3JldHVybiB0fTphKHQpLHk9aShuLGYsZT8yOjEpLGI9MDtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBtKXRocm93IFR5cGVFcnJvcih0K1wiIGlzIG5vdCBpdGVyYWJsZSFcIik7aWYobyhtKSl7Zm9yKGg9dSh0Lmxlbmd0aCk7aD5iO2IrKylpZigoZz1lP3kocyhkPXRbYl0pWzBdLGRbMV0pOnkodFtiXSkpPT09bHx8Zz09PWMpcmV0dXJuIGd9ZWxzZSBmb3Iodj1tLmNhbGwodCk7IShkPXYubmV4dCgpKS5kb25lOylpZigoZz1yKHYseSxkLnZhbHVlLGUpKT09PWx8fGc9PT1jKXJldHVybiBnfTtlLkJSRUFLPWwsZS5SRVRVUk49Y30sZnVuY3Rpb24odCxlLG4pe3ZhciBpPW4oNSkscj1uKDgyKS5zZXQ7dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSxuKXt2YXIgbyxzPWUuY29uc3RydWN0b3I7cmV0dXJuIHMhPT1uJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBzJiYobz1zLnByb3RvdHlwZSkhPT1uLnByb3RvdHlwZSYmaShvKSYmciYmcih0LG8pLHR9fSxmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz1mdW5jdGlvbih0LGUsbil7dmFyIGk9dm9pZCAwPT09bjtzd2l0Y2goZS5sZW5ndGgpe2Nhc2UgMDpyZXR1cm4gaT90KCk6dC5jYWxsKG4pO2Nhc2UgMTpyZXR1cm4gaT90KGVbMF0pOnQuY2FsbChuLGVbMF0pO2Nhc2UgMjpyZXR1cm4gaT90KGVbMF0sZVsxXSk6dC5jYWxsKG4sZVswXSxlWzFdKTtjYXNlIDM6cmV0dXJuIGk/dChlWzBdLGVbMV0sZVsyXSk6dC5jYWxsKG4sZVswXSxlWzFdLGVbMl0pO2Nhc2UgNDpyZXR1cm4gaT90KGVbMF0sZVsxXSxlWzJdLGVbM10pOnQuY2FsbChuLGVbMF0sZVsxXSxlWzJdLGVbM10pfXJldHVybiB0LmFwcGx5KG4sZSl9fSxmdW5jdGlvbih0LGUsbil7dmFyIGk9bigxNSkscj1uKDEpKFwiaXRlcmF0b3JcIiksbz1BcnJheS5wcm90b3R5cGU7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiB2b2lkIDAhPT10JiYoaS5BcnJheT09PXR8fG9bcl09PT10KX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgaT1uKDIpO3QuZXhwb3J0cz1mdW5jdGlvbih0LGUsbixyKXt0cnl7cmV0dXJuIHI/ZShpKG4pWzBdLG5bMV0pOmUobil9Y2F0Y2goZSl7dmFyIG89dC5yZXR1cm47dGhyb3cgdm9pZCAwIT09byYmaShvLmNhbGwodCkpLGV9fX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO3ZhciBpPW4oNDQpLHI9bigyNSksbz1uKDI2KSxzPXt9O24oOCkocyxuKDEpKFwiaXRlcmF0b3JcIiksZnVuY3Rpb24oKXtyZXR1cm4gdGhpc30pLHQuZXhwb3J0cz1mdW5jdGlvbih0LGUsbil7dC5wcm90b3R5cGU9aShzLHtuZXh0OnIoMSxuKX0pLG8odCxlK1wiIEl0ZXJhdG9yXCIpfX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO3ZhciBpPW4oMjQpLHI9bigzKSxvPW4oNikscz1uKDgpLHU9bigxNSksYT1uKDcxKSxsPW4oMjYpLGM9big3OCksZj1uKDEpKFwiaXRlcmF0b3JcIikscD0hKFtdLmtleXMmJlwibmV4dFwiaW5bXS5rZXlzKCkpLGg9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpc307dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSxuLGQsdixnLG0pe2EobixlLGQpO3ZhciB5LGIsXyx4PWZ1bmN0aW9uKHQpe2lmKCFwJiZ0IGluIEwpcmV0dXJuIExbdF07c3dpdGNoKHQpe2Nhc2VcImtleXNcIjpjYXNlXCJ2YWx1ZXNcIjpyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gbmV3IG4odGhpcyx0KX19cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIG5ldyBuKHRoaXMsdCl9fSx3PWUrXCIgSXRlcmF0b3JcIixTPVwidmFsdWVzXCI9PXYsTz0hMSxMPXQucHJvdG90eXBlLFA9TFtmXXx8TFtcIkBAaXRlcmF0b3JcIl18fHYmJkxbdl0saz1QfHx4KHYpLFQ9dj9TP3goXCJlbnRyaWVzXCIpOms6dm9pZCAwLEU9XCJBcnJheVwiPT1lP0wuZW50cmllc3x8UDpQO2lmKEUmJihfPWMoRS5jYWxsKG5ldyB0KSkpIT09T2JqZWN0LnByb3RvdHlwZSYmXy5uZXh0JiYobChfLHcsITApLGl8fFwiZnVuY3Rpb25cIj09dHlwZW9mIF9bZl18fHMoXyxmLGgpKSxTJiZQJiZcInZhbHVlc1wiIT09UC5uYW1lJiYoTz0hMCxrPWZ1bmN0aW9uKCl7cmV0dXJuIFAuY2FsbCh0aGlzKX0pLGkmJiFtfHwhcCYmIU8mJkxbZl18fHMoTCxmLGspLHVbZV09ayx1W3ddPWgsdilpZih5PXt2YWx1ZXM6Uz9rOngoXCJ2YWx1ZXNcIiksa2V5czpnP2s6eChcImtleXNcIiksZW50cmllczpUfSxtKWZvcihiIGluIHkpYiBpbiBMfHxvKEwsYix5W2JdKTtlbHNlIHIoci5QK3IuRioocHx8TyksZSx5KTtyZXR1cm4geX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgaT1uKDEpKFwiaXRlcmF0b3JcIikscj0hMTt0cnl7dmFyIG89WzddW2ldKCk7by5yZXR1cm49ZnVuY3Rpb24oKXtyPSEwfSxBcnJheS5mcm9tKG8sZnVuY3Rpb24oKXt0aHJvdyAyfSl9Y2F0Y2godCl7fXQuZXhwb3J0cz1mdW5jdGlvbih0LGUpe2lmKCFlJiYhcilyZXR1cm4hMTt2YXIgbj0hMTt0cnl7dmFyIG89WzddLHM9b1tpXSgpO3MubmV4dD1mdW5jdGlvbigpe3JldHVybntkb25lOm49ITB9fSxvW2ldPWZ1bmN0aW9uKCl7cmV0dXJuIHN9LHQobyl9Y2F0Y2godCl7fXJldHVybiBufX0sZnVuY3Rpb24odCxlKXt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlKXtyZXR1cm57dmFsdWU6ZSxkb25lOiEhdH19fSxmdW5jdGlvbih0LGUsbil7dmFyIGk9bigwKSxyPW4oNTIpLnNldCxvPWkuTXV0YXRpb25PYnNlcnZlcnx8aS5XZWJLaXRNdXRhdGlvbk9ic2VydmVyLHM9aS5wcm9jZXNzLHU9aS5Qcm9taXNlLGE9XCJwcm9jZXNzXCI9PW4oOSkocyk7dC5leHBvcnRzPWZ1bmN0aW9uKCl7dmFyIHQsZSxuLGw9ZnVuY3Rpb24oKXt2YXIgaSxyO2ZvcihhJiYoaT1zLmRvbWFpbikmJmkuZXhpdCgpO3Q7KXtyPXQuZm4sdD10Lm5leHQ7dHJ5e3IoKX1jYXRjaChpKXt0aHJvdyB0P24oKTplPXZvaWQgMCxpfX1lPXZvaWQgMCxpJiZpLmVudGVyKCl9O2lmKGEpbj1mdW5jdGlvbigpe3MubmV4dFRpY2sobCl9O2Vsc2UgaWYoIW98fGkubmF2aWdhdG9yJiZpLm5hdmlnYXRvci5zdGFuZGFsb25lKWlmKHUmJnUucmVzb2x2ZSl7dmFyIGM9dS5yZXNvbHZlKHZvaWQgMCk7bj1mdW5jdGlvbigpe2MudGhlbihsKX19ZWxzZSBuPWZ1bmN0aW9uKCl7ci5jYWxsKGksbCl9O2Vsc2V7dmFyIGY9ITAscD1kb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIlwiKTtuZXcgbyhsKS5vYnNlcnZlKHAse2NoYXJhY3RlckRhdGE6ITB9KSxuPWZ1bmN0aW9uKCl7cC5kYXRhPWY9IWZ9fXJldHVybiBmdW5jdGlvbihpKXt2YXIgcj17Zm46aSxuZXh0OnZvaWQgMH07ZSYmKGUubmV4dD1yKSx0fHwodD1yLG4oKSksZT1yfX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgaT1uKDEzKSxyPW4oMiksbz1uKDQ3KTt0LmV4cG9ydHM9big0KT9PYmplY3QuZGVmaW5lUHJvcGVydGllczpmdW5jdGlvbih0LGUpe3IodCk7Zm9yKHZhciBuLHM9byhlKSx1PXMubGVuZ3RoLGE9MDt1PmE7KWkuZih0LG49c1thKytdLGVbbl0pO3JldHVybiB0fX0sZnVuY3Rpb24odCxlLG4pe3ZhciBpPW4oNDYpLHI9bigyMikuY29uY2F0KFwibGVuZ3RoXCIsXCJwcm90b3R5cGVcIik7ZS5mPU9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzfHxmdW5jdGlvbih0KXtyZXR1cm4gaSh0LHIpfX0sZnVuY3Rpb24odCxlLG4pe3ZhciBpPW4oMTIpLHI9bigyOCksbz1uKDI3KShcIklFX1BST1RPXCIpLHM9T2JqZWN0LnByb3RvdHlwZTt0LmV4cG9ydHM9T2JqZWN0LmdldFByb3RvdHlwZU9mfHxmdW5jdGlvbih0KXtyZXR1cm4gdD1yKHQpLGkodCxvKT90W29dOlwiZnVuY3Rpb25cIj09dHlwZW9mIHQuY29uc3RydWN0b3ImJnQgaW5zdGFuY2VvZiB0LmNvbnN0cnVjdG9yP3QuY29uc3RydWN0b3IucHJvdG90eXBlOnQgaW5zdGFuY2VvZiBPYmplY3Q/czpudWxsfX0sZnVuY3Rpb24odCxlKXtlLmY9e30ucHJvcGVydHlJc0VudW1lcmFibGV9LGZ1bmN0aW9uKHQsZSl7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3RyeXtyZXR1cm57ZTohMSx2OnQoKX19Y2F0Y2godCl7cmV0dXJue2U6ITAsdjp0fX19fSxmdW5jdGlvbih0LGUsbil7dmFyIGk9big2KTt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlLG4pe2Zvcih2YXIgciBpbiBlKWkodCxyLGVbcl0sbik7cmV0dXJuIHR9fSxmdW5jdGlvbih0LGUsbil7dmFyIGk9big1KSxyPW4oMiksbz1mdW5jdGlvbih0LGUpe2lmKHIodCksIWkoZSkmJm51bGwhPT1lKXRocm93IFR5cGVFcnJvcihlK1wiOiBjYW4ndCBzZXQgYXMgcHJvdG90eXBlIVwiKX07dC5leHBvcnRzPXtzZXQ6T2JqZWN0LnNldFByb3RvdHlwZU9mfHwoXCJfX3Byb3RvX19cImlue30/ZnVuY3Rpb24odCxlLGkpe3RyeXtpPW4oMTEpKEZ1bmN0aW9uLmNhbGwsbig0NSkuZihPYmplY3QucHJvdG90eXBlLFwiX19wcm90b19fXCIpLnNldCwyKSxpKHQsW10pLGU9ISh0IGluc3RhbmNlb2YgQXJyYXkpfWNhdGNoKHQpe2U9ITB9cmV0dXJuIGZ1bmN0aW9uKHQsbil7cmV0dXJuIG8odCxuKSxlP3QuX19wcm90b19fPW46aSh0LG4pLHR9fSh7fSwhMSk6dm9pZCAwKSxjaGVjazpvfX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO3ZhciBpPW4oMCkscj1uKDEzKSxvPW4oNCkscz1uKDEpKFwic3BlY2llc1wiKTt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7dmFyIGU9aVt0XTtvJiZlJiYhZVtzXSYmci5mKGUscyx7Y29uZmlndXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiB0aGlzfX0pfX0sZnVuY3Rpb24odCxlKXt0LmV4cG9ydHM9XCJcXHRcXG5cXHZcXGZcXHIgwqDhmoDhoI7igIDigIHigILigIPigITigIXigIbigIfigIjigInigIrigK/igZ/jgIBcXHUyMDI4XFx1MjAyOVxcdWZlZmZcIn0sZnVuY3Rpb24odCxlLG4pe3ZhciBpPW4oNTMpLHI9TWF0aC5tYXgsbz1NYXRoLm1pbjt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlKXtyZXR1cm4gdD1pKHQpLHQ8MD9yKHQrZSwwKTpvKHQsZSl9fSxmdW5jdGlvbih0LGUsbil7dmFyIGk9bigwKSxyPWkubmF2aWdhdG9yO3QuZXhwb3J0cz1yJiZyLnVzZXJBZ2VudHx8XCJcIn0sZnVuY3Rpb24odCxlLG4pe3ZhciBpPW4oMzgpLHI9bigxKShcIml0ZXJhdG9yXCIpLG89bigxNSk7dC5leHBvcnRzPW4oMTApLmdldEl0ZXJhdG9yTWV0aG9kPWZ1bmN0aW9uKHQpe2lmKHZvaWQgMCE9dClyZXR1cm4gdFtyXXx8dFtcIkBAaXRlcmF0b3JcIl18fG9baSh0KV19fSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIGk9bigzKSxyPW4oMjApKDIpO2koaS5QK2kuRiohbigxNykoW10uZmlsdGVyLCEwKSxcIkFycmF5XCIse2ZpbHRlcjpmdW5jdGlvbih0KXtyZXR1cm4gcih0aGlzLHQsYXJndW1lbnRzWzFdKX19KX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO3ZhciBpPW4oMykscj1uKDM3KSghMSksbz1bXS5pbmRleE9mLHM9ISFvJiYxL1sxXS5pbmRleE9mKDEsLTApPDA7aShpLlAraS5GKihzfHwhbigxNykobykpLFwiQXJyYXlcIix7aW5kZXhPZjpmdW5jdGlvbih0KXtyZXR1cm4gcz9vLmFwcGx5KHRoaXMsYXJndW1lbnRzKXx8MDpyKHRoaXMsdCxhcmd1bWVudHNbMV0pfX0pfSxmdW5jdGlvbih0LGUsbil7dmFyIGk9bigzKTtpKGkuUyxcIkFycmF5XCIse2lzQXJyYXk6big0Mil9KX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO3ZhciBpPW4oMykscj1uKDIwKSgxKTtpKGkuUCtpLkYqIW4oMTcpKFtdLm1hcCwhMCksXCJBcnJheVwiLHttYXA6ZnVuY3Rpb24odCl7cmV0dXJuIHIodGhpcyx0LGFyZ3VtZW50c1sxXSl9fSl9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjt2YXIgaT1uKDMpLHI9big2Mik7aShpLlAraS5GKiFuKDE3KShbXS5yZWR1Y2UsITApLFwiQXJyYXlcIix7cmVkdWNlOmZ1bmN0aW9uKHQpe3JldHVybiByKHRoaXMsdCxhcmd1bWVudHMubGVuZ3RoLGFyZ3VtZW50c1sxXSwhMSl9fSl9LGZ1bmN0aW9uKHQsZSxuKXt2YXIgaT1EYXRlLnByb3RvdHlwZSxyPWkudG9TdHJpbmcsbz1pLmdldFRpbWU7bmV3IERhdGUoTmFOKStcIlwiIT1cIkludmFsaWQgRGF0ZVwiJiZuKDYpKGksXCJ0b1N0cmluZ1wiLGZ1bmN0aW9uKCl7dmFyIHQ9by5jYWxsKHRoaXMpO3JldHVybiB0PT09dD9yLmNhbGwodGhpcyk6XCJJbnZhbGlkIERhdGVcIn0pfSxmdW5jdGlvbih0LGUsbil7big0KSYmXCJnXCIhPS8uL2cuZmxhZ3MmJm4oMTMpLmYoUmVnRXhwLnByb3RvdHlwZSxcImZsYWdzXCIse2NvbmZpZ3VyYWJsZTohMCxnZXQ6bigzOSl9KX0sZnVuY3Rpb24odCxlLG4pe24oNjUpKFwic2VhcmNoXCIsMSxmdW5jdGlvbih0LGUsbil7cmV0dXJuW2Z1bmN0aW9uKG4pe1widXNlIHN0cmljdFwiO3ZhciBpPXQodGhpcykscj12b2lkIDA9PW4/dm9pZCAwOm5bZV07cmV0dXJuIHZvaWQgMCE9PXI/ci5jYWxsKG4saSk6bmV3IFJlZ0V4cChuKVtlXShTdHJpbmcoaSkpfSxuXX0pfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7big5NCk7dmFyIGk9bigyKSxyPW4oMzkpLG89big0KSxzPS8uLy50b1N0cmluZyx1PWZ1bmN0aW9uKHQpe24oNikoUmVnRXhwLnByb3RvdHlwZSxcInRvU3RyaW5nXCIsdCwhMCl9O24oNykoZnVuY3Rpb24oKXtyZXR1cm5cIi9hL2JcIiE9cy5jYWxsKHtzb3VyY2U6XCJhXCIsZmxhZ3M6XCJiXCJ9KX0pP3UoZnVuY3Rpb24oKXt2YXIgdD1pKHRoaXMpO3JldHVyblwiL1wiLmNvbmNhdCh0LnNvdXJjZSxcIi9cIixcImZsYWdzXCJpbiB0P3QuZmxhZ3M6IW8mJnQgaW5zdGFuY2VvZiBSZWdFeHA/ci5jYWxsKHQpOnZvaWQgMCl9KTpcInRvU3RyaW5nXCIhPXMubmFtZSYmdShmdW5jdGlvbigpe3JldHVybiBzLmNhbGwodGhpcyl9KX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO24oNTEpKFwidHJpbVwiLGZ1bmN0aW9uKHQpe3JldHVybiBmdW5jdGlvbigpe3JldHVybiB0KHRoaXMsMyl9fSl9LGZ1bmN0aW9uKHQsZSxuKXtmb3IodmFyIGk9bigzNCkscj1uKDQ3KSxvPW4oNikscz1uKDApLHU9big4KSxhPW4oMTUpLGw9bigxKSxjPWwoXCJpdGVyYXRvclwiKSxmPWwoXCJ0b1N0cmluZ1RhZ1wiKSxwPWEuQXJyYXksaD17Q1NTUnVsZUxpc3Q6ITAsQ1NTU3R5bGVEZWNsYXJhdGlvbjohMSxDU1NWYWx1ZUxpc3Q6ITEsQ2xpZW50UmVjdExpc3Q6ITEsRE9NUmVjdExpc3Q6ITEsRE9NU3RyaW5nTGlzdDohMSxET01Ub2tlbkxpc3Q6ITAsRGF0YVRyYW5zZmVySXRlbUxpc3Q6ITEsRmlsZUxpc3Q6ITEsSFRNTEFsbENvbGxlY3Rpb246ITEsSFRNTENvbGxlY3Rpb246ITEsSFRNTEZvcm1FbGVtZW50OiExLEhUTUxTZWxlY3RFbGVtZW50OiExLE1lZGlhTGlzdDohMCxNaW1lVHlwZUFycmF5OiExLE5hbWVkTm9kZU1hcDohMSxOb2RlTGlzdDohMCxQYWludFJlcXVlc3RMaXN0OiExLFBsdWdpbjohMSxQbHVnaW5BcnJheTohMSxTVkdMZW5ndGhMaXN0OiExLFNWR051bWJlckxpc3Q6ITEsU1ZHUGF0aFNlZ0xpc3Q6ITEsU1ZHUG9pbnRMaXN0OiExLFNWR1N0cmluZ0xpc3Q6ITEsU1ZHVHJhbnNmb3JtTGlzdDohMSxTb3VyY2VCdWZmZXJMaXN0OiExLFN0eWxlU2hlZXRMaXN0OiEwLFRleHRUcmFja0N1ZUxpc3Q6ITEsVGV4dFRyYWNrTGlzdDohMSxUb3VjaExpc3Q6ITF9LGQ9cihoKSx2PTA7djxkLmxlbmd0aDt2Kyspe3ZhciBnLG09ZFt2XSx5PWhbbV0sYj1zW21dLF89YiYmYi5wcm90b3R5cGU7aWYoXyYmKF9bY118fHUoXyxjLHApLF9bZl18fHUoXyxmLG0pLGFbbV09cCx5KSlmb3IoZyBpbiBpKV9bZ118fG8oXyxnLGlbZ10sITApfX0sZnVuY3Rpb24odCxlKXt9LGZ1bmN0aW9uKHQsZSl7dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSxuLGkscixvKXt2YXIgcyx1PXQ9dHx8e30sYT10eXBlb2YgdC5kZWZhdWx0O1wib2JqZWN0XCIhPT1hJiZcImZ1bmN0aW9uXCIhPT1hfHwocz10LHU9dC5kZWZhdWx0KTt2YXIgbD1cImZ1bmN0aW9uXCI9PXR5cGVvZiB1P3Uub3B0aW9uczp1O2UmJihsLnJlbmRlcj1lLnJlbmRlcixsLnN0YXRpY1JlbmRlckZucz1lLnN0YXRpY1JlbmRlckZucyxsLl9jb21waWxlZD0hMCksbiYmKGwuZnVuY3Rpb25hbD0hMCksciYmKGwuX3Njb3BlSWQ9cik7dmFyIGM7aWYobz8oYz1mdW5jdGlvbih0KXt0PXR8fHRoaXMuJHZub2RlJiZ0aGlzLiR2bm9kZS5zc3JDb250ZXh0fHx0aGlzLnBhcmVudCYmdGhpcy5wYXJlbnQuJHZub2RlJiZ0aGlzLnBhcmVudC4kdm5vZGUuc3NyQ29udGV4dCx0fHxcInVuZGVmaW5lZFwiPT10eXBlb2YgX19WVUVfU1NSX0NPTlRFWFRfX3x8KHQ9X19WVUVfU1NSX0NPTlRFWFRfXyksaSYmaS5jYWxsKHRoaXMsdCksdCYmdC5fcmVnaXN0ZXJlZENvbXBvbmVudHMmJnQuX3JlZ2lzdGVyZWRDb21wb25lbnRzLmFkZChvKX0sbC5fc3NyUmVnaXN0ZXI9Yyk6aSYmKGM9aSksYyl7dmFyIGY9bC5mdW5jdGlvbmFsLHA9Zj9sLnJlbmRlcjpsLmJlZm9yZUNyZWF0ZTtmPyhsLl9pbmplY3RTdHlsZXM9YyxsLnJlbmRlcj1mdW5jdGlvbih0LGUpe3JldHVybiBjLmNhbGwoZSkscCh0LGUpfSk6bC5iZWZvcmVDcmVhdGU9cD9bXS5jb25jYXQocCxjKTpbY119cmV0dXJue2VzTW9kdWxlOnMsZXhwb3J0czp1LG9wdGlvbnM6bH19fSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIGk9ZnVuY3Rpb24oKXt2YXIgdD10aGlzLGU9dC4kY3JlYXRlRWxlbWVudCxuPXQuX3NlbGYuX2N8fGU7cmV0dXJuIG4oXCJkaXZcIix7c3RhdGljQ2xhc3M6XCJtdWx0aXNlbGVjdFwiLGNsYXNzOntcIm11bHRpc2VsZWN0LS1hY3RpdmVcIjp0LmlzT3BlbixcIm11bHRpc2VsZWN0LS1kaXNhYmxlZFwiOnQuZGlzYWJsZWQsXCJtdWx0aXNlbGVjdC0tYWJvdmVcIjp0LmlzQWJvdmV9LGF0dHJzOnt0YWJpbmRleDp0LnNlYXJjaGFibGU/LTE6dC50YWJpbmRleH0sb246e2ZvY3VzOmZ1bmN0aW9uKGUpe3QuYWN0aXZhdGUoKX0sYmx1cjpmdW5jdGlvbihlKXshdC5zZWFyY2hhYmxlJiZ0LmRlYWN0aXZhdGUoKX0sa2V5ZG93bjpbZnVuY3Rpb24oZSl7cmV0dXJuXCJidXR0b25cImluIGV8fCF0Ll9rKGUua2V5Q29kZSxcImRvd25cIiw0MCxlLmtleSxbXCJEb3duXCIsXCJBcnJvd0Rvd25cIl0pP2UudGFyZ2V0IT09ZS5jdXJyZW50VGFyZ2V0P251bGw6KGUucHJldmVudERlZmF1bHQoKSx2b2lkIHQucG9pbnRlckZvcndhcmQoKSk6bnVsbH0sZnVuY3Rpb24oZSl7cmV0dXJuXCJidXR0b25cImluIGV8fCF0Ll9rKGUua2V5Q29kZSxcInVwXCIsMzgsZS5rZXksW1wiVXBcIixcIkFycm93VXBcIl0pP2UudGFyZ2V0IT09ZS5jdXJyZW50VGFyZ2V0P251bGw6KGUucHJldmVudERlZmF1bHQoKSx2b2lkIHQucG9pbnRlckJhY2t3YXJkKCkpOm51bGx9LGZ1bmN0aW9uKGUpe3JldHVyblwiYnV0dG9uXCJpbiBlfHwhdC5fayhlLmtleUNvZGUsXCJlbnRlclwiLDEzLGUua2V5LFwiRW50ZXJcIil8fCF0Ll9rKGUua2V5Q29kZSxcInRhYlwiLDksZS5rZXksXCJUYWJcIik/KGUuc3RvcFByb3BhZ2F0aW9uKCksZS50YXJnZXQhPT1lLmN1cnJlbnRUYXJnZXQ/bnVsbDp2b2lkIHQuYWRkUG9pbnRlckVsZW1lbnQoZSkpOm51bGx9XSxrZXl1cDpmdW5jdGlvbihlKXtpZighKFwiYnV0dG9uXCJpbiBlKSYmdC5fayhlLmtleUNvZGUsXCJlc2NcIiwyNyxlLmtleSxcIkVzY2FwZVwiKSlyZXR1cm4gbnVsbDt0LmRlYWN0aXZhdGUoKX19fSxbdC5fdChcImNhcmV0XCIsW24oXCJkaXZcIix7c3RhdGljQ2xhc3M6XCJtdWx0aXNlbGVjdF9fc2VsZWN0XCIsb246e21vdXNlZG93bjpmdW5jdGlvbihlKXtlLnByZXZlbnREZWZhdWx0KCksZS5zdG9wUHJvcGFnYXRpb24oKSx0LnRvZ2dsZSgpfX19KV0se3RvZ2dsZTp0LnRvZ2dsZX0pLHQuX3YoXCIgXCIpLHQuX3QoXCJjbGVhclwiLG51bGwse3NlYXJjaDp0LnNlYXJjaH0pLHQuX3YoXCIgXCIpLG4oXCJkaXZcIix7cmVmOlwidGFnc1wiLHN0YXRpY0NsYXNzOlwibXVsdGlzZWxlY3RfX3RhZ3NcIn0sW3QuX3QoXCJzZWxlY3Rpb25cIixbbihcImRpdlwiLHtkaXJlY3RpdmVzOlt7bmFtZTpcInNob3dcIixyYXdOYW1lOlwidi1zaG93XCIsdmFsdWU6dC52aXNpYmxlVmFsdWVzLmxlbmd0aD4wLGV4cHJlc3Npb246XCJ2aXNpYmxlVmFsdWVzLmxlbmd0aCA+IDBcIn1dLHN0YXRpY0NsYXNzOlwibXVsdGlzZWxlY3RfX3RhZ3Mtd3JhcFwifSxbdC5fbCh0LnZpc2libGVWYWx1ZXMsZnVuY3Rpb24oZSxpKXtyZXR1cm5bdC5fdChcInRhZ1wiLFtuKFwic3BhblwiLHtrZXk6aSxzdGF0aWNDbGFzczpcIm11bHRpc2VsZWN0X190YWdcIn0sW24oXCJzcGFuXCIse2RvbVByb3BzOnt0ZXh0Q29udGVudDp0Ll9zKHQuZ2V0T3B0aW9uTGFiZWwoZSkpfX0pLHQuX3YoXCIgXCIpLG4oXCJpXCIse3N0YXRpY0NsYXNzOlwibXVsdGlzZWxlY3RfX3RhZy1pY29uXCIsYXR0cnM6e1wiYXJpYS1oaWRkZW5cIjpcInRydWVcIix0YWJpbmRleDpcIjFcIn0sb246e2tleWRvd246ZnVuY3Rpb24obil7aWYoIShcImJ1dHRvblwiaW4gbikmJnQuX2sobi5rZXlDb2RlLFwiZW50ZXJcIiwxMyxuLmtleSxcIkVudGVyXCIpKXJldHVybiBudWxsO24ucHJldmVudERlZmF1bHQoKSx0LnJlbW92ZUVsZW1lbnQoZSl9LG1vdXNlZG93bjpmdW5jdGlvbihuKXtuLnByZXZlbnREZWZhdWx0KCksdC5yZW1vdmVFbGVtZW50KGUpfX19KV0pXSx7b3B0aW9uOmUsc2VhcmNoOnQuc2VhcmNoLHJlbW92ZTp0LnJlbW92ZUVsZW1lbnR9KV19KV0sMiksdC5fdihcIiBcIiksdC5pbnRlcm5hbFZhbHVlJiZ0LmludGVybmFsVmFsdWUubGVuZ3RoPnQubGltaXQ/W3QuX3QoXCJsaW1pdFwiLFtuKFwic3Ryb25nXCIse3N0YXRpY0NsYXNzOlwibXVsdGlzZWxlY3RfX3N0cm9uZ1wiLGRvbVByb3BzOnt0ZXh0Q29udGVudDp0Ll9zKHQubGltaXRUZXh0KHQuaW50ZXJuYWxWYWx1ZS5sZW5ndGgtdC5saW1pdCkpfX0pXSldOnQuX2UoKV0se3NlYXJjaDp0LnNlYXJjaCxyZW1vdmU6dC5yZW1vdmVFbGVtZW50LHZhbHVlczp0LnZpc2libGVWYWx1ZXMsaXNPcGVuOnQuaXNPcGVufSksdC5fdihcIiBcIiksbihcInRyYW5zaXRpb25cIix7YXR0cnM6e25hbWU6XCJtdWx0aXNlbGVjdF9fbG9hZGluZ1wifX0sW3QuX3QoXCJsb2FkaW5nXCIsW24oXCJkaXZcIix7ZGlyZWN0aXZlczpbe25hbWU6XCJzaG93XCIscmF3TmFtZTpcInYtc2hvd1wiLHZhbHVlOnQubG9hZGluZyxleHByZXNzaW9uOlwibG9hZGluZ1wifV0sc3RhdGljQ2xhc3M6XCJtdWx0aXNlbGVjdF9fc3Bpbm5lclwifSldKV0sMiksdC5fdihcIiBcIiksdC5zZWFyY2hhYmxlP24oXCJpbnB1dFwiLHtyZWY6XCJzZWFyY2hcIixzdGF0aWNDbGFzczpcIm11bHRpc2VsZWN0X19pbnB1dFwiLHN0eWxlOnQuaW5wdXRTdHlsZSxhdHRyczp7bmFtZTp0Lm5hbWUsaWQ6dC5pZCx0eXBlOlwidGV4dFwiLGF1dG9jb21wbGV0ZTpcIm9mZlwiLHBsYWNlaG9sZGVyOnQucGxhY2Vob2xkZXIsZGlzYWJsZWQ6dC5kaXNhYmxlZCx0YWJpbmRleDp0LnRhYmluZGV4fSxkb21Qcm9wczp7dmFsdWU6dC5zZWFyY2h9LG9uOntpbnB1dDpmdW5jdGlvbihlKXt0LnVwZGF0ZVNlYXJjaChlLnRhcmdldC52YWx1ZSl9LGZvY3VzOmZ1bmN0aW9uKGUpe2UucHJldmVudERlZmF1bHQoKSx0LmFjdGl2YXRlKCl9LGJsdXI6ZnVuY3Rpb24oZSl7ZS5wcmV2ZW50RGVmYXVsdCgpLHQuZGVhY3RpdmF0ZSgpfSxrZXl1cDpmdW5jdGlvbihlKXtpZighKFwiYnV0dG9uXCJpbiBlKSYmdC5fayhlLmtleUNvZGUsXCJlc2NcIiwyNyxlLmtleSxcIkVzY2FwZVwiKSlyZXR1cm4gbnVsbDt0LmRlYWN0aXZhdGUoKX0sa2V5ZG93bjpbZnVuY3Rpb24oZSl7aWYoIShcImJ1dHRvblwiaW4gZSkmJnQuX2soZS5rZXlDb2RlLFwiZG93blwiLDQwLGUua2V5LFtcIkRvd25cIixcIkFycm93RG93blwiXSkpcmV0dXJuIG51bGw7ZS5wcmV2ZW50RGVmYXVsdCgpLHQucG9pbnRlckZvcndhcmQoKX0sZnVuY3Rpb24oZSl7aWYoIShcImJ1dHRvblwiaW4gZSkmJnQuX2soZS5rZXlDb2RlLFwidXBcIiwzOCxlLmtleSxbXCJVcFwiLFwiQXJyb3dVcFwiXSkpcmV0dXJuIG51bGw7ZS5wcmV2ZW50RGVmYXVsdCgpLHQucG9pbnRlckJhY2t3YXJkKCl9LGZ1bmN0aW9uKGUpe3JldHVyblwiYnV0dG9uXCJpbiBlfHwhdC5fayhlLmtleUNvZGUsXCJlbnRlclwiLDEzLGUua2V5LFwiRW50ZXJcIik/KGUucHJldmVudERlZmF1bHQoKSxlLnN0b3BQcm9wYWdhdGlvbigpLGUudGFyZ2V0IT09ZS5jdXJyZW50VGFyZ2V0P251bGw6dm9pZCB0LmFkZFBvaW50ZXJFbGVtZW50KGUpKTpudWxsfSxmdW5jdGlvbihlKXtpZighKFwiYnV0dG9uXCJpbiBlKSYmdC5fayhlLmtleUNvZGUsXCJkZWxldGVcIixbOCw0Nl0sZS5rZXksW1wiQmFja3NwYWNlXCIsXCJEZWxldGVcIl0pKXJldHVybiBudWxsO2Uuc3RvcFByb3BhZ2F0aW9uKCksdC5yZW1vdmVMYXN0RWxlbWVudCgpfV19fSk6dC5fZSgpLHQuX3YoXCIgXCIpLHQuaXNTaW5nbGVMYWJlbFZpc2libGU/bihcInNwYW5cIix7c3RhdGljQ2xhc3M6XCJtdWx0aXNlbGVjdF9fc2luZ2xlXCIsb246e21vdXNlZG93bjpmdW5jdGlvbihlKXtyZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpLHQudG9nZ2xlKGUpfX19LFt0Ll90KFwic2luZ2xlTGFiZWxcIixbW3QuX3YodC5fcyh0LmN1cnJlbnRPcHRpb25MYWJlbCkpXV0se29wdGlvbjp0LnNpbmdsZVZhbHVlfSldLDIpOnQuX2UoKSx0Ll92KFwiIFwiKSx0LmlzUGxhY2Vob2xkZXJWaXNpYmxlP24oXCJzcGFuXCIse3N0YXRpY0NsYXNzOlwibXVsdGlzZWxlY3RfX3BsYWNlaG9sZGVyXCIsb246e21vdXNlZG93bjpmdW5jdGlvbihlKXtyZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpLHQudG9nZ2xlKGUpfX19LFt0Ll90KFwicGxhY2Vob2xkZXJcIixbdC5fdihcIlxcbiAgICAgICAgICAgIFwiK3QuX3ModC5wbGFjZWhvbGRlcikrXCJcXG4gICAgICAgIFwiKV0pXSwyKTp0Ll9lKCldLDIpLHQuX3YoXCIgXCIpLG4oXCJ0cmFuc2l0aW9uXCIse2F0dHJzOntuYW1lOlwibXVsdGlzZWxlY3RcIn19LFtuKFwiZGl2XCIse2RpcmVjdGl2ZXM6W3tuYW1lOlwic2hvd1wiLHJhd05hbWU6XCJ2LXNob3dcIix2YWx1ZTp0LmlzT3BlbixleHByZXNzaW9uOlwiaXNPcGVuXCJ9XSxyZWY6XCJsaXN0XCIsc3RhdGljQ2xhc3M6XCJtdWx0aXNlbGVjdF9fY29udGVudC13cmFwcGVyXCIsc3R5bGU6e21heEhlaWdodDp0Lm9wdGltaXplZEhlaWdodCtcInB4XCJ9LGF0dHJzOnt0YWJpbmRleDpcIi0xXCJ9LG9uOntmb2N1czp0LmFjdGl2YXRlLG1vdXNlZG93bjpmdW5jdGlvbih0KXt0LnByZXZlbnREZWZhdWx0KCl9fX0sW24oXCJ1bFwiLHtzdGF0aWNDbGFzczpcIm11bHRpc2VsZWN0X19jb250ZW50XCIsc3R5bGU6dC5jb250ZW50U3R5bGV9LFt0Ll90KFwiYmVmb3JlTGlzdFwiKSx0Ll92KFwiIFwiKSx0Lm11bHRpcGxlJiZ0Lm1heD09PXQuaW50ZXJuYWxWYWx1ZS5sZW5ndGg/bihcImxpXCIsW24oXCJzcGFuXCIse3N0YXRpY0NsYXNzOlwibXVsdGlzZWxlY3RfX29wdGlvblwifSxbdC5fdChcIm1heEVsZW1lbnRzXCIsW3QuX3YoXCJNYXhpbXVtIG9mIFwiK3QuX3ModC5tYXgpK1wiIG9wdGlvbnMgc2VsZWN0ZWQuIEZpcnN0IHJlbW92ZSBhIHNlbGVjdGVkIG9wdGlvbiB0byBzZWxlY3QgYW5vdGhlci5cIildKV0sMildKTp0Ll9lKCksdC5fdihcIiBcIiksIXQubWF4fHx0LmludGVybmFsVmFsdWUubGVuZ3RoPHQubWF4P3QuX2wodC5maWx0ZXJlZE9wdGlvbnMsZnVuY3Rpb24oZSxpKXtyZXR1cm4gbihcImxpXCIse2tleTppLHN0YXRpY0NsYXNzOlwibXVsdGlzZWxlY3RfX2VsZW1lbnRcIn0sW2UmJihlLiRpc0xhYmVsfHxlLiRpc0Rpc2FibGVkKT90Ll9lKCk6bihcInNwYW5cIix7c3RhdGljQ2xhc3M6XCJtdWx0aXNlbGVjdF9fb3B0aW9uXCIsY2xhc3M6dC5vcHRpb25IaWdobGlnaHQoaSxlKSxhdHRyczp7XCJkYXRhLXNlbGVjdFwiOmUmJmUuaXNUYWc/dC50YWdQbGFjZWhvbGRlcjp0LnNlbGVjdExhYmVsVGV4dCxcImRhdGEtc2VsZWN0ZWRcIjp0LnNlbGVjdGVkTGFiZWxUZXh0LFwiZGF0YS1kZXNlbGVjdFwiOnQuZGVzZWxlY3RMYWJlbFRleHR9LG9uOntjbGljazpmdW5jdGlvbihuKXtuLnN0b3BQcm9wYWdhdGlvbigpLHQuc2VsZWN0KGUpfSxtb3VzZWVudGVyOmZ1bmN0aW9uKGUpe2lmKGUudGFyZ2V0IT09ZS5jdXJyZW50VGFyZ2V0KXJldHVybiBudWxsO3QucG9pbnRlclNldChpKX19fSxbdC5fdChcIm9wdGlvblwiLFtuKFwic3BhblwiLFt0Ll92KHQuX3ModC5nZXRPcHRpb25MYWJlbChlKSkpXSldLHtvcHRpb246ZSxzZWFyY2g6dC5zZWFyY2h9KV0sMiksdC5fdihcIiBcIiksZSYmKGUuJGlzTGFiZWx8fGUuJGlzRGlzYWJsZWQpP24oXCJzcGFuXCIse3N0YXRpY0NsYXNzOlwibXVsdGlzZWxlY3RfX29wdGlvblwiLGNsYXNzOnQuZ3JvdXBIaWdobGlnaHQoaSxlKSxhdHRyczp7XCJkYXRhLXNlbGVjdFwiOnQuZ3JvdXBTZWxlY3QmJnQuc2VsZWN0R3JvdXBMYWJlbFRleHQsXCJkYXRhLWRlc2VsZWN0XCI6dC5ncm91cFNlbGVjdCYmdC5kZXNlbGVjdEdyb3VwTGFiZWxUZXh0fSxvbjp7bW91c2VlbnRlcjpmdW5jdGlvbihlKXtpZihlLnRhcmdldCE9PWUuY3VycmVudFRhcmdldClyZXR1cm4gbnVsbDt0Lmdyb3VwU2VsZWN0JiZ0LnBvaW50ZXJTZXQoaSl9LG1vdXNlZG93bjpmdW5jdGlvbihuKXtuLnByZXZlbnREZWZhdWx0KCksdC5zZWxlY3RHcm91cChlKX19fSxbdC5fdChcIm9wdGlvblwiLFtuKFwic3BhblwiLFt0Ll92KHQuX3ModC5nZXRPcHRpb25MYWJlbChlKSkpXSldLHtvcHRpb246ZSxzZWFyY2g6dC5zZWFyY2h9KV0sMik6dC5fZSgpXSl9KTp0Ll9lKCksdC5fdihcIiBcIiksbihcImxpXCIse2RpcmVjdGl2ZXM6W3tuYW1lOlwic2hvd1wiLHJhd05hbWU6XCJ2LXNob3dcIix2YWx1ZTp0LnNob3dOb1Jlc3VsdHMmJjA9PT10LmZpbHRlcmVkT3B0aW9ucy5sZW5ndGgmJnQuc2VhcmNoJiYhdC5sb2FkaW5nLGV4cHJlc3Npb246XCJzaG93Tm9SZXN1bHRzICYmIChmaWx0ZXJlZE9wdGlvbnMubGVuZ3RoID09PSAwICYmIHNlYXJjaCAmJiAhbG9hZGluZylcIn1dfSxbbihcInNwYW5cIix7c3RhdGljQ2xhc3M6XCJtdWx0aXNlbGVjdF9fb3B0aW9uXCJ9LFt0Ll90KFwibm9SZXN1bHRcIixbdC5fdihcIk5vIGVsZW1lbnRzIGZvdW5kLiBDb25zaWRlciBjaGFuZ2luZyB0aGUgc2VhcmNoIHF1ZXJ5LlwiKV0pXSwyKV0pLHQuX3YoXCIgXCIpLG4oXCJsaVwiLHtkaXJlY3RpdmVzOlt7bmFtZTpcInNob3dcIixyYXdOYW1lOlwidi1zaG93XCIsdmFsdWU6dC5zaG93Tm9PcHRpb25zJiYwPT09dC5vcHRpb25zLmxlbmd0aCYmIXQuc2VhcmNoJiYhdC5sb2FkaW5nLGV4cHJlc3Npb246XCJzaG93Tm9PcHRpb25zICYmIChvcHRpb25zLmxlbmd0aCA9PT0gMCAmJiAhc2VhcmNoICYmICFsb2FkaW5nKVwifV19LFtuKFwic3BhblwiLHtzdGF0aWNDbGFzczpcIm11bHRpc2VsZWN0X19vcHRpb25cIn0sW3QuX3QoXCJub09wdGlvbnNcIixbdC5fdihcIkxpc3QgaXMgZW1wdHkuXCIpXSldLDIpXSksdC5fdihcIiBcIiksdC5fdChcImFmdGVyTGlzdFwiKV0sMildKV0pXSwyKX0scj1bXSxvPXtyZW5kZXI6aSxzdGF0aWNSZW5kZXJGbnM6cn07ZS5hPW99XSl9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbXVsdGlzZWxlY3QvZGlzdC92dWUtbXVsdGlzZWxlY3QubWluLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy92dWUtbXVsdGlzZWxlY3QvZGlzdC92dWUtbXVsdGlzZWxlY3QubWluLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi0zMTJkM2UzY1xcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL1JvbGVzLnZ1ZVwiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXCIpKFwiMjJlZmZkNmRcIiwgY29udGVudCwgZmFsc2UsIHt9KTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcbiAvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuIGlmKCFjb250ZW50LmxvY2Fscykge1xuICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTMxMmQzZTNjXFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vUm9sZXMudnVlXCIsIGZ1bmN0aW9uKCkge1xuICAgICB2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTMxMmQzZTNjXFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vUm9sZXMudnVlXCIpO1xuICAgICBpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcbiAgICAgdXBkYXRlKG5ld0NvbnRlbnQpO1xuICAgfSk7XG4gfVxuIC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3NcbiBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTMxMmQzZTNjXCIsXCJzY29wZWRcIjp0cnVlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvUm9sZXMudnVlXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2luZGV4LmpzIS4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTMxMmQzZTNjXCIsXCJzY29wZWRcIjp0cnVlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvUm9sZXMudnVlXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi0zZTAxM2IyYlxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL0Fzc2lnbm1lbnRzLnZ1ZVwiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXCIpKFwiZjUxYTZmNDJcIiwgY29udGVudCwgZmFsc2UsIHt9KTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcbiAvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuIGlmKCFjb250ZW50LmxvY2Fscykge1xuICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTNlMDEzYjJiXFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vQXNzaWdubWVudHMudnVlXCIsIGZ1bmN0aW9uKCkge1xuICAgICB2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTNlMDEzYjJiXFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vQXNzaWdubWVudHMudnVlXCIpO1xuICAgICBpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcbiAgICAgdXBkYXRlKG5ld0NvbnRlbnQpO1xuICAgfSk7XG4gfVxuIC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3NcbiBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTNlMDEzYjJiXCIsXCJzY29wZWRcIjp0cnVlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvQXNzaWdubWVudHMudnVlXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2luZGV4LmpzIS4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTNlMDEzYjJiXCIsXCJzY29wZWRcIjp0cnVlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvQXNzaWdubWVudHMudnVlXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi01MGQwMzBiZFxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL1JvbGVDcmVhdGUudnVlXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikoXCJlYWJjMDdlNlwiLCBjb250ZW50LCBmYWxzZSwge30pO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuIC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG4gaWYoIWNvbnRlbnQubG9jYWxzKSB7XG4gICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNTBkMDMwYmRcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9Sb2xlQ3JlYXRlLnZ1ZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgdmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi01MGQwMzBiZFxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL1JvbGVDcmVhdGUudnVlXCIpO1xuICAgICBpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcbiAgICAgdXBkYXRlKG5ld0NvbnRlbnQpO1xuICAgfSk7XG4gfVxuIC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3NcbiBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTUwZDAzMGJkXCIsXCJzY29wZWRcIjp0cnVlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvUm9sZUNyZWF0ZS52dWVcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvaW5kZXguanMhLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtNTBkMDMwYmRcIixcInNjb3BlZFwiOnRydWUsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9Sb2xlQ3JlYXRlLnZ1ZVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtZTlmZmU1MmVcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9QZXJtaXNzaW9ucy52dWVcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1wiKShcIjVmYTg2ZmI2XCIsIGNvbnRlbnQsIGZhbHNlLCB7fSk7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG4gLy8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3NcbiBpZighY29udGVudC5sb2NhbHMpIHtcbiAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi1lOWZmZTUyZVxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL1Blcm1pc3Npb25zLnZ1ZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgdmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi1lOWZmZTUyZVxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL1Blcm1pc3Npb25zLnZ1ZVwiKTtcbiAgICAgaWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG4gICAgIHVwZGF0ZShuZXdDb250ZW50KTtcbiAgIH0pO1xuIH1cbiAvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG4gbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlciEuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi1lOWZmZTUyZVwiLFwic2NvcGVkXCI6dHJ1ZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL1Blcm1pc3Npb25zLnZ1ZVxuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9pbmRleC5qcyEuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi1lOWZmZTUyZVwiLFwic2NvcGVkXCI6dHJ1ZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL1Blcm1pc3Npb25zLnZ1ZVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4gIE1vZGlmaWVkIGJ5IEV2YW4gWW91IEB5eXg5OTA4MDNcbiovXG5cbnZhciBoYXNEb2N1bWVudCA9IHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCdcblxuaWYgKHR5cGVvZiBERUJVRyAhPT0gJ3VuZGVmaW5lZCcgJiYgREVCVUcpIHtcbiAgaWYgKCFoYXNEb2N1bWVudCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAndnVlLXN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50LiAnICtcbiAgICBcIlVzZSB7IHRhcmdldDogJ25vZGUnIH0gaW4geW91ciBXZWJwYWNrIGNvbmZpZyB0byBpbmRpY2F0ZSBhIHNlcnZlci1yZW5kZXJpbmcgZW52aXJvbm1lbnQuXCJcbiAgKSB9XG59XG5cbnZhciBsaXN0VG9TdHlsZXMgPSByZXF1aXJlKCcuL2xpc3RUb1N0eWxlcycpXG5cbi8qXG50eXBlIFN0eWxlT2JqZWN0ID0ge1xuICBpZDogbnVtYmVyO1xuICBwYXJ0czogQXJyYXk8U3R5bGVPYmplY3RQYXJ0PlxufVxuXG50eXBlIFN0eWxlT2JqZWN0UGFydCA9IHtcbiAgY3NzOiBzdHJpbmc7XG4gIG1lZGlhOiBzdHJpbmc7XG4gIHNvdXJjZU1hcDogP3N0cmluZ1xufVxuKi9cblxudmFyIHN0eWxlc0luRG9tID0gey8qXG4gIFtpZDogbnVtYmVyXToge1xuICAgIGlkOiBudW1iZXIsXG4gICAgcmVmczogbnVtYmVyLFxuICAgIHBhcnRzOiBBcnJheTwob2JqPzogU3R5bGVPYmplY3RQYXJ0KSA9PiB2b2lkPlxuICB9XG4qL31cblxudmFyIGhlYWQgPSBoYXNEb2N1bWVudCAmJiAoZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdKVxudmFyIHNpbmdsZXRvbkVsZW1lbnQgPSBudWxsXG52YXIgc2luZ2xldG9uQ291bnRlciA9IDBcbnZhciBpc1Byb2R1Y3Rpb24gPSBmYWxzZVxudmFyIG5vb3AgPSBmdW5jdGlvbiAoKSB7fVxudmFyIG9wdGlvbnMgPSBudWxsXG52YXIgc3NySWRLZXkgPSAnZGF0YS12dWUtc3NyLWlkJ1xuXG4vLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cbi8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2VcbnZhciBpc09sZElFID0gdHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgL21zaWUgWzYtOV1cXGIvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChwYXJlbnRJZCwgbGlzdCwgX2lzUHJvZHVjdGlvbiwgX29wdGlvbnMpIHtcbiAgaXNQcm9kdWN0aW9uID0gX2lzUHJvZHVjdGlvblxuXG4gIG9wdGlvbnMgPSBfb3B0aW9ucyB8fCB7fVxuXG4gIHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMocGFyZW50SWQsIGxpc3QpXG4gIGFkZFN0eWxlc1RvRG9tKHN0eWxlcylcblxuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlIChuZXdMaXN0KSB7XG4gICAgdmFyIG1heVJlbW92ZSA9IFtdXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpdGVtID0gc3R5bGVzW2ldXG4gICAgICB2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXVxuICAgICAgZG9tU3R5bGUucmVmcy0tXG4gICAgICBtYXlSZW1vdmUucHVzaChkb21TdHlsZSlcbiAgICB9XG4gICAgaWYgKG5ld0xpc3QpIHtcbiAgICAgIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhwYXJlbnRJZCwgbmV3TGlzdClcbiAgICAgIGFkZFN0eWxlc1RvRG9tKHN0eWxlcylcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGVzID0gW11cbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXVxuICAgICAgaWYgKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGRvbVN0eWxlLnBhcnRzW2pdKClcbiAgICAgICAgfVxuICAgICAgICBkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tIChzdHlsZXMgLyogQXJyYXk8U3R5bGVPYmplY3Q+ICovKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBzdHlsZXNbaV1cbiAgICB2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXVxuICAgIGlmIChkb21TdHlsZSkge1xuICAgICAgZG9tU3R5bGUucmVmcysrXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pXG4gICAgICB9XG4gICAgICBmb3IgKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdKSlcbiAgICAgIH1cbiAgICAgIGlmIChkb21TdHlsZS5wYXJ0cy5sZW5ndGggPiBpdGVtLnBhcnRzLmxlbmd0aCkge1xuICAgICAgICBkb21TdHlsZS5wYXJ0cy5sZW5ndGggPSBpdGVtLnBhcnRzLmxlbmd0aFxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgcGFydHMgPSBbXVxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSkpXG4gICAgICB9XG4gICAgICBzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHsgaWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0cyB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudCAoKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpXG4gIHN0eWxlRWxlbWVudC50eXBlID0gJ3RleHQvY3NzJ1xuICBoZWFkLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudClcbiAgcmV0dXJuIHN0eWxlRWxlbWVudFxufVxuXG5mdW5jdGlvbiBhZGRTdHlsZSAob2JqIC8qIFN0eWxlT2JqZWN0UGFydCAqLykge1xuICB2YXIgdXBkYXRlLCByZW1vdmVcbiAgdmFyIHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3N0eWxlWycgKyBzc3JJZEtleSArICd+PVwiJyArIG9iai5pZCArICdcIl0nKVxuXG4gIGlmIChzdHlsZUVsZW1lbnQpIHtcbiAgICBpZiAoaXNQcm9kdWN0aW9uKSB7XG4gICAgICAvLyBoYXMgU1NSIHN0eWxlcyBhbmQgaW4gcHJvZHVjdGlvbiBtb2RlLlxuICAgICAgLy8gc2ltcGx5IGRvIG5vdGhpbmcuXG4gICAgICByZXR1cm4gbm9vcFxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBoYXMgU1NSIHN0eWxlcyBidXQgaW4gZGV2IG1vZGUuXG4gICAgICAvLyBmb3Igc29tZSByZWFzb24gQ2hyb21lIGNhbid0IGhhbmRsZSBzb3VyY2UgbWFwIGluIHNlcnZlci1yZW5kZXJlZFxuICAgICAgLy8gc3R5bGUgdGFncyAtIHNvdXJjZSBtYXBzIGluIDxzdHlsZT4gb25seSB3b3JrcyBpZiB0aGUgc3R5bGUgdGFnIGlzXG4gICAgICAvLyBjcmVhdGVkIGFuZCBpbnNlcnRlZCBkeW5hbWljYWxseS4gU28gd2UgcmVtb3ZlIHRoZSBzZXJ2ZXIgcmVuZGVyZWRcbiAgICAgIC8vIHN0eWxlcyBhbmQgaW5qZWN0IG5ldyBvbmVzLlxuICAgICAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KVxuICAgIH1cbiAgfVxuXG4gIGlmIChpc09sZElFKSB7XG4gICAgLy8gdXNlIHNpbmdsZXRvbiBtb2RlIGZvciBJRTkuXG4gICAgdmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKytcbiAgICBzdHlsZUVsZW1lbnQgPSBzaW5nbGV0b25FbGVtZW50IHx8IChzaW5nbGV0b25FbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KCkpXG4gICAgdXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgZmFsc2UpXG4gICAgcmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgdHJ1ZSlcbiAgfSBlbHNlIHtcbiAgICAvLyB1c2UgbXVsdGktc3R5bGUtdGFnIG1vZGUgaW4gYWxsIG90aGVyIGNhc2VzXG4gICAgc3R5bGVFbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KClcbiAgICB1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KVxuICAgIHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudClcbiAgICB9XG4gIH1cblxuICB1cGRhdGUob2JqKVxuXG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZSAobmV3T2JqIC8qIFN0eWxlT2JqZWN0UGFydCAqLykge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmXG4gICAgICAgICAgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiZcbiAgICAgICAgICBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgdXBkYXRlKG9iaiA9IG5ld09iailcbiAgICB9IGVsc2Uge1xuICAgICAgcmVtb3ZlKClcbiAgICB9XG4gIH1cbn1cblxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHRleHRTdG9yZSA9IFtdXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcbiAgICB0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnRcbiAgICByZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKVxuICB9XG59KSgpXG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcgKHN0eWxlRWxlbWVudCwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG4gIHZhciBjc3MgPSByZW1vdmUgPyAnJyA6IG9iai5jc3NcblxuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcylcbiAgfSBlbHNlIHtcbiAgICB2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcylcbiAgICB2YXIgY2hpbGROb2RlcyA9IHN0eWxlRWxlbWVudC5jaGlsZE5vZGVzXG4gICAgaWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pXG4gICAgaWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG4gICAgICBzdHlsZUVsZW1lbnQuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoY3NzTm9kZSlcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyAoc3R5bGVFbGVtZW50LCBvYmopIHtcbiAgdmFyIGNzcyA9IG9iai5jc3NcbiAgdmFyIG1lZGlhID0gb2JqLm1lZGlhXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwXG5cbiAgaWYgKG1lZGlhKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZSgnbWVkaWEnLCBtZWRpYSlcbiAgfVxuICBpZiAob3B0aW9ucy5zc3JJZCkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoc3NySWRLZXksIG9iai5pZClcbiAgfVxuXG4gIGlmIChzb3VyY2VNYXApIHtcbiAgICAvLyBodHRwczovL2RldmVsb3Blci5jaHJvbWUuY29tL2RldnRvb2xzL2RvY3MvamF2YXNjcmlwdC1kZWJ1Z2dpbmdcbiAgICAvLyB0aGlzIG1ha2VzIHNvdXJjZSBtYXBzIGluc2lkZSBzdHlsZSB0YWdzIHdvcmsgcHJvcGVybHkgaW4gQ2hyb21lXG4gICAgY3NzICs9ICdcXG4vKiMgc291cmNlVVJMPScgKyBzb3VyY2VNYXAuc291cmNlc1swXSArICcgKi8nXG4gICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcbiAgICBjc3MgKz0gJ1xcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsJyArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyAnICovJ1xuICB9XG5cbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzc1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKVxuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSlcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBUcmFuc2xhdGVzIHRoZSBsaXN0IGZvcm1hdCBwcm9kdWNlZCBieSBjc3MtbG9hZGVyIGludG8gc29tZXRoaW5nXG4gKiBlYXNpZXIgdG8gbWFuaXB1bGF0ZS5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBsaXN0VG9TdHlsZXMgKHBhcmVudElkLCBsaXN0KSB7XG4gIHZhciBzdHlsZXMgPSBbXVxuICB2YXIgbmV3U3R5bGVzID0ge31cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldXG4gICAgdmFyIGlkID0gaXRlbVswXVxuICAgIHZhciBjc3MgPSBpdGVtWzFdXG4gICAgdmFyIG1lZGlhID0gaXRlbVsyXVxuICAgIHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdXG4gICAgdmFyIHBhcnQgPSB7XG4gICAgICBpZDogcGFyZW50SWQgKyAnOicgKyBpLFxuICAgICAgY3NzOiBjc3MsXG4gICAgICBtZWRpYTogbWVkaWEsXG4gICAgICBzb3VyY2VNYXA6IHNvdXJjZU1hcFxuICAgIH1cbiAgICBpZiAoIW5ld1N0eWxlc1tpZF0pIHtcbiAgICAgIHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7IGlkOiBpZCwgcGFydHM6IFtwYXJ0XSB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydClcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN0eWxlc1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvbGlzdFRvU3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9saXN0VG9TdHlsZXMuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbmZ1bmN0aW9uIGluamVjdFN0eWxlIChzc3JDb250ZXh0KSB7XG4gIGlmIChkaXNwb3NlZCkgcmV0dXJuXG4gIHJlcXVpcmUoXCIhIXZ1ZS1zdHlsZS1sb2FkZXIhY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4P3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi0zZTAxM2IyYlxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSFzYXNzLWxvYWRlciEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL0Fzc2lnbm1lbnRzLnZ1ZVwiKVxufVxudmFyIG5vcm1hbGl6ZUNvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbnZhciBfX3Z1ZV9zY3JpcHRfXyA9IHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlcj97XFxcImNhY2hlRGlyZWN0b3J5XFxcIjp0cnVlLFxcXCJwcmVzZXRzXFxcIjpbW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAyJVxcXCJdLFxcXCJ1Z2xpZnlcXFwiOnRydWV9fV1dLFxcXCJwbHVnaW5zXFxcIjpbXFxcInRyYW5zZm9ybS1vYmplY3QtcmVzdC1zcHJlYWRcXFwiLFtcXFwidHJhbnNmb3JtLXJ1bnRpbWVcXFwiLHtcXFwicG9seWZpbGxcXFwiOmZhbHNlLFxcXCJoZWxwZXJzXFxcIjpmYWxzZX1dXX0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi9Bc3NpZ25tZW50cy52dWVcIilcbi8qIHRlbXBsYXRlICovXG52YXIgX192dWVfdGVtcGxhdGVfXyA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LTNlMDEzYjJiXFxcIixcXFwiaGFzU2NvcGVkXFxcIjp0cnVlLFxcXCJidWJsZVxcXCI6e1xcXCJ0cmFuc2Zvcm1zXFxcIjp7fX19IS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9Bc3NpZ25tZW50cy52dWVcIilcbi8qIHRlbXBsYXRlIGZ1bmN0aW9uYWwgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9mdW5jdGlvbmFsX18gPSBmYWxzZVxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBpbmplY3RTdHlsZVxuLyogc2NvcGVJZCAqL1xudmFyIF9fdnVlX3Njb3BlSWRfXyA9IFwiZGF0YS12LTNlMDEzYjJiXCJcbi8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xudmFyIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX18gPSBudWxsXG52YXIgQ29tcG9uZW50ID0gbm9ybWFsaXplQ29tcG9uZW50KFxuICBfX3Z1ZV9zY3JpcHRfXyxcbiAgX192dWVfdGVtcGxhdGVfXyxcbiAgX192dWVfdGVtcGxhdGVfZnVuY3Rpb25hbF9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlcy9qcy9jb21wb25lbnRzL0Fzc2lnbm1lbnRzLnZ1ZVwiXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi0zZTAxM2IyYlwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LTNlMDEzYjJiXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9Bc3NpZ25tZW50cy52dWVcbi8vIG1vZHVsZSBpZCA9IC4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvQXNzaWdubWVudHMudnVlXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBkaXNwb3NlZCA9IGZhbHNlXG5mdW5jdGlvbiBpbmplY3RTdHlsZSAoc3NyQ29udGV4dCkge1xuICBpZiAoZGlzcG9zZWQpIHJldHVyblxuICByZXF1aXJlKFwiISF2dWUtc3R5bGUtbG9hZGVyIWNzcy1sb2FkZXI/c291cmNlTWFwIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleD97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtZTlmZmU1MmVcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hc2Fzcy1sb2FkZXIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9QZXJtaXNzaW9ucy52dWVcIilcbn1cbnZhciBub3JtYWxpemVDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKVxuLyogc2NyaXB0ICovXG52YXIgX192dWVfc2NyaXB0X18gPSByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dXSxcXFwicGx1Z2luc1xcXCI6W1xcXCJ0cmFuc2Zvcm0tb2JqZWN0LXJlc3Qtc3ByZWFkXFxcIixbXFxcInRyYW5zZm9ybS1ydW50aW1lXFxcIix7XFxcInBvbHlmaWxsXFxcIjpmYWxzZSxcXFwiaGVscGVyc1xcXCI6ZmFsc2V9XV19IS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vUGVybWlzc2lvbnMudnVlXCIpXG4vKiB0ZW1wbGF0ZSAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX18gPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi1lOWZmZTUyZVxcXCIsXFxcImhhc1Njb3BlZFxcXCI6dHJ1ZSxcXFwiYnVibGVcXFwiOntcXFwidHJhbnNmb3Jtc1xcXCI6e319fSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vUGVybWlzc2lvbnMudnVlXCIpXG4vKiB0ZW1wbGF0ZSBmdW5jdGlvbmFsICovXG52YXIgX192dWVfdGVtcGxhdGVfZnVuY3Rpb25hbF9fID0gZmFsc2Vcbi8qIHN0eWxlcyAqL1xudmFyIF9fdnVlX3N0eWxlc19fID0gaW5qZWN0U3R5bGVcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBcImRhdGEtdi1lOWZmZTUyZVwiXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3RlbXBsYXRlX2Z1bmN0aW9uYWxfXyxcbiAgX192dWVfc3R5bGVzX18sXG4gIF9fdnVlX3Njb3BlSWRfXyxcbiAgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfX1xuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXMvanMvY29tcG9uZW50cy9QZXJtaXNzaW9ucy52dWVcIlxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtZTlmZmU1MmVcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi1lOWZmZTUyZVwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvUGVybWlzc2lvbnMudnVlXG4vLyBtb2R1bGUgaWQgPSAuL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL1Blcm1pc3Npb25zLnZ1ZVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZGlzcG9zZWQgPSBmYWxzZVxuZnVuY3Rpb24gaW5qZWN0U3R5bGUgKHNzckNvbnRleHQpIHtcbiAgaWYgKGRpc3Bvc2VkKSByZXR1cm5cbiAgcmVxdWlyZShcIiEhdnVlLXN0eWxlLWxvYWRlciFjc3MtbG9hZGVyP3NvdXJjZU1hcCEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXg/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTUwZDAzMGJkXFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IXNhc3MtbG9hZGVyIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXN0eWxlcyZpbmRleD0wIS4vUm9sZUNyZWF0ZS52dWVcIilcbn1cbnZhciBub3JtYWxpemVDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKVxuLyogc2NyaXB0ICovXG52YXIgX192dWVfc2NyaXB0X18gPSByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dXSxcXFwicGx1Z2luc1xcXCI6W1xcXCJ0cmFuc2Zvcm0tb2JqZWN0LXJlc3Qtc3ByZWFkXFxcIixbXFxcInRyYW5zZm9ybS1ydW50aW1lXFxcIix7XFxcInBvbHlmaWxsXFxcIjpmYWxzZSxcXFwiaGVscGVyc1xcXCI6ZmFsc2V9XV19IS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vUm9sZUNyZWF0ZS52dWVcIilcbi8qIHRlbXBsYXRlICovXG52YXIgX192dWVfdGVtcGxhdGVfXyA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LTUwZDAzMGJkXFxcIixcXFwiaGFzU2NvcGVkXFxcIjp0cnVlLFxcXCJidWJsZVxcXCI6e1xcXCJ0cmFuc2Zvcm1zXFxcIjp7fX19IS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9Sb2xlQ3JlYXRlLnZ1ZVwiKVxuLyogdGVtcGxhdGUgZnVuY3Rpb25hbCAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX2Z1bmN0aW9uYWxfXyA9IGZhbHNlXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IGluamVjdFN0eWxlXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gXCJkYXRhLXYtNTBkMDMwYmRcIlxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9mdW5jdGlvbmFsX18sXG4gIF9fdnVlX3N0eWxlc19fLFxuICBfX3Z1ZV9zY29wZUlkX18sXG4gIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX19cbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvUm9sZUNyZWF0ZS52dWVcIlxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtNTBkMDMwYmRcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi01MGQwMzBiZFwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvUm9sZUNyZWF0ZS52dWVcbi8vIG1vZHVsZSBpZCA9IC4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvUm9sZUNyZWF0ZS52dWVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbmZ1bmN0aW9uIGluamVjdFN0eWxlIChzc3JDb250ZXh0KSB7XG4gIGlmIChkaXNwb3NlZCkgcmV0dXJuXG4gIHJlcXVpcmUoXCIhIXZ1ZS1zdHlsZS1sb2FkZXIhY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4P3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi0zMTJkM2UzY1xcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSFzYXNzLWxvYWRlciEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL1JvbGVzLnZ1ZVwiKVxufVxudmFyIG5vcm1hbGl6ZUNvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbnZhciBfX3Z1ZV9zY3JpcHRfXyA9IHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlcj97XFxcImNhY2hlRGlyZWN0b3J5XFxcIjp0cnVlLFxcXCJwcmVzZXRzXFxcIjpbW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAyJVxcXCJdLFxcXCJ1Z2xpZnlcXFwiOnRydWV9fV1dLFxcXCJwbHVnaW5zXFxcIjpbXFxcInRyYW5zZm9ybS1vYmplY3QtcmVzdC1zcHJlYWRcXFwiLFtcXFwidHJhbnNmb3JtLXJ1bnRpbWVcXFwiLHtcXFwicG9seWZpbGxcXFwiOmZhbHNlLFxcXCJoZWxwZXJzXFxcIjpmYWxzZX1dXX0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi9Sb2xlcy52dWVcIilcbi8qIHRlbXBsYXRlICovXG52YXIgX192dWVfdGVtcGxhdGVfXyA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LTMxMmQzZTNjXFxcIixcXFwiaGFzU2NvcGVkXFxcIjp0cnVlLFxcXCJidWJsZVxcXCI6e1xcXCJ0cmFuc2Zvcm1zXFxcIjp7fX19IS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9Sb2xlcy52dWVcIilcbi8qIHRlbXBsYXRlIGZ1bmN0aW9uYWwgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9mdW5jdGlvbmFsX18gPSBmYWxzZVxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBpbmplY3RTdHlsZVxuLyogc2NvcGVJZCAqL1xudmFyIF9fdnVlX3Njb3BlSWRfXyA9IFwiZGF0YS12LTMxMmQzZTNjXCJcbi8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xudmFyIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX18gPSBudWxsXG52YXIgQ29tcG9uZW50ID0gbm9ybWFsaXplQ29tcG9uZW50KFxuICBfX3Z1ZV9zY3JpcHRfXyxcbiAgX192dWVfdGVtcGxhdGVfXyxcbiAgX192dWVfdGVtcGxhdGVfZnVuY3Rpb25hbF9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlcy9qcy9jb21wb25lbnRzL1JvbGVzLnZ1ZVwiXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi0zMTJkM2UzY1wiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LTMxMmQzZTNjXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9Sb2xlcy52dWVcbi8vIG1vZHVsZSBpZCA9IC4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvUm9sZXMudnVlXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIk5vdmEuYm9vdGluZygoVnVlLCByb3V0ZXIpID0+IHtcbiAgICBWdWUuY29tcG9uZW50KFwibXVsdGlzZWxlY3RcIiwgcmVxdWlyZShcInZ1ZS1tdWx0aXNlbGVjdFwiKS5kZWZhdWx0KTtcbiAgICByb3V0ZXIuYWRkUm91dGVzKFtcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ2xhcmF2ZWwtbm92YS1nb3Zlcm5vci1yb2xlcycsXG4gICAgICAgICAgICBwYXRoOiAnL2xhcmF2ZWwtbm92YS1nb3Zlcm5vci9yb2xlcycsXG4gICAgICAgICAgICBjb21wb25lbnQ6IHJlcXVpcmUoJy4vY29tcG9uZW50cy9Sb2xlcycpLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnbGFyYXZlbC1ub3ZhLWdvdmVybm9yLXJvbGUtY3JlYXRlJyxcbiAgICAgICAgICAgIHBhdGg6ICcvbGFyYXZlbC1ub3ZhLWdvdmVybm9yL3JvbGVzL2NyZWF0ZScsXG4gICAgICAgICAgICBjb21wb25lbnQ6IHJlcXVpcmUoJy4vY29tcG9uZW50cy9Sb2xlQ3JlYXRlJyksXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdsYXJhdmVsLW5vdmEtZ292ZXJub3ItcGVybWlzc2lvbnMnLFxuICAgICAgICAgICAgcGF0aDogJy9sYXJhdmVsLW5vdmEtZ292ZXJub3IvcGVybWlzc2lvbnMvOnJvbGUnLFxuICAgICAgICAgICAgY29tcG9uZW50OiByZXF1aXJlKCcuL2NvbXBvbmVudHMvUGVybWlzc2lvbnMnKSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ2xhcmF2ZWwtbm92YS1nb3Zlcm5vci1hc3NpZ25tZW50cycsXG4gICAgICAgICAgICBwYXRoOiAnL2xhcmF2ZWwtbm92YS1nb3Zlcm5vci9hc3NpZ25tZW50cycsXG4gICAgICAgICAgICBjb21wb25lbnQ6IHJlcXVpcmUoJy4vY29tcG9uZW50cy9Bc3NpZ25tZW50cycpLFxuICAgICAgICB9LFxuICAgIF0pXG59KVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2pzL3Rvb2wuanMiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL3Nhc3MvdG9vbC5zY3NzXG4vLyBtb2R1bGUgaWQgPSAuL3Jlc291cmNlcy9zYXNzL3Rvb2wuc2Nzc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9