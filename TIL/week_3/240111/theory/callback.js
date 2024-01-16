function orderCallBack() {
    console.log('결제 진행 중');

    // 결제 후 결제 완료까지 대기 3초
    setTimeout(() => {
        console.log('결제 완료');
        // Callback 내에서 callback을 호출함으로써 동기성을 보장
        // Callback chain
        setTimeout(() => {
            console.log('배달 시작');
        }, 2000);
    }, 3000);
}

console.log('주문 요청');
orderCallBack();
