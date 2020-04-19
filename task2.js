let proto = { value: 42 };

const name = Symbol('name')
proto[name] = 'Igor';

Object.defineProperty(proto, 'surname', {
    value: 'Иванов',
    writable: true,
    configurable: true,
    enumerable: true,
});

Object.defineProperty(proto, 'nick', {
    value: 'Igorek',
    writable: true,
    configurable: true,
    enumerable: false,
});



const object = Object.create(proto);

Object.defineProperty(object, 'year', {
    value: 2020,
    writable: true,
    configurable: true,
    enumerable: false,
});

const symbol = Symbol('bazzinga');
object[symbol] = 42;




console.log('======== без proxy =======')
console.log('value' in object); // true
console.log(name in object); // true
console.log('surname' in object); // true
console.log('nick' in object); // true
console.log('year' in object); // true
console.log(symbol in object); // true

const proxy = new Proxy(object, {
  has(target, key) {
    return target.hasOwnProperty(key);
  }
})

console.log('======== с proxy =======')
console.log('value' in proxy); // false
console.log(name in proxy); // false
console.log('surname' in proxy); // false
console.log('nick' in proxy); // false
console.log('year' in proxy); // true
console.log(symbol in proxy); // true


