export const data = `
MATCH (campaign:Campaign)
MATCH (user:User)-[:OWNER]->(campaign)-[:HAS_PRODUCT]->(product:Product)
MATCH (user:User)-[:OWNER]->(campaign)-[:HAS_MILESTONE]->(milestone:Milestone)
RETURN campaign, 
user, 
collect(product) as products,
collect(milestone) as milestones
LIMIT 10
`