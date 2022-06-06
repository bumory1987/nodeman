(() => {
  // src/main.js
  var obj = [
    {
      foo: {
        bar: {
          baz: 1
        }
      }
    },
    {},
    {
      foo: {
        bar: {}
      }
    },
    {
      foo: {}
    }
  ];
  console.log(obj.map((obj2) => {
    var _a, _b;
    return (_b = (_a = obj2.foo) == null ? void 0 : _a.bar) == null ? void 0 : _b.baz;
  }));
})();
