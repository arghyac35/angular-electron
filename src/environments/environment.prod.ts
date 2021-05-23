const packageJson = require('../../package.json');

export const AppConfig = {
  production: true,
  environment: 'PROD',
  i18nPrefix: '.',
  test: false,
  versions: {
    app: packageJson.version,
    angular: packageJson.devDependencies['@angular/core'],
    ngrx: packageJson.dependencies['@ngrx/store'],
    material: packageJson.dependencies['@angular/material'],
    bootstrap: packageJson.dependencies.bootstrap,
    rxjs: packageJson.devDependencies.rxjs,
    ngxtranslate: packageJson.devDependencies['@ngx-translate/core'],
    fontAwesome: packageJson.dependencies['@fortawesome/fontawesome-free'],
    angularCli: packageJson.devDependencies['@angular/cli'],
    typescript: packageJson.devDependencies['typescript'],
    eslint: packageJson.devDependencies['eslint']
  }
};
