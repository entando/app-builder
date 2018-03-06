const path = require('path');
const srcPath = path.resolve(__dirname, 'src');

module.exports = {
    "parser": "babel-eslint",
    "extends": "airbnb",
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
      }]
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
