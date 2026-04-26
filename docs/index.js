import init, {  gen_html_lineaire, gen_objective_constraints,
                gen_objective_constraints_quadratique,
                resoudre_basique, resoudre_quadratique } from "./lpweb.js"

const getElement = id => document.getElementById(id);
const parseVal = val => Number.parseFloat(val) || 0;

function getDirection() {
    return document.querySelector('input[name="max_ou_min"]:checked').value;
}

function getCoeffsObj() {
    return Array.from(document.querySelectorAll('[id^="obj_coeff_x_"]'))
        .map(input => parseVal(input.value));
}

function getCoeffsObjQuadratique(nbVariables) {
    // Matrice P (termes quadratiques)
    const P = Array.from({ length: nbVariables }, () => new Array(nbVariables).fill(0));
    for (let i = 0; i < nbVariables; i++) {
        P[i][i] = parseVal(getElement(`q_${i+1}_${i+1}`)?.value) * 2 ;
        for (let j = i + 1; j < nbVariables; j++) {
            const v = parseVal(getElement(`q_${i+1}_${j+1}`)?.value);
            P[i][j] = v ;
            P[j][i] = v ;
        }
    }
    // Vecteur q (termes linéaires)
    const q = Array.from({ length: nbVariables }, (_, i) =>
        parseVal(getElement(`q_lin_${i+1}`)?.value)
    );
    return { P, q };
}

function getDomains(nbVariables) {
    return Array.from({ length: nbVariables }, (_, i) => {
        const min = parseVal(getElement(`obj_min_x_${i + 1}`)?.value);
        const maxVal = getElement(`obj_max_x_${i + 1}`)?.value;
        const max = (maxVal === "" || maxVal === null) ? Number.MAX_VALUE : parseVal(maxVal);
        return [min, max];
    });
}

function getConstraints(nbVariables, nbContraintes) {
    return Array.from({ length: nbContraintes }, (_, j) => ({
        coeffs: Array.from({ length: nbVariables }, (_, i) =>
            parseVal(getElement(`c_${j + 1}_coeff_${i + 1}`)?.value)),
        sign: getElement(`c_${j + 1}_sign`).value,
        rhs: parseVal(getElement(`c_${j + 1}_rhs`)?.value),
    }));
}

function onResoudre(nbVariables, nbContraintes) {
    const constraints = getConstraints(nbVariables, nbContraintes);
    getElement("resultat_output").innerText = resoudre_basique(
        getCoeffsObj(),
        getDirection(),
        JSON.stringify(getDomains(nbVariables)),
        JSON.stringify(constraints.map(c => c.coeffs)),
        JSON.stringify(constraints.map(c => c.sign)),
        constraints.map(c => c.rhs),
        nbVariables,
        nbContraintes
    );
}

function onResoudreQuadratique(nbVariables, nbContraintes) {
    const constraints = getConstraints(nbVariables, nbContraintes);
    const { P, q } = getCoeffsObjQuadratique(nbVariables);

    getElement("resultat_output").innerText = resoudre_quadratique(
        JSON.stringify(P),
        q,
        getDirection(),
        JSON.stringify(getDomains(nbVariables)),
        JSON.stringify(constraints.map(c => c.coeffs)),
        JSON.stringify(constraints.map(c => c.sign)),
        constraints.map(c => c.rhs),
        nbVariables,
        nbContraintes
    );
}

function onDual(nbVariables, nbContraintes) {
    const coeffs_obj  = getCoeffsObj();
    const direction   = getDirection();
    const constraints = getConstraints(nbVariables, nbContraintes);

    const dualNbVariables   = nbContraintes;
    const dualNbContraintes = nbVariables;
    const dualDirection     = direction === "Maximize" ? "Minimize" : "Maximize";
    const dualCoeffsObj     = constraints.map(c => c.rhs);
    const dualRhs           = coeffs_obj;
    const dualSign          = direction === "Maximize" ? "≥" : "≤";
    const dualCoeffs        = Array.from({ length: nbVariables }, (_, i) =>
        constraints.map(c => c.coeffs[i]));

    attachForm(dualNbVariables, dualNbContraintes);

    getElement("nb_var").value = dualNbVariables;
    getElement("nb_contraintes").value = dualNbContraintes;
    getElement(dualDirection === "Maximize" ? "maximisation" : "minimisation").checked = true;

    dualCoeffsObj.forEach((v, i) => { getElement(`obj_coeff_x_${i + 1}`).value = v; });
        Array.from({ length: dualNbVariables }).forEach((_, i) => {
        getElement(`obj_min_x_${i + 1}`).value = 0;
        getElement(`obj_max_x_${i + 1}`).value = "";
    });

    dualCoeffs.forEach((row, j) => {
        row.forEach((v, i) => getElement(`c_${j + 1}_coeff_${i + 1}`).value = v);
        getElement(`c_${j + 1}_sign`).value = dualSign;
        getElement(`c_${j + 1}_rhs`).value = dualRhs[j];
    });
}

function attachForm(nbVariables, nbContraintes) {
    getElement("parametres_et_contraintes_output").innerHTML =
        gen_objective_constraints(nbVariables, nbContraintes);
    getElement("resoudre").addEventListener("click", () => onResoudre(nbVariables, nbContraintes));
    getElement("dual").addEventListener("click", () => onDual(nbVariables, nbContraintes));
}

function attachForm_quadratique(nbVariables, nbContraintes) {
    getElement("parametres_et_contraintes_output").innerHTML =
        gen_objective_constraints_quadratique(nbVariables, nbContraintes);
    getElement("resoudre").addEventListener("click", () => onResoudreQuadratique(nbVariables, nbContraintes));
}

function onValiderParams() {
    const nbVariables   = Number.parseInt(getElement("nb_var").value);
    const nbContraintes = Number.parseInt(getElement("nb_contraintes").value);
    attachForm(nbVariables, nbContraintes);
}

function onValiderParams_quadratique() {
    const nbVariables   = Number.parseInt(getElement("nb_var").value);
    const nbContraintes = Number.parseInt(getElement("nb_contraintes").value);
    attachForm_quadratique(nbVariables, nbContraintes);
}

function onModeLineaire() {
    getElement("mode_output").innerHTML = gen_html_lineaire();
    getElement("valider_var_lineaire").addEventListener("click", onValiderParams);
}

function onModeQuadratique() {
    getElement("mode_output").innerHTML = gen_html_lineaire();
    getElement("valider_var_lineaire").addEventListener("click", onValiderParams_quadratique);
}

async function main() {
    await init();
    getElement("mode_lineaire").addEventListener("click", onModeLineaire);
    getElement("mode_quadratique").addEventListener("click", onModeQuadratique);
}

await main();
