import init, { gen_html_basique, gen_objective_constraints, resoudre_basique } from "./_lpweb.js"

function getElement(id) {
    return document.getElementById(id);
}

function onResoudre(nbVariables, nbContraintes) {
    // Récupération des données nécessaire à la résolution
    // coefficients de la fonction objective
    const coeffs_obj = Array.from(document.querySelectorAll('[id^="obj_coeff_x_"]'))
        .map(input => Number.parseFloat(input.value) || 0);
    // maximize ou minimize
    const direction = document.querySelector('input[name="max_ou_min"]:checked').value;
    // Domaines de définition des variables
    const domains = [];
    for (let i = 1; i <= nbVariables; i++) {
        const min = Number.parseFloat(document.getElementById(`obj_min_x_${i}`)?.value) || 0;
        const maxVal = document.getElementById(`obj_max_x_${i}`)?.value;
        const max = (maxVal === "" || maxVal === null) ? Number.MAX_VALUE : Number.parseFloat(maxVal);
        domains.push([min, max]);
    }
    // Contraintes (liste de dico - {coeffs: [], sign: "≤", rhs: 4.0})
    const constraints = [];
    for (let j = 1; j <= nbContraintes; j++) {
        const coeffs = [];
        for (let i = 1; i <= nbVariables; i++) {
            coeffs.push(Number.parseFloat(document.getElementById(`c_${j}_coeff_${i}`).value) || 0);
        }
        const sign = document.getElementById(`c_${j}_sign`).value;
        const rhs = Number.parseFloat(document.getElementById(`c_${j}_rhs`).value) || 0;
        constraints.push({ coeffs, sign, rhs });
    }
    // séparation des éléments 
    const constraint_coeffs = constraints.map(c => c.coeffs);
    const constraint_signs  = constraints.map(c => c.sign) ;
    const constraint_rhs    = constraints.map(c => c.rhs);
    // fin de récupération des éléments

    getElement("resultat_output").innerText = resoudre_basique(
    coeffs_obj,
    direction,
    JSON.stringify(domains),
    JSON.stringify(constraint_coeffs),
    JSON.stringify(constraint_signs),
    constraint_rhs,
    nbVariables,
    nbContraintes
);
}

function onValiderParams() {
    const nbVariables = getElement("nb_var").value;
    const nbContraintes = getElement("nb_contraintes").value;
    getElement("parametres_et_contraintes_output").innerHTML = gen_objective_constraints(nbVariables, nbContraintes);
    getElement("resoudre").addEventListener("click", () => onResoudre(nbVariables, nbContraintes));
}

function onModeBasique() {
    getElement("mode_output").innerHTML = gen_html_basique();
    getElement("valider_var_basique").addEventListener("click", onValiderParams);
}

async function main() {
    await init();
    getElement("mode_basique").addEventListener("click", onModeBasique);
}

await main();
