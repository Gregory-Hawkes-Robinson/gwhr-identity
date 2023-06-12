const { addAfterLoader, removeLoaders, loaderByName, getLoaders, throwUnexpectedConfigError } = require('@craco/craco');
const path = require('path');
const fs = require('fs');
const cracoBabelLoader = require('craco-babel-loader');

const throwError = (message) =>
    throwUnexpectedConfigError({
        packageName: 'craco',
        githubRepo: 'gsoft-inc/craco',
        message,
        githubIssueQuery: 'webpack',
    });

module.exports = {
    webpack: {
        configure: (webpackConfig, { paths }) => {
            const { hasFoundAny, matches } = getLoaders(webpackConfig, loaderByName('babel-loader'));
            if (!hasFoundAny) throwError('failed to find babel-loader');

            console.log('removing babel-loader');
            const { hasRemovedAny, removedCount } = removeLoaders(webpackConfig, loaderByName('babel-loader'));
            if (!hasRemovedAny) throwError('no babel-loader to remove');
            if (removedCount !== 2) throwError('had expected to remove 2 babel loader instances');

            console.log('adding ts-loader');

            const tsLoader = {
                test: /\.(js|mjs|jsx|ts|tsx)$/,
                include: paths.appSrc,
                loader: require.resolve('ts-loader'),
                options: { transpileOnly: true, projectReferences: true },
            };

            const { isAdded: tsLoaderIsAdded } = addAfterLoader(webpackConfig, loaderByName('url-loader'), tsLoader);
            if (!tsLoaderIsAdded) throwError('failed to add ts-loader');
            console.log('added ts-loader');

            console.log('adding non-application JS babel-loader back');
            const { isAdded: babelLoaderIsAdded } = addAfterLoader(
                webpackConfig,
                loaderByName('ts-loader'),
                matches[1].loader // babel-loader
            );
            if (!babelLoaderIsAdded) throwError('failed to add back babel-loader for non-application JS');
            console.log('added non-application JS babel-loader back');

            return webpackConfig;
        },
    },
};

// manage relative paths to packages
const appDirectory = fs.realpathSync(process.cwd())
const resolvePackage = relativePath => path.resolve(appDirectory, relativePath)

module.exports = {
    webpack: {
        configure: webpackConfig => {
            const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
                ({ constructor }) => constructor && constructor.name === 'ModuleScopePlugin'
            );

            webpackConfig.resolve.plugins.splice(scopePluginIndex, 1);
            return webpackConfig;
        }
    },
    plugins: [
        {
            plugin: cracoBabelLoader,
            options: {
                includes: [
                    resolvePackage('./gwhr.identity.ui'),
                    resolvePackage('../gwhr.identity.ui.components'),
                    resolvePackage('../gwhr.identity.shared.dtos'),
                    resolvePackage('../gwhr.identity.shared.client'),
                    resolvePackage('../gwhr.bcl.shared')
                    // resolvePackage('node_modules/another-package-to-transpile'),
                ],
            },
        },
    ]
};