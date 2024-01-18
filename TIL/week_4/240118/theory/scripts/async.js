function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    })
}

async function callbackChain() {
    console.log('결제 중');
    await delay(2000);
    console.log('결제 완료');
    await delay(3000);
    console.log('배달 시작');
    await delay(2000);
    console.log('배달 완료');
}

callbackChain();