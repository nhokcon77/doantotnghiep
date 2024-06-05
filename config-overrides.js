const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
  alias({
    '@services': 'src/services',
	'@common': 'src/common',
	"@assets": "./src/assets",
	"@components": "./src/components",
	"@pages": "./src/pages",
	"@routes": "./src/routes",
	"@styles": "./src/styles",
	"@redux": "./src/redux",
	"@utils": "./src/utils"
  })(config);

  return config;
}; 