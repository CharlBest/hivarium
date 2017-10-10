export const data = `
MATCH (user:User)-[:OWNER]->(campaign:Campaign)
MATCH (milestone:Milestone)<-[:HAS_MILESTONE]-(campaign)-[:HAS_PRODUCT]->(product:Product)
RETURN campaign, 
user, 
collect(DISTINCT product) as products,
collect(DISTINCT milestone) as milestones

ORDER BY campaign.dateCreated DESC
SKIP {skip}
LIMIT 10
`