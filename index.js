require('dotenv').config();

const express = require('express');

const connectToDB = require('./database/config');
const { loginClients } = require('./discord/clients');

const app = express();
    
const routes = {
    auth: '/auth',
    bot: '/bot'
};

(async() => 
{
    await connectToDB();
    await loginClients();
})();

app.use(express.json());

app.use(routes.auth, require('./router/auth'));
app.use(routes.bot, require('./router/bot'));

app.listen(process.env.PORT, () =>
{
    console.log(`Server running on port: ${process.env.PORT}`);
});