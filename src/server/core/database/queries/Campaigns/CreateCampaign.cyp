export const data = `
CREATE (campaign:Campaign { uId: {uId}, title: {title}, description: {description}, daysDuration: {daysDuration}, dateCreated: timestamp(), fullDescription: {fullDescription}, views: 0, media: {media}, referralPercentage: {referralPercentage}, milestones: {milestones} })

WITH campaign
MATCH (user:User { id: {userId} })
CREATE (user)-[:OWNER]->(campaign)

FOREACH (product IN {products} |
    CREATE (newProduct:Product { uId: product.uId, title: product.title, description: product.description, cost: product.cost, quantity: product.quantity, media: product.media })
    MERGE (campaign)-[:HAS_PRODUCT]->(newProduct)
)

RETURN campaign
`