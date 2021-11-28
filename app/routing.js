let parseRoute;
export default parseRoute = (route) => {
    console.log("route is", route)
    return decodeURIComponent(route).split(",")
}
