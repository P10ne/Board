const { addBabelPlugins, override } = require("customize-cra");
module.exports = override(
    ...addBabelPlugins(
        "babel-plugin-transform-typescript-metadata"
    )
);