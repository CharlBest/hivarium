export const data = `
MATCH (user:User)-[:OWNER]->(campaign:Campaign { uId: {uId} })
MATCH (milestone:Milestone)<-[:HAS_MILESTONE]-(campaign)-[:HAS_PRODUCT]->(product:Product)
// MATCH (user:User)-[:OWNER]->(campaign)-[:HAS_PRODUCT]->(product:Product)
// MATCH (user:User)-[:OWNER]->(campaign)-[:HAS_MILESTONE]->(milestone:Milestone)
OPTIONAL MATCH (refUser:User)-[:REF_LINK]->(refLink:RefLink { uId: {refCode} })<-[:REF_LINK]-(campaign)

RETURN campaign, 
user,
refUser.username as refUser,
collect(DISTINCT product) as products,
collect(DISTINCT milestone) as milestones
`