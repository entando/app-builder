const path = require('path');
const srcPath = path.resolve(__dirname, 'src');

module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "plugins": [
        "react-hooks"
      ],    
    "rules": {
        "strict": 0,
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "import/no-extraneous-dependencies": "off",
        "jsx-a11y/anchor-is-valid": "off",
        "jsx-a11y/label-has-for": [ 2, {
          "components": [ "Label" ],
          "required": {
              "every": [ "id" ]
          },
          "allowChildren": true
      }],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn"
    },
    "settings": {
        "import/resolver": {
            "node": {
                "moduleDirectory": ["node_modules", "src", "sass", "test"]
            }
        }
    },
    "env": {
        "browser": true,
        "node": true,
        "jest": true
    }
};
