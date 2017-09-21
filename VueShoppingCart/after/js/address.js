new Vue({
    el:'.container',
    data:{
        addressList:[],
        limitNum:3,
        curentIndex:0,
        selectDefaultProduct:'',
        delFalg:false,  //遮罩和删除弹框是显示
        delFalgIndex:0,  //点击删除按钮时标记当前选中产品的 index
        shippingMethod:1 //配送方式【标准配送和高级配送】
    },
    mounted:function () {
        this.$nextTick(function () {
            this.getAddress();
        })
    },
    computed:{
      filterAddress:function(){
          return this.addressList.slice(0,this.limitNum);
      }
    },
    methods:{
        getAddress:function () {
            let  _this = this;
            this.$http.get("data/address.json").then(function (response) {
                var res = response.data;
                if (res.status == 0) {
                    _this.addressList = res.result;
                }
            })
        },
        getMoreAddress:function () {
            if  (this.limitNum == this.addressList.length) {
                this.limitNum = 3;
            }else {
                this.limitNum = this.addressList.length;
            }
        },
        //设置为默认地址
        setDefaultAddress:function (item) {
            this.selectDefaultProduct = item;
            this.addressList.forEach(function (address,index) {
                if (address == item) {
                    address.isDefault = true;
                }else {
                    address.isDefault = false;
                }
            })
        },
        //删除按钮
        delFalgMethod:function (item,indexNum) {
            this.delFalgIndex = indexNum;
            this.delFalg = true;
        },
        //提示框里面的 删除YES按钮方法
        deleteAddress:function () {
            let  _this = this;
            this.addressList.forEach(function (address , index) {
                if (index == _this.delFalgIndex) { //遍历的下标和删除按钮标记的 下标一样。是当前产品

                    if (address.addressId == _this.selectDefaultProduct.addressId) { //如果删除的是默认地址产品将把第一个产品地址设置为默认地址
                        _this.addressList[0].isDefault = true;
                    };
                    _this.addressList.splice(index, 1);
                    _this.delFalg = false;
                }
            });
        }
    }



})