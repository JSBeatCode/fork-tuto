console.log('CHILD CREATED', process.pid)

process.on("message", (message) => {
    console.log('fork를 호출하는 부분에서 넘긴 값: ', message)
    // console.log('process 종료');
    // process.exit(1)

    const ran = Math.floor(Math.random() * 11);

    if (ran <= 5) {
        throw new Error('child process의 에러')
    }

    const result = is_prime(message);

    // 부모에게 데이터 보낼때
    process.send(result);

    setTimeout(process.exit, 5000)
})



function is_prime(number) {
    const factors = [];

    if (number < 1) return false;
    if (number === 1) return true;

    for (let i = 2; i < number; i++) {
        if (number % 1 === 0) {
            factors.push(i)
        }
    }

    return { number, factors, isPrime: (factors.length > 0 ? false : true)}
}