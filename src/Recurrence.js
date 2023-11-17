const TOP = [-1, 0];
const LEFT = [0, -1];
const DIAG = [-1, -1];
const ORIGIN = [0, 0];
const DIR_NAME = {
    TOP: "TOP",
    LEFT: "LEFT",
    DIAG: "DIAG",
    ORIGIN: "ORIGIN",
};

function calculateGlobalAlignment(v, w, pointers) {
    let i = v.length;
    let j = w.length;
    let alignedV = [];
    let alignedW = [];
    let path = [];

    while (i > 0 || j > 0) {
        const [di, dj] = pointers[i][j];
        if (di === LEFT[0] && dj === LEFT[1]) {
            alignedV.push("-");
            alignedW.push(w[j - 1]);
        } else if (di === TOP[0] && dj === TOP[1]) {
            alignedV.push(v[i - 1]);
            alignedW.push("-");
        } else if (di === DIAG[0] && dj === DIAG[1]) {
            alignedV.push(v[i - 1]);
            alignedW.push(w[j - 1]);
        }
        path.push([i, j]);
        i += di;
        j += dj;
    }
    path.push([i, j]);

    return [[alignedV.reverse().join(""), alignedW.reverse().join("")], path];
}

function globalAlign(v, w, delta, path) {
    const M = Array.from({ length: v.length + 1 }, () =>
        Array(w.length + 1).fill(0)
    );
    const pointers = Array.from({ length: v.length + 1 }, () =>
        Array(w.length + 1).fill(ORIGIN)
    );
    const result = {};
    let score = null;
    let alignment = null;

    for (let i = 0; i <= v.length; i++) {
        for (let j = 0; j <= w.length; j++) {
            let deleteCost =
                i > 0 ? M[i - 1][j] + delta[v[i - 1]]["-"] : Number.NEGATIVE_INFINITY;
            let insertCost =
                j > 0 ? M[i][j - 1] + delta["-"][w[j - 1]] : Number.NEGATIVE_INFINITY;
            let matchMismatchCost =
                i > 0 && j > 0
                    ? M[i - 1][j - 1] + delta[v[i - 1]][w[j - 1]]
                    : Number.NEGATIVE_INFINITY;
            if (i > 0 && j > 0) {
                M[i][j] = Math.max(deleteCost, insertCost, matchMismatchCost);
                if (M[i][j] === deleteCost) {
                    pointers[i][j] = TOP;
                } else if (M[i][j] === insertCost) {
                    pointers[i][j] = LEFT;
                } else {
                    pointers[i][j] = DIAG;
                }
            } else if (i > 0) {
                M[i][j] = deleteCost;
                pointers[i][j] = TOP;
            } else if (j > 0) {
                M[i][j] = insertCost;
                pointers[i][j] = LEFT;
            }
            if (!(i in result)) {
                result[i] = {}
            }
            result[i][j] = [
                M[i][j],
                insertCost,
                deleteCost,
                matchMismatchCost,
                DIR_NAME[pointers[i][j]],
            ];
        }
    }
    score = M[v.length][w.length];
    [alignment, path] = calculateGlobalAlignment(v, w, pointers);
    return [result, alignment, score, 0, 0, v.length + 1, w.length + 1, path];
}

function calculateFittingAlignment(v, w, init_j, pointers) {
    let i = v.length;
    let j = init_j;
    let alignedV = [];
    let alignedW = [];
    let path = [];

    while (i > 0) {
        const [di, dj] = pointers[i][j];
        if (di === LEFT[0] && dj === LEFT[1]) {
            alignedV.push("-");
            alignedW.push(w[j - 1]);
        } else if (di === TOP[0] && dj === TOP[1]) {
            alignedV.push(v[i - 1]);
            alignedW.push("-");
        } else if (di === DIAG[0] && dj === DIAG[1]) {
            alignedV.push(v[i - 1]);
            alignedW.push(w[j - 1]);
        }
        path.push([i, j]);
        i += di;
        j += dj;
    }
    path.push([i, j]);

    return [[alignedV.reverse().join(""), alignedW.reverse().join("")], path];
}

function fittingAlign(v, w, delta) {
    const M = Array.from({ length: v.length + 1 }, () =>
        Array(w.length + 1).fill(0)
    );
    const pointers = Array.from({ length: v.length + 1 }, () =>
        Array(w.length + 1).fill(ORIGIN)
    );
    const result = {};
    let score = null;
    let alignment = null;
    let path = null;
    let init_j = 0;

    for (let i = 0; i <= v.length; i++) {
        for (let j = 0; j <= w.length; j++) {
            let deleteCost =
                i > 0 ? M[i - 1][j] + delta[v[i - 1]]["-"] : Number.NEGATIVE_INFINITY;
            let insertCost =
                i > 0 && j > 0
                    ? M[i][j - 1] + delta["-"][w[j - 1]]
                    : Number.NEGATIVE_INFINITY;
            let matchMismatchCost =
                i > 0 && j > 0
                    ? M[i - 1][j - 1] + delta[v[i - 1]][w[j - 1]]
                    : Number.NEGATIVE_INFINITY;
            if (i > 0 && j > 0) {
                M[i][j] = Math.max(deleteCost, insertCost, matchMismatchCost);
                if (M[i][j] === deleteCost) {
                    pointers[i][j] = TOP;
                } else if (M[i][j] === insertCost) {
                    pointers[i][j] = LEFT;
                } else {
                    pointers[i][j] = DIAG;
                }
            } else if (i > 0) {
                M[i][j] = deleteCost;
                pointers[i][j] = TOP;
            }

            if (i === v.length && (score === null || M[i][j] >= score)) {
                score = M[i][j];
                init_j = j;
            }
            if (!(i in result)) {
                result[i] = {}
            }
            result[i][j] = [
                M[i][j],
                insertCost,
                deleteCost,
                matchMismatchCost,
                DIR_NAME[pointers[i][j]],
            ];
        }
    }
    score = M[v.length][w.length];
    [alignment, path] = calculateFittingAlignment(v, w, init_j, pointers);
    return [
        result,
        alignment,
        score,
        0,
        init_j - alignment[1].length + 1,
        v.length,
        init_j,
        path,
    ];
}

