(() => {
  console.log('=== Задание №1 - allKeysAndSymbols ===');
  console.log('======================================');
  function allKeysAndSymbols (obj) {
    // Массив, где будут накапливаться свойства/символы
    const allProps = [];
    // Находим все дескрипторы в ТЕКУЩЕМ объекте (не учитывая прототипы)
    const allPropsInCurObj = Object.getOwnPropertyDescriptors(obj);
    // Выделяем у них ключи
    const allKetsInCurObj = Reflect.ownKeys(obj);
    // Итерируемся, получая по ключам - значения (по другому итерироваться не получилось)
    allKetsInCurObj.forEach(key => allProps.push({ key, value: obj[key] }));
    // Определяем, если ли у объекта прототип
    let protoObj = Object.getPrototypeOf(obj);
    // Если есть - рекурсивно вызываем эту функцию для каждого прото-объекта,
    // Если нет - возвращаем массив со свойствами/символами
    return protoObj ? allProps.concat(allKeysAndSymbols(protoObj)) : allProps;
  }

  // Есть цепочка прототипно унаследованных объектов: obj3 -> obj2 -> obj1 -> __proto__
  // Для каждого объекта свойства задаются 4 способами.
  // 1. Через литералы объекта: let obj = { key: value}
  // 2. В качестве свойства задается Symbol: obj[Symbol('id')] = value;
  // 3. Через defineProperty c enumerable: true
  // 4. Через defineProperty c enumerable: false

  let obj1 = {
    name: 'Dima'
  };

  let id = Symbol('id')
  obj1[id] = 123;

  Object.defineProperty(obj1, 'surname', {
    value: 'Rakov',
    writable: true,
    configurable: true,
    enumerable: true,
  });

  Object.defineProperty(obj1, 'nickname', {
    value: 'kotik01',
    writable: true,
    configurable: true,
    enumerable: false,
  });

  console.log('======== obj1 =======');
  console.log('Св-ва объекта obj1: ', obj1.name, obj1[id], obj1.surname, obj1.nickname);

  // Объект 2 - наследуется от Объекта 1
  let obj2 = Object.create(obj1);

  obj2.age = 25;

  let feeling = Symbol('feeling');
  obj2[feeling] = 'Too old for all this shit';

  Object.defineProperty(obj2, 'birthday', {
    value: '01.01.01',
    writable: true,
    configurable: true,
    enumerable: true,
  });

  Object.defineProperty(obj2, 'deathday', {
    value: '12.12.2092',
    writable: true,
    configurable: true,
    enumerable: false,
  });

  console.log('======== obj2 =======');
  console.log('Св-ва объекта obj1: ', obj2.name, obj2[id], obj2.surname, obj2.nickname);
  console.log('Св-ва объекта obj2: ', obj2.age, obj2[feeling], obj2.birthday, obj2.deathday);

  // Объект 3 - наследуется от Объекта 2
  let obj3 = Object.create(obj2);

  obj3.profession = 'programmer';

  let professionRank = Symbol('professionRank');
  obj3[professionRank] = 'lamer';

  Object.defineProperty(obj3, 'props', {
    value: 'Very funny',
    writable: true,
    configurable: true,
    enumerable: true,
  });

  Object.defineProperty(obj3, 'cons', {
    value: 'Too funny',
    writable: true,
    configurable: true,
    enumerable: false,
  });

  console.log('======== obj3 =======');
  console.log('Св-ва объекта obj1: ',obj3.name,obj3[id],obj3.surname,obj3.nickname);
  console.log('Св-ва объекта obj2: ',obj3.age,obj3[feeling],obj3.birthday,obj3.deathday);
  console.log('Св-ва объекта obj3: ',obj3.profession,obj3[professionRank],obj3.props,obj3.cons);

  console.log('======== allKeysAndSymbols =======');
  console.log(allKeysAndSymbols(obj3));
})();


