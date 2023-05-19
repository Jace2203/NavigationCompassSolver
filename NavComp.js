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
    constructor(first, second, third, f1, f2, f3, s1, s2, s3) {
        this.z = [convert(first), convert(second), convert(third)];

        this.f1 = f1;
        this.f2 = f2;
        this.f3 = f3;

        this.s = [s1, s2, s3];
    }

    getState() {
        return this.s;
    }

    getSize() {
        return this.z;
    }

    A() {
        for (var i = 0; i < 3; i++) {
            this.s[i] += this.f1[i];
            this.s[i] = this.s[i] % this.z[i];
        }
    }

    B() {
        for (var i = 0; i < 3; i++) {
            this.s[i] += this.f2[i];
            this.s[i] = this.s[i] % this.z[i];
        }
    }

    C() {
        for (var i = 0; i < 3; i++) {
            this.s[i] += this.f3[i];
            this.s[i] = this.s[i] % this.z[i];
        }
    }
}

/*
var temp = new NavComp(1, 4, 3, [1,1,0], [0,1,1], [1,0,1], 3, 2, 1);
console.log(temp.getState());
temp.A();
console.log(temp.getState());
temp.B();
console.log(temp.getState());
temp.C();
console.log(temp.getState());
temp.A();
console.log(temp.getState());
*/