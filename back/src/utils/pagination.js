const getPagination = (req) => {
    let {page, limit} = req.query

    if(!page || page < 1){
        page = 1
    }
    if(!limit || limit > 40){
        limit = 20
    }

    const offset = page * limit - limit

    return {page, limit, offset}
}

module.exports = {getPagination}