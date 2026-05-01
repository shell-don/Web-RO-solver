const INF = Number.MAX_VALUE;

export const EXEMPLES = {
    melange: {
        type: "LP",
        nbVariables: 7, nbContraintes: 7,
        direction: "Minimize",
        coeffs_obj: [200, 250, 150, 220, 300, 310, 165],
        domains: [[0,40],[0,30],[0,60],[0,50],[0,20],[0,30],[0,25]],
        constraints: [
            { coeffs: [2.5,2,-0.5,0.7,-0.5,-0.5,89.5],            sign: "≥", rhs: 0 },
            { coeffs: [1.75,1.25,-1.25,-0.05,-1.25,-1.25,88.75],   sign: "≤", rhs: 0 },
            { coeffs: [-0.3,-0.3,-0.3,-0.3,89.7,95.7,-0.3],        sign: "≥", rhs: 0 },
            { coeffs: [-0.5,-0.5,-0.5,-0.5,89.5,95.5,-0.5],        sign: "≤", rhs: 0 },
            { coeffs: [-0.037,-0.042,-0.039,-0.048,-0.046,-0.038,-0.048], sign: "≤", rhs: 0 },
            { coeffs: [-0.025,-0.039,0.01,-0.032,-0.038,-0.037,-0.03],   sign: "≤", rhs: 0 },
            { coeffs: [1,1,1,1,1,1,1], sign: "≥", rhs: 50 },
        ]
    },
    glass: {
        type: "LP",
        nbVariables: 2, nbContraintes: 3,
        direction: "Maximize",
        coeffs_obj: [3, 5],
        domains: [[0,INF],[0,INF]],
        constraints: [
            { coeffs: [1, 0], sign: "≤", rhs: 4 },
            { coeffs: [0, 2], sign: "≤", rhs: 12 },
            { coeffs: [3, 2], sign: "≤", rhs: 18 },
        ]
    },
    horaires: {
        type: "LP",
        nbVariables: 5, nbContraintes: 10,
        direction: "Minimize",
        coeffs_obj: [170, 160, 175, 180, 195],
        domains: new Array(5).fill([0, INF]),
        constraints: [
            { coeffs: [1,0,0,0,0], sign: "≥", rhs: 48 },
            { coeffs: [1,1,0,0,0], sign: "≥", rhs: 79 },
            { coeffs: [1,1,0,0,0], sign: "≥", rhs: 65 },
            { coeffs: [1,1,1,0,0], sign: "≥", rhs: 87 },
            { coeffs: [0,1,1,0,0], sign: "≥", rhs: 64 },
            { coeffs: [0,0,1,1,0], sign: "≥", rhs: 73 },
            { coeffs: [0,0,1,1,0], sign: "≥", rhs: 82 },
            { coeffs: [0,0,0,1,0], sign: "≥", rhs: 43 },
            { coeffs: [0,0,0,1,1], sign: "≥", rhs: 52 },
            { coeffs: [0,0,0,0,1], sign: "≥", rhs: 15 },
        ]
    },
    reseau: {
        type: "LP",
        nbVariables: 7, nbContraintes: 7,
        direction: "Minimize",
        coeffs_obj: [2,4,9,3,1,3,2],
        domains: new Array(7).fill([0, INF]),
        constraints: [
            { coeffs: [1,1,1,0,0,0,0],  sign: "=", rhs: 50  },
            { coeffs: [-1,0,0,1,0,0,0], sign: "=", rhs: 40  },
            { coeffs: [0,-1,0,-1,1,0,0],sign: "=", rhs: 0   },
            { coeffs: [0,0,-1,0,0,1,-1],sign: "=", rhs: -30 },
            { coeffs: [0,0,0,0,-1,-1,1],sign: "=", rhs: -60 },
            { coeffs: [1,0,0,0,0,0,0],  sign: "≤", rhs: 10  },
            { coeffs: [0,0,0,0,1,0,0],  sign: "≤", rhs: 80  },
        ]
    },
    production: {
        type: "LP",
        nbVariables: 4, nbContraintes: 3,
        direction: "Maximize",
        coeffs_obj: [7, 9, 18, 17],
        domains: new Array(4).fill([0, INF]),
        constraints: [
            { coeffs: [2,4,5,7], sign: "≤", rhs: 42 },
            { coeffs: [1,1,2,2], sign: "≤", rhs: 17 },
            { coeffs: [1,2,3,3], sign: "≤", rhs: 24 },
        ]
    },
    californiamfg: {
        type: "LP",
        nbVariables: 4, nbContraintes: 4,
        direction: "Maximize",
        coeffs_obj: [9, 5, 6, 4],
        domains: new Array(4).fill([0, 1]),
        constraints: [
            { coeffs: [6,3,5,2],  sign: "≤", rhs: 10 },
            { coeffs: [0,0,1,1],  sign: "≤", rhs: 1  },
            { coeffs: [-1,0,1,0], sign: "≤", rhs: 0  },
            { coeffs: [0,-1,0,1], sign: "≤", rhs: 0  },
        ]
    },
    qp_norme: {
        type: "QP",
        nbVariables: 2, nbContraintes: 1,
        direction: "Minimize",
        coeffs_obj: [0, 0],
        p_matrix: [[1,0],[0,1]],
        domains: [[0, 0.35],[0, INF]],
        constraints: [
            { coeffs: [1,1], sign: "≥", rhs: 1 },
        ]
    },
};