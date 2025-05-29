let poke1, poke2;
let poke_id_1 = localStorage.getItem("pokemon_number");
let poke_id_2 = (Math.floor(Math.random() * 151) + 1);

document.getElementById("mypokemon").src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${poke_id_1}.gif`;
document.getElementById("theirpokemon").src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${poke_id_2}.gif`;

let hpval1 = document.getElementById("hpval1");
let hpval2 = document.getElementById("hpval2");

FetchPokeData1(poke_id_1);
FetchPokeData2(poke_id_2);

HP(hpval1);
HP(hpval2);

let turn=0;

function HP(hpval) {
    if (hpval.value > (0.6 * hpval.max)) {
        hpval.style.accentColor = "#36a854";
    } else if (hpval.value > (0.3 * hpval.max)) {
        hpval.style.accentColor = "yellow";
    } else {
        hpval.style.accentColor = "red";
    }
}

async function FetchPokeData1(id) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    let data = await response.json();
    poke1 = data.name.toUpperCase();
    hpval1.max = data.stats[0].base_stat;
    hpval1.value=hpval1.max;
    document.getElementById("name1").innerText = poke1;

    document.getElementById("move1").innerText = data.moves[0].move.name;
    document.getElementById("move1").addEventListener("click", () => decide_turn_1(0, turn, data));

    document.getElementById("move2").innerText = data.moves[1].move.name;
    document.getElementById("move2").addEventListener("click", () => decide_turn_1(1, turn, data));

    document.getElementById("move3").innerText = data.moves[2].move.name;
    document.getElementById("move3").addEventListener("click", () => decide_turn_1(2, turn, data));

    document.getElementById("move4").innerText = data.moves[3].move.name;
    document.getElementById("move4").addEventListener("click", () => decide_turn_1(3, turn, data));
}

async function FetchPokeData2(id) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    let data = await response.json();
    poke2 = data.name.toUpperCase();
    hpval2.max = data.stats[0].base_stat;
    hpval2.value=hpval2.max;
    document.getElementById("name2").innerText = poke2;

    document.getElementById("move5").innerText = data.moves[0].move.name;
    document.getElementById("move5").addEventListener("click", () => decide_turn_2(0, turn, data));

    document.getElementById("move6").innerText = data.moves[1].move.name;
    document.getElementById("move6").addEventListener("click", () => decide_turn_2(1, turn, data));

    document.getElementById("move7").innerText = data.moves[2].move.name;
    document.getElementById("move7").addEventListener("click", () => decide_turn_2(2, turn, data));

    document.getElementById("move8").innerText = data.moves[3].move.name;
    document.getElementById("move8").addEventListener("click", () => decide_turn_2(3, turn, data));

}

function decide_turn_1(i, myturn, data){
    if (myturn===0){
        Battle(poke_id_1, poke_id_2, data.moves[i].move.name);
        turn=1;
        console.log(turn);
    } else {
        document.getElementById("log").innerText = "Not your turn";
    }
}

function decide_turn_2(i, myturn, data){
    if (myturn===1){
        Battle(poke_id_2, poke_id_1, data.moves[i].move.name);
        turn=0;
    } else {
        document.getElementById("log").innerText = "Not your turn";
    }
}

async function DamageRelations(type, DefenderType) {
    let response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    let data = await response.json();

    let multiplier = 1.0;

    DefenderType.forEach(element => {
        if (data.damage_relations.double_damage_to.some(element => element.name === type)) {
            multiplier *= 2;
        } else if (data.damage_relations.half_damage_to.some(element => element.name === type)) {
            multiplier *= 0.5;
        } else if (data.damage_relations.no_damage_to.some(element => element.name === type)) {
            multiplier *= 0;
        }
    });
    return multiplier;
}

async function Battle(attacker_id, defender_id, move) {
    let poke_attacker = await fetch(`https://pokeapi.co/api/v2/pokemon/${attacker_id}`);
    let poke_attack_stats = await poke_attacker.json();

    let poke_defender = await fetch(`https://pokeapi.co/api/v2/pokemon/${defender_id}`);
    let poke_defend_stats = await poke_defender.json();

    AttackerName = poke_attack_stats.name;

    let damage;
    let response = await fetch(`https://pokeapi.co/api/v2/move/${move}`);
    let move_data = await response.json();
    let multiplier=await DamageRelations(poke_attack_stats.types[0].type.name, poke_defend_stats.types);
    damage = (move_data.accuracy * move_data.power/1000* poke_attack_stats.stats[1].base_stat/ poke_defend_stats.stats[2].base_stat +(Math.floor(Math.random() * 3))) * multiplier;

    let EditHP, bool;
    if (defender_id === poke_id_1) {
        EditHP = hpval1.value;
        bool = 1;
    } else {
        EditHP = hpval2.value;
        bool = 0;
    };

    EditHP -= damage;

    if (bool === 1) {
        hpval1.value = EditHP;
        HP(hpval1);
    } else {
        hpval2.value = EditHP;
        HP(hpval2);
    };

    document.getElementById("log").innerText = `${AttackerName} used ${move}.`
    console.log(`damage inflicted =${damage}`);
} 

