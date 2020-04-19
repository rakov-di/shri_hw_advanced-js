(() => {
    console.log('======== Задание №3 - asyncExecutor =======')
    function asyncExecutor (generator) {
        const gen = generator();

        const walk = (result) => {
            const { value, done } = gen.next(result);
            if (done) {
                return value;
            } else {
                return value
                        .then(result => walk(result))
                        .catch(err => console.log(err))
            }
        }

        walk();
    }

    // тесты
    const ID = 42;
    const delayMS = 1000;

    function getId () {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(ID);
            }, delayMS);
        });
    }

    function getDataById (id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                id === ID ? resolve('🍎') : reject('💥');
            }, delayMS);
        });
    }

    asyncExecutor(function* () {
        console.time("Time");

        const id = yield getId();
        const data = yield getDataById(id);
        console.log('Data', data);

        console.timeEnd("Time");
    });
})()
