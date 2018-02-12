const path = require('path');
const srcPath = path.resolve(__dirname, 'src');

module.exports = {
    "extends": "airbnb",
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "import/no-extraneous-dependencies": "off"
    },
    "settings": {
        "import/resolver": {
            "node": {
                "moduleDirectory": ["node_modules", "src"]
            }
        }
    },
    "env": {
        "browser": true,
        "node": true,
        "jest": true
    }
};
