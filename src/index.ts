import {ActionRow, Button, ButtonStyle, Client, Embed, Modal, TextInput, TextInputStyle} from "discord-http-interactions";
import "dotenv/config";
const client = new Client({
    token: process.env.DISCORD_TOKEN as string,
    publicKey: process.env.DISCORD_PUBLICKEY as string,
    port: parseInt(process.env.DISCORD_PORT as string),
    endpoint: process.env.DISCORD_ENDPOINT as string
});

client.on("ready", () => {
    console.log("READY!");
});


client.on("interaction", interaction => {
    if(interaction.commandName === "seura"){
        interaction.modal(
            new Modal()
                .setTitle("Peliseuran haku")
                .setCustomId(`ilmoitus-${interaction.member.user.id}-${Date.now()}`)
                .setComponents([
                    new ActionRow()
                        .setComponents([
                            new TextInput()
                                .setLabel("Pelin nimi")
                                .setRequired(true)
                                .setCustomId("peli-nimi")
                                .setPlaceholder("Counter-Strike: Global Offensive")
                                .setStyle(TextInputStyle.Short)
                        ]),
                    new ActionRow()
                        .setComponents([
                            new TextInput()
                                .setLabel("Seuran koko")
                                .setRequired(true)
                                .setCustomId("peli-koko")
                                .setPlaceholder("5")
                                .setStyle(TextInputStyle.Short)
                                .setMaxLength(2)
                        ]),
                    new ActionRow()
                        .setComponents([
                            new TextInput()
                                .setLabel("Muuta infoa")
                                .setRequired(false)
                                .setCustomId("peli-kuvaus")
                                .setPlaceholder("Pommi midis")
                                .setStyle(TextInputStyle.Paragraph)
                        ])
                ])
        );
    } else if(interaction.customId.split("-")[0] === "ilmoitus"){
        const peli = interaction.data.components[0].components[0].value;
        const koko = interaction.data.components[1].components[0].value;
        const kuvaus = interaction.data.components[2].components[0].value;
        if(isNaN(koko)) return;
        interaction.reply({
            embeds: [
                new Embed()
                    .setTitle(`${peli} 1/${koko}`)
                    .setTimestamp(new Date().toISOString())
                    .setColor(0xbbffbb)
                    .setFields([
                        {
                            name: "Lisäinfo",
                            value: kuvaus ?? "Ei lisäinfoa."
                        }, {
                            name: "Pelaajat",
                            value: `<@${interaction.member.user.id}>`
                        }
                    ])
            ],
            components: [
                new ActionRow()
                    .setComponents([
                        new Button()
                            .setLabel("Liity")
                            .setDisabled(true)
                            .setStyle(ButtonStyle.Success)
                            .setCustomId("liity"),
                        new Button()
                            .setLabel("Poistu")
                            .setDisabled(true)
                            .setStyle(ButtonStyle.Secondary)
                            .setCustomId("poistu"),
                        new Button()
                            .setLabel("Poista")
                            .setDisabled(true)
                            .setStyle(ButtonStyle.Danger)
                            .setCustomId("poista")
                    ])
            ]
        });
    }
});

client.login();