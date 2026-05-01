import init, {
    gen_html_lineaire,
    gen_objective_constraints,
    gen_objective_constraints_quadratique,
    resoudre_basique,
    resoudre_quadratique
} from "./lpweb.js";
import { EXEMPLES } from "./exemples.js";

// --- Utilitaires ---

const getEl   = id  => document.getElementById(id);
const parseVal = val => Number.parseFloat(val) || 0;
const setVal   = (id, val) => { const el = getEl(id); if (el) el.value = val; };
const setChecked = id => { const el = getEl(id); if (el) el.checked = true; };

// --- Lecture du formulaire ---

const getDirection = () =>
    document.querySelector('input[name="max_ou_min"]:checked').value;

const getCoeffsObj = () =>
    Array.from(document.querySelectorAll('[id^="obj_coeff_x_"]'))
        .map(input => parseVal(input.value));

function getCoeffsObjQP(n) {
    const P = Array.from({ length: n }, () => new Array(n).fill(0));
    for (let i = 0; i < n; i++) {
        P[i][i] = parseVal(getEl(`q_${i+1}_${i+1}`)?.value) * 2;
        for (let j = i + 1; j < n; j++) {
            const v = parseVal(getEl(`q_${i+1}_${j+1}`)?.value);
            P[i][j] = P[j][i] = v;
        }
    }
    const q = Array.from({ length: n }, (_, i) => parseVal(getEl(`q_lin_${i+1}`)?.value));
    return { P, q };
}

function getDomains(n) {
    return Array.from({ length: n }, (_, i) => {
        const min    = parseVal(getEl(`obj_min_x_${i+1}`)?.value);
        const maxRaw = getEl(`obj_max_x_${i+1}`)?.value;
        const max    = (!maxRaw || maxRaw === "") ? Number.MAX_VALUE : parseVal(maxRaw);
        return [min, max];
    });
}

function getConstraints(n, m) {
    return Array.from({ length: m }, (_, j) => ({
        coeffs: Array.from({ length: n }, (_, i) => parseVal(getEl(`c_${j+1}_coeff_${i+1}`)?.value)),
        sign:   getEl(`c_${j+1}_sign`).value,
        rhs:    parseVal(getEl(`c_${j+1}_rhs`)?.value),
    }));
}

// --- Résolution ---

function solveLP(n, m) {
    const constraints = getConstraints(n, m);
    getEl("resultat_output").innerText = resoudre_basique(
        getCoeffsObj(), getDirection(),
        JSON.stringify(getDomains(n)),
        JSON.stringify(constraints.map(c => c.coeffs)),
        JSON.stringify(constraints.map(c => c.sign)),
        constraints.map(c => c.rhs),
        n, m
    );
}

function solveQP(n, m) {
    const constraints = getConstraints(n, m);
    const { P, q }    = getCoeffsObjQP(n);
    getEl("resultat_output").innerText = resoudre_quadratique(
        JSON.stringify(P), q, getDirection(),
        JSON.stringify(getDomains(n)),
        JSON.stringify(constraints.map(c => c.coeffs)),
        JSON.stringify(constraints.map(c => c.sign)),
        constraints.map(c => c.rhs),
        n, m
    );
}

// --- Dual ---

function computeDual(n, m) {
    const direction   = getDirection();
    const constraints = getConstraints(n, m);
    const coeffsObj   = getCoeffsObj();

    const dualN    = m;
    const dualM    = n;
    const dualDir  = direction === "Maximize" ? "Minimize" : "Maximize";
    const dualSign = direction === "Maximize" ? "≥" : "≤";

    buildLP(dualN, dualM);
    setChecked(dualDir === "Maximize" ? "maximisation" : "minimisation");
    setVal("nb_var", dualN);
    setVal("nb_contraintes", dualM);

    constraints.forEach((c, i) => setVal(`obj_coeff_x_${i+1}`, c.rhs));
    Array.from({ length: dualN }).forEach((_, i) => {
        setVal(`obj_min_x_${i+1}`, 0);
        setVal(`obj_max_x_${i+1}`, "");
    });

    Array.from({ length: n }, (_, i) => constraints.map(c => c.coeffs[i]))
        .forEach((row, j) => {
            row.forEach((v, i) => setVal(`c_${j+1}_coeff_${i+1}`, v));
            setVal(`c_${j+1}_sign`, dualSign);
            setVal(`c_${j+1}_rhs`, coeffsObj[j]);
        });
}

// --- Construction des formulaires ---

function buildLP(n, m) {
    getEl("parametres_et_contraintes_output").innerHTML = gen_objective_constraints(n, m);
    getEl("resoudre").addEventListener("click", () => solveLP(n, m));
    getEl("dual").addEventListener("click",     () => computeDual(n, m));
}

function buildQP(n, m) {
    getEl("parametres_et_contraintes_output").innerHTML = gen_objective_constraints_quadratique(n, m);
    getEl("resoudre").addEventListener("click", () => solveQP(n, m));
}

// --- Modes ---

function initModeUI(onValider) {
    getEl("mode_output").innerHTML = gen_html_lineaire();
    getEl("valider_var_lineaire").addEventListener("click", () => {
        const n = Number.parseInt(getEl("nb_var").value);
        const m = Number.parseInt(getEl("nb_contraintes").value);
        onValider(n, m);
    });
}

const onModeLP = () => initModeUI(buildLP);
const onModeQP = () => initModeUI(buildQP);

// --- Exemples ---

function fillExemple(ex) {
    setChecked(ex.direction === "Maximize" ? "maximisation" : "minimisation");

    if (ex.type === "QP" && ex.p_matrix) {
        ex.p_matrix.forEach((row, i) => {
            setVal(`q_${i+1}_${i+1}`, row[i]);
            row.forEach((v, j) => { if (j > i) setVal(`q_${i+1}_${j+1}`, v); });
        });
        ex.coeffs_obj.forEach((v, i) => setVal(`q_lin_${i+1}`, v));
    } else {
        ex.coeffs_obj.forEach((v, i) => setVal(`obj_coeff_x_${i+1}`, v));
    }

    ex.domains.forEach(([min, max], i) => {
        setVal(`obj_min_x_${i+1}`, min);
        setVal(`obj_max_x_${i+1}`, max >= 1e300 ? "" : max);
    });

    ex.constraints.forEach((c, j) => {
        c.coeffs.forEach((v, i) => setVal(`c_${j+1}_coeff_${i+1}`, v));
        setVal(`c_${j+1}_sign`, c.sign);
        setVal(`c_${j+1}_rhs`, c.rhs);
    });
}

function loadExemple(key) {
    const ex = EXEMPLES[key];
    if (!ex) return;

    const { nbVariables: n, nbContraintes: m, type } = ex;

    if (type === "QP") {
        setChecked("mode_quadratique");
        onModeQP();
        buildQP(n, m);
    } else {
        setChecked("mode_lineaire");
        onModeLP();
        buildLP(n, m);
    }

    setVal("nb_var", n);
    setVal("nb_contraintes", m);
    fillExemple(ex);
    // afficher l'énoncé de l'exemple (en haut)
}

// --- Main ---

async function main() {
    await init();
    getEl("mode_lineaire").addEventListener("click",   onModeLP);
    getEl("mode_quadratique").addEventListener("click", onModeQP);
    getEl("exemples").addEventListener("change", e => loadExemple(e.target.value));
}

await main();