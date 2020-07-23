// 组合数组去重
let  mergeArray = function(arr1, arr2){
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
}

exports.mergeArray = mergeArray;