export const data = `
MATCH (user:User { id: {userId} })
MATCH (campaign:Campaign)-[:HAS_PRODUCT]->(product:Product { uId: {productUId} })
MATCH (user)-[:SHIPPING_ADDRESS]->(shippingAddress:ShippingAddress { uId: {shippingAddressUId} })

//Create order
CREATE (order:Order { uId: {orderUId}, token: {token}, quantity: {quantity}, hiveCoins: {hiveCoins}, referralCode: {referralCode}, dateCreated: timestamp() })
MERGE (user)-[:HAS_ORDER]->(order)
MERGE (order)-[:HAS_SALE]->(product)
MERGE (order)-[:HAS_SHIPPING_ADDRESS]->(shippingAddress)

//Set total value of sales for campaign
//SET campaign.totalValueOfSales = totalValueOfSales + product.cost

//Remove HiveCoins from buying user
SET user.hiveCoins = user.hiveCoins - {hiveCoins}

//Add milestone reward
//OPTIONAL MATCH (campaign)-[:HAS_MILESTONE]->(milestone:Milestone)
//WHERE (campaign.totalValueOfSales - product.cost) <= milestone.unlockAtValueOfSales AND campaign.totalValueOfSales >= milestone.unlockAtValueOfSales

//MATCH (campaign)-[:HAS_PRODUCT]->(productOrder:Product)<-[:HAS_SALE]-(:Order)<-[:HAS_ORDER]-(userOrder:User)

SET user.hiveCoins = user.hiveCoins + (product.cost * 10 / 100)
// FOREACH (o IN CASE WHEN milestone IS NOT NULL THEN [1] ELSE [] END |
// )

WITH campaign, product, user, order

//Add referral reward
OPTIONAL MATCH (refLink:RefLink { uId: {referralCode} })
OPTIONAL MATCH (refUser:User)-[:REF_LINK]->(refLink)<-[:REF_LINK]-(campaign)
WHERE refUser.id <> user.id

FOREACH (o IN CASE WHEN refUser IS NOT NULL AND refLink IS NOT NULL THEN [1] ELSE [] END |
    MERGE (order)-[:HAS_REFERRAL]->(refLink)

    SET user.hiveCoins = user.hiveCoins + (product.cost * {quantity} * campaign.referralPercentage / 2 / 100)
    SET refUser.hiveCoins = refUser.hiveCoins + (product.cost * {quantity} * campaign.referralPercentage / 2 / 100)
)

//Decrease quantity of product available
SET product.quantity = product.quantity - 1

//Increase sold count on product
SET product.sold = product.sold + 1

RETURN order
`