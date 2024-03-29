let Compass = new NavComp();

let checkReached = (reached, s) => {
    return reached[s[0]][s[1]][s[2]];
}

let setReachedTrue = (reached, s) => {
    reached[s[0]][s[1]][s[2]] = true;
}

let solve = (s) => {
    let reached = [];
    for (let i = 0; i < Compass.z_c[0]; i++) {
        reached.push([]);
        for (let j = 0; j < Compass.z_c[1]; j++) {
            reached[i].push([]);
            for (let k = 0; k < Compass.z_c[2]; k++) {
                reached[i][j].push(false);
            }
        }
    }

    let root = new Tree(null, s);
    setReachedTrue(reached, s);
    let next = [root];
    while (true)
    {
        let current = next;
        next = [];
        
        current.forEach(x => {
            for (let i = 0; i < 3; i++) {
                let y = Compass.F(x.value, i);
                if (!checkReached(reached, y)) {
                    next.push(x.addChild(i, y));
                    setReachedTrue(reached, y);
                }
            }
        });
        
        if (!next.length) break;
    }

    let result = [];
    let solution = root.search([0,0,0]);
    if (solution !== null) {
        solution.toRoot(result);
    }
    return result;
}