// (() => {
//     console.log('======== Задание №1 - allKeysAndSymbols =======')
//     function allKeysAndSymbols (obj) {
//         // Массив, где будут накапливаться свойства/символы
//         const allProps = [];
//         // Находим все дескрипторы в ТЕКУЩЕМ объекте (не учитывая прототипы)
//         const allPropsInCurObj = Object.getOwnPropertyDescriptors(obj);
//         // Выделяем у них ключи
//         const allKetsInCurObj = Reflect.ownKeys(obj);
//         // Итерируемся, получая по ключам - значения (по другому итерироваться не получилось)
//         allKetsInCurObj.forEach(key => allProps.push({ key, value: obj[key] }))
//         // Определяем, если ли у объекта прототип
//         let protoObj = Object.getPrototypeOf(obj);
//         // Если есть - рекурсивно вызываем эту функцию для каждого прото-объекта,
//         // Если нет - возвращаем массив со свойствами/символами
//         return protoObj ? allProps.concat(allKeysAndSymbols(protoObj)) : allProps;
//     }

//     // Есть цепочка прототипно унаследованных объектов: obj№3 -> obj№2 -> obj№1 -> __proto__
//     // Для каждого объекта свойства задаются 4 способами.
//     // 1. Через литералы объекта: let obj = { key: value}
//     // 2. В качестве свойства задется Symbol: obj[Symbol('id')] = value;
//     // 3. Через defineProperty c enumerable: true
//     // 4. Через defineProperty c enumerable: false

//     let obj1 = {
//       name: 'Игорь'
//      };
//     let id = Symbol('id')
//     obj1[id] = 123;
//     Object.defineProperty(obj1, 'surname', {
//         value: 'Иванов',
//         writable: true,
//         configurable: true,
//         enumerable: true,
//     });


//     Object.defineProperty(obj1, 'nick', {
//         value: 'Igorek',
//         writable: true,
//         configurable: true,
//         enumerable: false,
//     });

//     console.log('======== obj1 =======')
//     console.log(Object.getPrototypeOf(Object.getPrototypeOf(obj1)))

//     console.log('crab',obj1.name,obj1[id],obj1.surname
//         ,obj1.nick)

//     // Объект 2 - наследуется от Объекта 1
//     let obj2 = Object.create(obj1)
//     obj2.age = 25;
//     let ageName = Symbol('ageName');
//     obj2[ageName] = 'Молодой'
//     Object.defineProperty(obj2, 'birthday', {
//         value: '25.01.01',
//         writable: true,
//         configurable: true,
//         enumerable: true,
//     });

//     Object.defineProperty(obj2, 'deathday', {
//         value: '13.11.2092',
//         writable: true,
//         configurable: true,
//         enumerable: false,
//     });

//     console.log('======== obj2 =======')
//     console.log('crab',obj2.name,obj2[id],obj2.surname,obj2.nick)
//     console.log('crab',obj2.age,obj2[ageName],obj2.birthday,obj2.deathday)


//     // Объект 3 - наследуется от Объекта 2
//     let obj3 = Object.create(obj2)
//     obj3.profession = 'doctor';
//     let professionRank = Symbol('professionRank');
//     obj3[professionRank] = 'High'
//     Object.defineProperty(obj3, 'color', {
//         value: 'white',
//         writable: true,
//         configurable: true,
//         enumerable: true,
//     });

//     Object.defineProperty(obj3, 'shape', {
//         value: 'big',
//         writable: true,
//         configurable: true,
//         enumerable: false,
//     });

//     console.log('======== obj3 =======')
//     console.log('crab',obj3.name,obj3[id],obj3.surname,obj3.nick)
//     console.log('crab',obj3.age,obj3[ageName],obj3.birthday,obj3.deathday)
//     console.log('crab',obj3.profession,obj3[professionRank],obj3.color,obj3.shape)

//     console.log(allKeysAndSymbols(obj3));
// })()

