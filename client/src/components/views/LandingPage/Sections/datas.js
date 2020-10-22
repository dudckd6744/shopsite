const ProductLists= [
    {
        "_id":1,
        "name":"car"
    },
    {
        "_id":2,
        "name":"Animals"
    },
    {
        "_id":3,
        "name": "People"
    },
    {
        "_id":4,
        "name": "Products"
    }
]

const Price= [
    {
        "_id":0,
        "name":"Any",
        "array":[]
    },
    {
        "_id":1,
        "name":"$0 to $199",
        "array":[0, 199]
    },
    {
        "_id":2,
        "name":"$200 to $259",
        "array":[200, 259]
    },
    {
        "_id":3,
        "name":"$260 to $299",
        "array":[260, 299]
    },
    {
        "_id":4,
        "name":"$300 to $349",
        "array":[300, 349]
    },
    {
        "_id":5,
        "name":"More than $350",
        "array":[350, 199999]
    }
]

export {ProductLists,
        Price}