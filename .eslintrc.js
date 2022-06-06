module.exports = {
  root : true, 
  parserOption: {
    ecmaVersion: 2020,
  } ,
  env: {
    node :true
  },
  extends: ["airbnb-base", "plugin:node/recommended", "prettier"],
}
