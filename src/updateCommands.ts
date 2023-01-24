import {Client} from "discord-http-interactions";
import "dotenv/config";
const client = new Client({
    token: process.env.DISCORD_TOKEN as string,
    publicKey: process.env.DISCORD_PUBLICKEY as string,
    port: parseInt(process.env.DISCORD_PORT as string),
    endpoint: process.env.DISCORD_ENDPOINT as string
});

client.registerCommands(process.env.DISCORD_ID as string,[
    {
        name: "seura",
        description: "Luo peliseuran etsimisilmoitus."
    }
]);