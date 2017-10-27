export const data = `
MATCH (user:User { id: {userId} })
MATCH (campaign:Campaign { uId: {uId} })
OPTIONAL MATCH (user)-[:REF_LINK]->(refLink:RefLink)<-[:REF_LINK]-(campaign)

FOREACH (o IN CASE WHEN refLink IS NULL THEN [1] ELSE [] END |
    MERGE (user)-[:REF_LINK]->(:RefLink { uId: {refLinkUId}, dateCreated: timestamp() })<-[:REF_LINK]-(campaign)
)

RETURN CASE WHEN refLink IS NULL THEN null ELSE refLink.uId END as refLink
`