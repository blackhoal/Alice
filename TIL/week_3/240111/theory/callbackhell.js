console.log('주문 요청');

function orderCallBack() {
    console.log('결제 진행 중');
    setTimeout(() => {
        console.log('결제 완료');
        setTimeout(() => {
            console.log('배달 시작');
            setTimeout(() => {
                console.log('배달 완료');
                setTimeout(() => {
                    console.log('홍길동님에게 3000원 입금 완료');
                }, 3000);
            }, 2000);
        }, 2000);
    }, 3000);
}

orderCallBack();