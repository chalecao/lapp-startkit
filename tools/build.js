/**
 * rollup startkit (http://www.fed123.com/)
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 * API refer： http://www.rollupjs.com/javascript-api/
 */

'use strict';
const fs = require('fs');
const del = require('del');
const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const postcss = require('rollup-plugin-postcss');
const uglify = require('rollup-plugin-uglify').uglify;
const minify = require('uglify-es').minify;
const buble = require('rollup-plugin-buble');
// PostCSS plugins
const simplevars = require('postcss-simple-vars');
const nested = require('postcss-nested');
const cssnext = require('postcss-cssnext');
const cssnano = require('cssnano');
const pkg = require('../package.json');

let promise = Promise.resolve();

// Clean up the output directory
promise = promise.then(() => del(['dist/*']));

// Compile source code into a distributable format with Babel
['es', 'cjs', 'umd'].forEach((format) => {
    promise = promise.then(() => rollup.rollup({
        input: 'src/index.js',
        external: Object.keys(pkg.dependencies),
        plugins: [
            postcss({
                plugins: [
                    simplevars(),
                    nested(),
                    cssnext({ warnForDuplicates: false, }),
                    cssnano()],
                extensions: ['.css']
            }),
            babel(Object.assign({
                babelrc: false,
                exclude: 'node_modules/**',
                runtimeHelpers: true,
                presets: [[
                    'env',
                    {
                        'modules': false
                    }
                ]],
                plugins: [
                    ['transform-react-jsx', {
                        'pragma': 'l'
                    }], "external-helpers"
                ]
            })),
            buble(),
            uglify({ mangle: { toplevel: true } }, minify)
        ]
    }).then(bundle => bundle.write({
        file: `dist/${format === 'cjs' ? 'index' : `index.${format}`}.js`,
        format,
        sourceMap: true,
        name: format === 'umd' ? pkg.name : undefined,
    })));
});

// Copy package.json and LICENSE.txt
promise = promise.then(() => {
    delete pkg.private;
    delete pkg.devDependencies;
    delete pkg.scripts;
    delete pkg.eslintConfig;
    delete pkg.babel;
    fs.writeFileSync('dist/package.json', JSON.stringify(pkg, null, '  '), 'utf-8');
    fs.writeFileSync('dist/LICENSE.txt', fs.readFileSync('LICENSE.txt', 'utf-8'), 'utf-8');
    fs.writeFileSync('dist/index.html', fs.readFileSync('src/index.html', 'utf-8'), 'utf-8');
    fs.writeFileSync('dist/index.css', fs.readFileSync('src/index.css', 'utf-8'), 'utf-8');
});

promise.catch(err => console.error(err.stack)); // eslint-disable-line no-console
