export const data = `
MATCH (campaign:Campaign { uId: {uId} })
MATCH (user:User)-[:OWNER]->(campaign)-[:HAS_PRODUCT]->(product:Product)
MATCH (user:User)-[:OWNER]->(campaign)-[:HAS_MILESTONE]->(milestone:Milestone)
RETURN campaign, 
user, 
collect(product) as products,
collect(milestone) as milestones
`