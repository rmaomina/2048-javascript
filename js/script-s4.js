window.onload = function(){

    var area = document.getElementById('area'); 

    //클릭하면 박스 생성!
    area.onclick = function(e){

        // 컬러 10개 중 랜덤
        var rd = Math.floor(Math.random() * 10) + 1;

        // 박스를 미리 만들어 둔다. 
        var box = document.createElement('div');

        // 박스 동적생성
        area.appendChild(box);
        box.className = "box color"+rd;

        // 동적생성 후 박스의 크기를 구할 수 있다.
        var boxHalf = box.offsetHeight/2;

        //클릭한 곳 그리드 좌표 구하기 
        var gridx = Math.floor((e.clientX-area.getBoundingClientRect().left)/100)*100;
        var gridy = Math.floor((e.clientY-area.getBoundingClientRect().top)/100)*100;
        
        box.style.left = gridx+"px";
        box.style.top = gridy+"px"; 

    }

    // 키를 인식하고 이동시키기
    window.onkeydown = function(e) {
        var k = window.event.keyCode;

        //움직일 타겟
        var tg = area.lastChild;

        //키보드 방향키 기능 수행 
        switch(k) {
            case 37 : 
                console.log("left");
                if(tg.offsetLeft > 0) {
                    console.log(tg.style.left);
                    tg.style.left = (tg.offsetLeft-100)+"px";
                }
                break;
            case 38 : 
                console.log("up");
                if(tg.offsetTop > 0) {
                    console.log(tg.style.top);
                    tg.style.top = (tg.offsetTop-100)+"px";
                }
                break;
            case 39 : 
                console.log("right");
                if(tg.offsetLeft < 300) {
                    console.log(tg.style.left);
                    tg.style.left = (tg.offsetLeft+100)+"px";
                }
                break;
            case 40 : 
                console.log("down");
                if(tg.offsetTop < 300) {
                    console.log(tg.style.top);
                    tg.style.top = (tg.offsetTop+100)+"px";
                }
                break;
        }

    }

    //리셋
    var reset = document.getElementById('btn_reset');

    reset.onclick = function(e){
        area.innerHTML = '';
    }
}