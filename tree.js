function areEqual(a, b) {
    if (a.length === b.length) {
        return a.every((element, index) => {
            if (element === b[index])
                return true;

            return false;
        });
    }
    return false;
}

class Tree {
    constructor(parent, value) {
        this.value = value;

        this.parent = parent;
        this.children = new Map();
    }

    addChild(f, value) {
        this.children.set(f, new Tree(this, value));
    }

    getChild(f) {
        return this.children.get(f);
    }

    toRoot(result, node = null) {
        if (this.parent)
            this.parent.toRoot(result, this);
        
        if (node) {
            for (let [k, v] of this.children.entries()) {
                if (v === node) {
                    result.push(k);
                }
            }
        }
    }

    search(v) {
        if (areEqual(this.value, v))
            return this;
        
        let found = null;
        this.children.forEach(element => {
            let result = element.search(v);
            if (result) {
                found = result;
                return result;
            }
        });

        if (found)
            return found;

        return null;
    }
}