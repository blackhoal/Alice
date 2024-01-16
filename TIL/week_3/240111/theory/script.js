let a0 = 'a0';
// Dynamic Scope
function fn2() {
    let a2 = 'a2';
    console.log(a0, a1, a2);
}

function fn1() {
    let a1 = 'a1';
    console.log(a0, a1);
    fn2();
}

// Static Scope, Lexical Scope
function fn4() {
    function fn3() {
        let a3 = 'a3';
        console.log(a0, a3, a4);
    }
    let a4 = 'a4';
    console.log(a0, a4);
    fn3();
}

fn4();