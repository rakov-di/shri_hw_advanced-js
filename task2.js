(() => {
  console.log('=== Задание №2 - in через proxy ===');
  console.log('===================================');

  // Задаем свойства для исходного объекта
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


  // Задаем свойства для наследуемого объекта
  const object = Object.create(proto);

  Object.defineProperty(object, 'year', {
    value: 2020,
    writable: true,
    configurable: true,
    enumerable: false,
  });

  const symbol = Symbol('bazzinga');
  object[symbol] = 42;



  // Тесты
  console.log('======== без proxy =======');
  console.log('======== св-ва/символы из прототипа =======');
  console.log('value' in object); // true
  console.log(name in object); // true
  console.log('surname' in object); // true
  console.log('nick' in object); // true
  console.log('======== собственные св-ва/символы =======');
  console.log('year' in object); // true
  console.log(symbol in object); // true

  // РЕАЛИЗАЦИЯ прокси
  const proxy = new Proxy(object, {
    has(target, key) {
      return target.hasOwnProperty(key);
    }
  });

  console.log('======== с proxy =======');
  console.log('======== св-ва/символы из прототипа =======');
  console.log('value' in proxy); // false
  console.log(name in proxy); // false
  console.log('surname' in proxy); // false
  console.log('nick' in proxy); // false
  console.log('======== собственные св-ва/символы =======');
  console.log('year' in proxy); // true
  console.log(symbol in proxy); // true
})();

