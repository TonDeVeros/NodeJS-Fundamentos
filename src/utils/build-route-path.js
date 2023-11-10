export function BuildRoutePath(path){

    //g significa que é uma regex global
    const routeParametersRegex = /:([a-zA-Z]+)/g;

    const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)');


    const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`);

    // const test = /\/users\/([a-z0-9\-_]+)/
    // console.log(Array.from(path.matchAll(routeParametersRegex)))

     return pathRegex;
}