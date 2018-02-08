module.exports = {
    "parser": "babel-eslint",
    "plugins": [
        "flowtype",
        "react"
    ],
    "parserOptions": {
        "ecmaVersion": 7,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "rules": {
        "eqeqeq": [2, "allow-null"],
        "valid-jsdoc": "off",
        "require-jsdoc": "off",
        "no-var": "off",
        "max-len": "off",
        "no-console": [1],
        "react/prop-types": [0, {}]
    },
    "env": {
        "browser": true,
        "node": true,
        "commonjs": true,
        "jquery": true,
        "meteor": true
    }
};