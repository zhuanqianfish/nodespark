
let commonFunction = {
    // 组合数组去重
    mergeArray : function(arr1, arr2){
        var _arr = new Array();
        for(var i=0;i<arr1.length;i++){
        _arr.push(arr1[i]);
        }
        for(var i=0;i<arr2.length;i++){
            var flag = true;
            for(var j=0;j<arr1.length;j++){
                if(arr2[i]==arr1[j]){
                    flag=false;
                    break;
                }
            }
            if(flag){
                _arr.push(arr2[i]);
            }
        }
        return _arr;
    },

    //检查输入名称，仅允许A-Z a-Z _ 0-9
    checkStrName : function(input){
        var rex = /^\w+$/;
        return rex.test(input);
    }
};

module.exports = commonFunction;