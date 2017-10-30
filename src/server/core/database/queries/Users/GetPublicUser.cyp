export const data = `
MATCH (user:User { id: {userId} })
OPTIONAL MATCH (user)-[:OWNER]->(campaigns:Campaign)
OPTIONAL MATCH (user)-[:OWNER]->(products:Product)

RETURN user, 
collect(DISTINCT campaigns) as campaigns,
collect(DISTINCT products) as products
`