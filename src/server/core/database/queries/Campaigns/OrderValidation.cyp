export const data = `
//User
OPTIONAL MATCH (user:User { id: {userId} })
//Product
OPTIONAL MATCH (product:Product { uId: {productUId} })
//Referral
OPTIONAL MATCH (refLink:RefLink { uId: {referralCode} })
OPTIONAL MATCH (refUser:User)-[:REF_LINK]->(refLink)<-[:REF_LINK]-(:Campaign)-[:HAS_PRODUCT]->(product)
WHERE refUser.id <> user.id
//Has Shipping address
OPTIONAL MATCH (user)-[:SHIPPING_ADDRESS]->(shippingAddress:ShippingAddress { uId: {shippingAddressUId} })-[:HAS_COUNTRY]->(userShippingCountry:ShippingCountry)

//Product Shipping info
OPTIONAL MATCH (product)-[shipping:HAS_SHIPPING]->(shippingCountry:ShippingCountry)

RETURN CASE WHEN user IS NOT NULL THEN true ELSE false END as userExists,
CASE WHEN product IS NOT NULL THEN true ELSE false END as productExists,
CASE WHEN user.hiveCoins >= {hiveCoins} THEN true ELSE false END as userHasEnoughHiveCoins,
CASE WHEN product.quantity >= {quantity} THEN true ELSE false END as productHasEnoughQuantity,
CASE WHEN refUser IS NOT NULL THEN true ELSE false END as validReferral,
CASE WHEN shippingAddress IS NOT NULL THEN true ELSE false END as userHasShippingAddress,
userShippingCountry.id as userShippingCountryId,
product,
collect(DISTINCT { productUId: product.uId, shipping: shipping, shippingCountry: shippingCountry }) as shipping
`