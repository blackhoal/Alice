# 접근 제어자
```ts
// 부모 클래스
class Car {
	public name: string; 
    private color: string; // #color :string
    protected year: number;
    
    
    constructor(name :string, color:string, year: number){
    	this.name = name;
        this.color = color;
        this.year = year;
    }
    
    
    start(){
    	console.log("start");
        console.log(this.name);
        console.log(this.color); // this.#color
        console.log(this.year);
    }
}


// 자식 클래스 
class Bmw extends Car {
    
    constructor(name :string, color:string, year: number){
    	super(name, color, year);
    }
    

    showName(){
        console.log(super.name);
    }
    
    showColor(){
        console.log(super.color); // error 
    }
    
    showYear(){
        console.log(super.year);
    }
}

// 클래스 인스턴스
const mycar = new Bmw("black", "ccc", 1999);
console.log(mycar.name);
console.log(mycar.color); // error
console.log(mycar.year); // error
mycar.name = "zzz"; // 변경 가능
```

|종류|설명|
|:----:|:----:|
|public|자식 클래스나 클래스 인스턴스에서 접근 가능한 값(default)|  
|private(#)|자식 클래스에서 접근 불가능하며 자신 내부에서만 사용 가능|
|protected|자식 클래스에서 접근이 가능 클래스 인스턴스에서는 참조가 불가능|   