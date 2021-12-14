/* eslint-disable */
// const path = require("path")

// exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
//   if (stage === 'build-html') {
//     actions.setWebpackConfig({
//       module: {
//         rules: [
//           {
//             test: path.resolve(__dirname, '/node_modules/faya-websocket/lib/faye/eventsource.js'),
//             use: loaders.null(),
//           }, {
//             test: path.resolve(__dirname, '/node_modules/faya-websocket/lib/faye/websocket.js'),
//             use: loaders.null(),
//           }, {
//             test: path.resolve(__dirname, '/node_modules/@babel/runtime/helpers/inheritsLoose.js'),
//             use: loaders.null(),
//           }, {
//             test: path.resolve(__dirname, '/.cache/static-entry.js'),
//             use: loaders.null(),
//           }
//         ],
//       },
//     })
//   }
// }
