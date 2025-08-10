export const secretsNames = {
    authToken: "authToken",
    refreshToken: "refreshToken",
    userInfo: "userInfo",
    cacheLastSyncs: "cacheLastSyncs"
}

export const cacheTtls = {
    //wods: 1000 * 60 * 60 * 24 * 7, //1 days
    wods: 30000, // 30 sec
    //units:  1000 * 60 * 60 * 24 * 1 //1 day
    units: 15000, // 15 sec
    //advices: 1000 * 60 * 60 * 24 * 7, // 7days
    advices: 15000, // 15 sec
    //faqs: 1000 * 60 * 60 * 24 * 7 // 7days
    faqs: 15000, // 15 sec,
    //businesses: 1000 * 60 * 60 * 24 * 1 // 1days
    businesses: 15000, // 15 sec,
}