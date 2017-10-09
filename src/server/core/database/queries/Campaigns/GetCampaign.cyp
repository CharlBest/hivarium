export const data = `
MATCH (campaign:Campaign { uId: {uId} })
MATCH (user:User)-[:OWNER]->(campaign)-[:HAS_PRODUCT]->(product:Product)
RETURN campaign, 
user, 
collect(product) as products
`