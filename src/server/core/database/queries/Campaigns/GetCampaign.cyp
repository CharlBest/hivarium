export const data = `
MATCH (user:User)-[:OWNER]->(campaign:Campaign { uId: {uId} })
MATCH (milestone:Milestone)<-[:HAS_MILESTONE]-(campaign)-[:HAS_PRODUCT]->(product:Product)
// MATCH (user:User)-[:OWNER]->(campaign)-[:HAS_PRODUCT]->(product:Product)
// MATCH (user:User)-[:OWNER]->(campaign)-[:HAS_MILESTONE]->(milestone:Milestone)
RETURN campaign, 
user, 
collect(DISTINCT product) as products,
collect(DISTINCT milestone) as milestones
`