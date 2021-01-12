
const storage = {
    set(name, value) {
        const jsonValue = JSON.stringify(value);
        localStorage.setItem(name, jsonValue);
    },

    get(name, substitute = null) {
        const storageValue = JSON.parse(localStorage.getItem(name) || substitute);
    
        return storageValue;
    },

    del(name) {
        localStorage.removeItem(name);
    }

}

const generator = {
    generaterandomInteger(min, max) {
        const rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    },

    generateSet(min, max) {
        const set = new Set();
    
        while (set.size < max) {
            const randomNumber = this.generaterandomInteger(min, max - 1).bind(this);
            set.add(randomNumber);
        }
    
        return set;
    },


};


export const utils = {
    storage,
    generator
}