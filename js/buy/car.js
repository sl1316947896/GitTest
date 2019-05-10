class Car{
    constructor(){
        this.table = document.querySelector("table");
        this.tbody = document.querySelector("tbody");
        this.url = "js/buy/data.json";

        this.load()  //1、请求数据
    }
    load(){
        var that = this;
        ajaxGet(this.url).then(function(res){
            that.res = JSON.parse(res);
            that.cook()
        }) 
    }

    cook(){
        this.goods = JSON.parse(getCookie("goods"))
        var str="";
         for(var i=0; i<this.res.length; i++){
                for(var j=0; j<this.goods.length; j++){
                    if(this.res[i].id == this.goods[j].id){
                        str +=  `<tr index="${this.goods[j].id}">
                                    <td><img src="${this.res[i].src}"/><span>${this.res[j].h}</span></td>
                                    <td>￥${this.res[j].price}</td>
                                    <td><input type="number" min=1 value="${this.goods[j].num}" class="num"></td>
                                    <td>￥${this.res[j].price * this.goods[j].num}</td>
                                    <td><em class="dele">删除</em></td>
                                </tr>`
                    }
                }
        } 
        this.tbody.innerHTML=str;
        this.addEvent()
     }
     addEvent(){
        var that = this;
        this.tbody.addEventListener("input",function(eve){
            var e = eve || window.event;
            var target= e.target || e.srcElement;
            if(target.className == "num"){
                that.num = target.value;
                that.id = target.parentNode.parentNode.getAttribute("index");
                that.changeCookie(function(j){
                    that.goods[j].num = that.num
                })
            }
        })
        this.tbody.addEventListener("click",function(eve){
        var e = eve || window.event;
        var target= e.target || e.srcElement;
        if(target.className == "dele"){
            that.id = target.parentNode.parentNode.getAttribute("index");
            target.parentNode.parentNode.remove();
            that.changeCookie(function(i){
                that.goods.splice(i,1)
            })
        }
        
         })
     }
     changeCookie(callback){
        for(var i=0;i<this.goods.length;i++){
            if(this.goods[i].id == this.id){
                callback(i)
                // console.log(i)
            }
        }
        setCookie("goods",JSON.stringify(this.goods))
     }
    }

new Car()