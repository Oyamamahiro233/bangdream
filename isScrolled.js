const header =  document.querySelector('.heanderContainer')
function throttle(fn,delay){
    let timer;
    console.log('throttle');
    return function(){
        let _this
        let args = arguments
        if(timer){
            return
        }
        timer = setTimeout(()=>{
            fn.apply(_this,args)
            timer = null
        },delay)
    }
}
function handleSCroll(){
    let scrollTop = document.documentElement.scrollTop
    if(scrollTop > 0){
        header.classList.add('is-scrolled')
    }else{
        header.classList.remove('is-scrolled')
    }
    
}

document.addEventListener('scroll',throttle(handleSCroll,300))