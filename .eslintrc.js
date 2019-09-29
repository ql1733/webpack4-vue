module.exports = {
    "parserOptions":{
        "ecmaVersion": 6,
        "sourceType": "module",
        "parser": "babel-eslint",
    },  
    "extends": [
        "standard",
         "plugin:vue/recommended"
    ],
    "plugins":[
        "html",
        "vue"
    ],
    "env": {
        "browser": true,
        "node": true
    },
    "rules": {
        "no-new": "off"
    }
};