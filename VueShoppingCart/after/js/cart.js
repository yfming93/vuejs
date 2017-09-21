var we = new Vue ({
    el:"#app",
    data:{
        productList:[],
        totalMoney:0,
        checkedAll:false,
        totalPrice:0,
        delFalg:false,
        curentProduct:'',
        address:'return true'
    },
    // filters:{
    //     formatMoney:function (value) {
    //         return "￥ "+value.toFixed(2);
    //     }
    // },
    mounted:function () {
        this.$nextTick(function () {
            this.checkCart();
        });
    },
    methods:{
        checkCart:function () {
            let _this = this;
            this.$http.get("data/cartData.json",{"id":123}).then(function (res) {

                _this.productList = res.data.result.list;
                // _this.totalMoney = res.data.resut.totalMoney;
            })

        },
        changeMoney:function (product,type) {
            if (type > 0 ) {
                product.productQuantity++;
            }else  {
                product.productQuantity--;
                if (product.productQuantity < 1) {
                    product.productQuantity = 1;
                    alert("亲~~，商品数量必须大于0哦！！");
                }
            }
            this.totalPrice = 0;
            this.calcTotalPrice(); //计算总金额
        },
        selectProduct:function (item) {
            if (typeof  item.checked == "undefined") {
                Vue.set(item,"checked",true)
            }else {
                item.checked=  !item.checked;
            }
            this.calcTotalPrice(); //计算总金额
        },
        //商品的全选
        checkAll:function (type) {
            this.checkedAll = type;
            let _this = this;
            this.productList.forEach(function (item, index) {
                if (typeof  item.checked == "undefined") {
                    Vue.set(item,"checked",type)
                }else {
                    item.checked= type;
                }
            });
            this.calcTotalPrice(); //计算总金额r
        },
        //计算总金额
        calcTotalPrice:function () {
            let  _this=  this;
            this.totalPrice = 0;
            this.productList.forEach(function (item, index) {
                if (item.checked) {
                    _this.totalPrice += item.productPrice * item.productQuantity;
                }
            })
        },
        deleteComfim:function (item) {
            this.delFalg = true;
            this.curentProduct = item;
        },
        deleteProduct:function () {
            var  index = this.productList.indexOf(this.curentProduct);
            this.productList.splice(index,1);
            this.delFalg = false;
            this.calcTotalPrice(); //计算总金额r

        },
        goPay:function () {
            if (this.totalPrice <= 0) {
                // alert("亲~~，你还木有选择商品不能结账！！");
                this.address = 'return false';
            }
        }

    }

});
Vue.filter("formatMoney",function (value, type) {
    return "￥ "+value.toFixed(2) + type;
})