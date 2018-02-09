let $buttons = $('#buttonWrapper>button')
let $slides = $('#slides')
let current = 0
let $images = $slides.children('img')

makefakeSlides()
$slides.css({transform:'translateX(-400px)'})//真的第一张位置在-400px处
bindEvents()




function makefakeSlides(){
    let $firstCopy = $images.eq(0).clone(true)//true就克隆它全家，false就克隆它自己
    let $lastCopy = $images.eq($images.length-1).clone(true)   
    $slides.append($firstCopy)
    $slides.prepend($lastCopy)
}

function bindEvents(){
    $buttons.eq(0).on('click',function(){
        if(current == 3){
            console.log('这是从最后一张到第一张')
            $slides.css({transform:'translateX(-2000px)'}).one('transitionend', function(){//！！！注意transition添加在谁身上
                $slides.hide()
                $slides.offset() // .offset() 可以触发 re-layout，这是一个高级技术，删掉这行就会发现 bug，所以只能加上这一行
                // 自己注释掉上面一行看最后一张到第一张的动画，就知道为什么要加 offset() 了
                $slides.css({transform:'translateX(-400px)'}).show()
            })       
        }else{
            $slides.css({transform:'translateX(-400px)'})
        }
        current = 0
    })
    $buttons.eq(1).on('click',function(){
        console.log(current)    
        $slides.css({transform:'translateX(-800px)'})
        current = 1
    })
    $buttons.eq(2).on('click',function(){
        console.log(current)    
        $slides.css({transform:'translateX(-1200px)'})
        current = 2
    })
    $buttons.eq(3).on('click',function(){
        if(current == 0){
            console.log('这是从第一张到最后一张')
            $slides.css({transform:'translateX(0)'}).one('transitionend',function(){
                $slides.hide()
                $slides.offset()
                $slides.css({transform:'translateX(-1600px)'}).show()
            })       
        }else{
            $slides.css({transform:'translateX(-1600px)'})
        }
        current = 3
    })
}
