export default function objectToUrl(object){
    let url = '';
    Object.keys(object).forEach((key,i) => {
        url += (i===0?'?':'&') + key + '=' + object[key];
    });
    return url;
}