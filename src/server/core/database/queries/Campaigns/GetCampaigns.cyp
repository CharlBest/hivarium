export const data = `
MATCH (campaign:Campaign)
MATCH (user:User)-[:OWNER]->(campaign)-[:HAS_PRODUCT]->(product:Product)
RETURN campaign, 
user, 
collect(product) as products
LIMIT 10
`