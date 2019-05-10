
// 获取非行内样式
function getStyle(ele,attr){
    if(ele.currentStyle){
        return ele.currentStyle[attr];
    }else{
        return getComputedStyle(ele,false)[attr];
    }
}


// 阻止事件冒泡
function stopBubble(e){
    if(e.stopPropagation){
        e.stopPropagation()
    }else{
        e.cancelBubble = true;
    }
}

// 阻止默认行为
function stopDefault(e){
    if(e.preventDefault){
        e.preventDefault()
    }else{
        e.returnValue = false;
    }
}

// 绑定事件
function addEvent(ele,type,callback){
    if(ele.addEventListener){
        ele.addEventListener(type,callback,false)
    }else if(ele.attachEvent){
        ele.attachEvent("on"+type,callback)
    }else{
        ele["on"+type] = callback;
    }
}

// 删除事件
function removeEvent(ele,type,callback){
    if(ele.removeEventListener){
        ele.removeEventListener(type,callback,false)
    }else if(ele.detachEvent){
        ele.detachEvent("on"+type,callback)
    }else{
        ele["on"+type] = null;
    }
}

