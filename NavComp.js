const convert = (count) => {
    switch (count) {
        case 1:
            return 6;
        case 2:
        case 4:
            return 3;
        case 3:
            return 2;
    }
}

class NavComp {
    constructor() {
        this.z = [1,4,3];
        this.z_c = Array.from(this.z, x => convert(x));
        this.f = [[0,1,1],[1,1,0],[1,0,1]];
    }

    getSize() {
        return this.z_c;
    }

    getF(i) {
        return this.f[i];
    }

    setSize(index, value) {
        this.z[index] = value;
        this.z_c[index] = convert(value);
        this.s = [0,0,0];
    }

    setAction(index, value) {
        this.f[index] = value;
    }

    F(s, j) {
        let t = [];
        for (let i = 0; i < 3; i++) {
            t.push((s[i] + this.f[j][i]) % this.z_c[i]);
        }
        return t;
    }
}

const angle = (i, comp) => {
    return comp.z[i] * 60;
}