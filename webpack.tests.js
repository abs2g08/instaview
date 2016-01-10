var context = require.context('./src/app/tests', true, /-test\.js$/);
context.keys().forEach(context);
