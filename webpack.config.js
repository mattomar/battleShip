const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "development", // Sets the mode to development
    entry: {
        bundle: path.resolve(__dirname, 'src/index.js'), // Entry point of your application
    },
    output: {
        path: path.resolve(__dirname, 'dist'), // Output directory for bundled files
        filename: '[name].js', // Output filename (using [name] placeholder for entry point name)
    },

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'], // Process CSS files
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource', // Process image files as assets
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource', // Process font files as assets
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: "--", // HTML title
            filename: "index.html", // Output HTML filename
            template: 'src/template.html' // Template HTML file to use
        }),

        new CopyPlugin({
            patterns: [
                { from: 'src/style.css', to: 'style.css' }, // Copy CSS file to output directory
                { from: 'src/images', to: 'images' }, // Copy images folder to output directory
                { from: 'src/fonts', to: 'fonts' } // Copy fonts folder to output directory
            ],
        }),
    ],
};