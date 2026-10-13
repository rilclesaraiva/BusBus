// BusBus Experimental Modular (B.E.M.) — módulo "messages.js"
// Copyright (C) 2026 rilclesaraiva — licenciado sob GNU GPLv3.
// Texto completo: https://github.com/rilclesaraiva/BusBus/blob/main/LICENSE

import { el, render } from "./utils.js";
import { infoIcon } from "./icons.js";
import { destroyLeafletMap } from "./map.js";
import { state } from "./state.js";
import { updateHeaderAndNav } from "./nav.js";

export const SYSTEM_MESSAGES = [
{
id: "tarifa-domingo-feriado",
title: "Passagem gratuita aos domingos e feriados",
body: "Em Belém, o transporte público costuma ser gratuito aos domingos e feriados. As regras podem mudar de tempos em tempos, então vale confirmar nos canais oficiais se ainda está valendo antes de contar com isso."
},
{
id: "tarifa-eleicao",
title: "Dias de eleição já tiveram transporte gratuito",
body: "Em eleições anteriores, o transporte público em Belém já foi gratuito no dia da votação. Isso não é garantido em toda eleição — fique de olho nos avisos oficiais perto da data."
},
{
id: "frota-reduzida",
title: "Frota reduzida aos domingos, feriados e de madrugada",
body: "Nesses períodos costuma circular bem menos ônibus que num dia útil comum. Se notar poucas linhas com GPS ativo na sua parada, pode não ser falha do app — é esperado ter menos carros rodando. Vale conferir a grade de horário programada da linha."
},
{
id: "desvio-rota",
title: "Desvios de rota podem acontecer",
body: "Obras, eventos, enchentes ou outras situações podem fazer um ônibus sair temporariamente do trajeto de costume. O BusBus mostra a posição real do veículo via GPS quando ele está transmitindo — se o ônibus aparecer fora do traçado esperado no mapa, é bem provável que seja um desvio em andamento, não um erro do app."
}
];

export function latestMessageId(){ return SYSTEM_MESSAGES.length ? SYSTEM_MESSAGES[0].id : null; }

export function hasUnseenMessages(){
try{
const seen = localStorage.getItem("busbus_messages_seen");
return latestMessageId() !== null && seen !== latestMessageId();
}catch(e){ return false; }
}

export function markMessagesSeen(){
try{ localStorage.setItem("busbus_messages_seen", latestMessageId() || ""); }catch(e){}
updateBellDot();
}

export function updateBellDot(){
const dot = el("bellDot");
if(dot) dot.classList.toggle("show", hasUnseenMessages());
}

export function renderMessagesScreen(){
destroyLeafletMap();
state.view = "messages";
updateHeaderAndNav("messages");
el("subtitle").textContent = "Mensagens do sistema";
markMessagesSeen();
const cards = SYSTEM_MESSAGES.map(m => `
<div class="messageCard">
<div class="messageTitle">${m.title}</div>
<div class="messageBody">${m.body}</div>
</div>`).join("");
render(`
<section>
<div class="status" style="margin:0 0 14px;">${infoIcon}&nbsp;Avisos mantidos pela equipe do BusBus — não é um feed oficial em tempo real da operadora.</div>
${cards}
</section>
`);
}