function calculateLocalAlignment(v, w, init_i, init_j, M, pointers) {
    let i = init_i;
    let j = init_j;
    let alignedV = [];
    let alignedW = [];
    let path = [];

    while (M[i][j] !== 0) {
        const [di, dj] = pointers[i][j];
        if (di === LEFT[0] && dj === LEFT[1]) {
            alignedV.push("-");
            alignedW.push(w[j - 1]);
        } else if (di === TOP[0] && dj === TOP[1]) {
            alignedV.push(v[i - 1]);
            alignedW.push("-");
        } else if (di === DIAG[0] && dj === DIAG[1]) {
            alignedV.push(v[i - 1]);
            alignedW.push(w[j - 1]);
        }
        path.push([i, j]);
        i += di;
        j += dj;
    }
    path.push([i, j]);

    return [[alignedV.reverse().join(""), alignedW.reverse().join("")], path];
}

function localAlign(v, w, delta) {
    const M = Array.from({ length: v.length + 1 }, () =>
        Array(w.length + 1).fill(0)
    );
    const pointers = Array.from({ length: v.length + 1 }, () =>
        Array(w.length + 1).fill(ORIGIN)
    );
    const result = {};
    let score = null;
    let alignment = null;
    let path = null;
    let init_j = 0;
    let init_i = 0;

    for (let i = 0; i <= v.length; i++) {
        for (let j = 0; j <= w.length; j++) {
            let deleteCost =
                i > 0 ? M[i - 1][j] + delta[v[i - 1]]["-"] : Number.NEGATIVE_INFINITY;
            let insertCost =
                j > 0 ? M[i][j - 1] + delta["-"][w[j - 1]] : Number.NEGATIVE_INFINITY;
            let matchMismatchCost =
                i > 0 && j > 0
                    ? M[i - 1][j - 1] + delta[v[i - 1]][w[j - 1]]
                    : Number.NEGATIVE_INFINITY;
            if (i > 0 && j > 0) {
                M[i][j] = Math.max(deleteCost, insertCost, matchMismatchCost, 0);
                if (M[i][j] === deleteCost) {
                    pointers[i][j] = TOP;
                } else if (M[i][j] === insertCost) {
                    pointers[i][j] = LEFT;
                } else if (M[i][j] === matchMismatchCost) {
                    pointers[i][j] = DIAG;
                } else {
                    pointers[i][j] = ORIGIN;
                }
            } else if (i > 0) {
                M[i][j] = Math.max(deleteCost, 0);
                if (M[i][j] === deleteCost) {
                    pointers[i][j] = TOP;
                } else {
                    pointers[i][j] = ORIGIN;
                }
            } else if (j > 0) {
                M[i][j] = Math.max(insertCost, 0);
                if (M[i][j] === insertCost) {
                    pointers[i][j] = LEFT;
                } else {
                    pointers[i][j] = ORIGIN;
                }
            }

            if (score === null || M[i][j] >= score) {
                score = M[i][j];
                init_i = i;
                init_j = j;
            }
            if (!(i in result)) {
                result[i] = {}
            }
            result[i][j] = [
                M[i][j],
                insertCost,
                deleteCost,
                matchMismatchCost,
                DIR_NAME[pointers[i][j]],
            ];
        }
    }
    score = M[v.length][w.length];
    [alignment, path] = calculateLocalAlignment(
        v,
        w,
        init_i,
        init_j,
        M,
        pointers
    );
    return [
        result,
        alignment,
        score,
        init_i - alignment[0].length + 1,
        init_j - alignment[1].length + 1,
        init_i,
        init_j,
        path,
    ];
}

export function getAlignment(v, w, type, matchScore, misMatchScore, gapScore) {
    const delta = {};
    const setV = new Set(v.split(''));
    const setW = new Set(w.split(''));

    const uniqueLetters = Array.from(new Set([...setV, ...setW]));
    uniqueLetters.push('-')
    for (let i = 0; i < uniqueLetters.length; i++) {
        delta[uniqueLetters[i]] = Object.fromEntries(
            uniqueLetters.map((k, j) => [
                k,
                uniqueLetters[i] === "-" || uniqueLetters[j] === "-"
                    ? gapScore
                    : uniqueLetters[i] === uniqueLetters[j]
                        ? matchScore
                        : misMatchScore,
            ])
        );
    }
    if (type === "GLOBAL") {
        return globalAlign(v, w, delta);
    } else if (type === "LOCAL") {
        return localAlign(v, w, delta);
    } else {
        return fittingAlign(v, w, delta);
    }
}