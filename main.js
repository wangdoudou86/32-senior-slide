let $buttons = $('#buttonWrapper>button')
let $slides = $('#slides')
let current = 0
let $images = $slides.children('img')

makefakeSlides()
$slides.css({transform:'translateX(-400px)'})//真的第一张位置在-400px处
bindEvents()
$('#previous').on('click',function(){
    gotoSlide(current-1)
})
$(next).on('click',function(){
    gotoSlide(current+1)
})
let timer = setInterval(function(){
    gotoSlide(current+1)
},2000)
$('.window').on('mouseenter',function(){
    window.clearInterval(timer)
})
$('.window').on('mouseleave',function(){
    timer = setInterval(function(){
        gotoSlide(current+1)
    },2000)
})





function makefakeSlides(){
    let $firstCopy = $images.eq(0).clone(true)//true就克隆它全家，false就克隆它自己
    let $lastCopy = $images.eq($images.length-1).clone(true)   
    $slides.append($firstCopy)
    $slides.prepend($lastCopy)
}

function bindEvents(){  
    $('#buttonWrapper').on('click','button',function(e){ //事件委托，点击$('#buttonWrapper')里的button时执行function(e)
        let $button = $(e.currentTarget) //点击的按钮
        let index = $button.index() //点击的按钮在数组中的序号
        gotoSlide(index)
})
}

//把去到每一张图片的功能分离出来很重要
function gotoSlide(index){
    if(index>$buttons.length-1){
        index = 0
    }else if(index < 0){
        index = $buttons.length-1
    }

    if(current === $buttons.length-1 && index === 0){
        //从最后一张去第一张
        $slides.css({transform:`translateX(${-($buttons.length+1)*400}px)`}).one('transitionend',function(){
            $slides.hide()
            $slides.offset()
            $slides.css({transform:'translateX(-400px)'}).show()
        })       
    }else if(current === 0 && index === $buttons.length-1){
        //从第一张去最后一张
        $slides.css({transform:'translateX(0)'}).one('transitionend',function(){
            $slides.hide()
            $slides.offset()
            $slides.css({transform:`translateX(${-$buttons.length*400}px)`}).show()
        })             
    }else{
        $slides.css({transform:`translateX(${-(index+1)*400}px)`})//不要把px括进去哦
    }
    current = index //！！！不要忘了赋值
}