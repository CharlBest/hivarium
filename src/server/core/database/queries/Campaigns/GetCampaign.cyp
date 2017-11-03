export const data = `
MATCH (user:User)-[:OWNER]->(campaign:Campaign { uId: {uId} })
MATCH (milestone:Milestone)<-[:HAS_MILESTONE]-(campaign)-[:HAS_PRODUCT]->(product:Product)
// MATCH (user:User)-[:OWNER]->(campaign)-[:HAS_PRODUCT]->(product:Product)
// MATCH (user:User)-[:OWNER]->(campaign)-[:HAS_MILESTONE]->(milestone:Milestone)
OPTIONAL MATCH (refUser:User)-[:REF_LINK]->(refLink:RefLink { uId: {refCode} })<-[:REF_LINK]-(campaign)

//Shipping
OPTIONAL MATCH (product)-[shipping:HAS_SHIPPING]->(shippingCountry:ShippingCountry)

RETURN campaign, 
user,
refUser.username as refUser,
collect(DISTINCT milestone) as milestones,
collect(DISTINCT product) as products,
collect(DISTINCT { productUId: product.uId, shipping: shipping, shippingCountry: shippingCountry }) as shipping
`