import __module from "module";
const __load = __module._load;
__module._load = function (request) {
  if (request === "process") return global.process;
  return __load.apply(this, arguments);
};