const PLUGIN_NAME = 'AllInStylePlugin'

const mapper = {
    afterEmit: function(...args) {
        console.log(args.length, args)
    }
}

class AllInStylePlugin {
    // Define `apply` as its prototype method which is supplied with compiler as its argument
    apply(compiler) {
        // Specify the event hook to attach to

        // console.log(1111, Object.keys(compiler.hooks))

        // Object.keys(mapper).forEach(hook => {
        //     compiler.hooks[hook].tap(PLUGIN_NAME, mapper[hook])
        // })

        // Object.keys(compiler.hooks).forEach(hook => {
        //     compiler.hooks[hook].tap(PLUGIN_NAME, (compilation) => {
        //         console.log(0, hook, compilation ? Object.keys(compilation.hooks ? compilation.hooks : {}) : compilation)
        //     })
        // })

        // compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation, callback) => {
        //     // console.log(
        //     //     2222,
        //     //     Object.keys(compilation.hooks)
        //     // );
        //     compilation.plugin('succeedModule', data => {
        //         if(!/^\!\!/.test(data.rawRequest) && /\.css$/.test(data.rawRequest)) {
        //             console.log(3333, data.context, data.rawRequest, data.resource)
        //             // data.parser.hooks.import.tap((statement, source) => {
        //             //     console.log(4444, statement)
        //             // })
        //             console.log(344444, data)
        //             // data.parser.plugin('import', (statement, source) => {
        //             //     console.log(4444, statement)
        //             // })
        //         }
        //     })
        // })
        // compiler.hooks.afterCompile.tap(PLUGIN_NAME, (compilation, callback) => {
        //     console.log(
        //         2222,
        //         Object.keys(compilation.hooks)
        //     );
        //     compilation.hooks.buildModule.tap(PLUGIN_NAME, data => {
        //         console.log(3333, data)
        //         // if(!/^\!\!/.test(data.rawRequest) && /\.css$/.test(data.rawRequest)) {
        //         //     console.log(3333, data.context, data.rawRequest, data.resource)
        //         //     // data.parser.hooks.import.tap((statement, source) => {
        //         //     //     console.log(4444, statement)
        //         //     // })
        //         //     console.log(344444, data)
        //         //     // data.parser.plugin('import', (statement, source) => {
        //         //     //     console.log(4444, statement)
        //         //     // })
        //         // }
        //     })
        // })
        

        // compiler.hooks.emit.tapAsync(
        //     PLUGIN_NAME,
        //     (compilation, callback) => {
        //         console.log('This is an example plugin!');
        //         console.log(
        //             'Here’s the `compilation` object which represents a single build of assets:',
        //             // Object.keys(compilation)
        //             Object.keys(compilation.assets)
        //         );

        //         // Manipulate the build using the plugin API provided by webpack
        //         // compilation.addModule(/* ... */);

        //         callback();
        //     }
        // );
    }
}

module.exports = AllInStylePlugin