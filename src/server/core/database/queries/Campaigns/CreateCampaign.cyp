export const data = `
CREATE (campaign:Campaign { uId: {uId}, title: {title}, description: {description}, daysDuration: {daysDuration}, dateCreated: timestamp(), fullDescription: {fullDescription}, views: 0, media: {media}, referralPercentage: {referralPercentage} })

WITH campaign
MATCH (user:User { id: {userId} })
CREATE (user)-[:OWNER]->(campaign)

FOREACH (milestone IN {milestones} |
    CREATE (newMilestone:Milestone { unlockAtValueOfSales: milestone.unlockAtValueOfSales, percentageDiscount: milestone.percentageDiscount })
    MERGE (campaign)-[:HAS_MILESTONE]->(newMilestone)
)

FOREACH (product IN {products} |
    CREATE (newProduct:Product { uId: product.uId, title: product.title, description: product.description, cost: product.cost, quantity: product.quantity, sold: 0, media: product.media })
    MERGE (campaign)-[:HAS_PRODUCT]->(newProduct)

    //Ships anywhere in the world
    FOREACH (o IN CASE WHEN product.shippingDetails = 3 THEN [1] ELSE [] END |
        MERGE (shipping:ShippingCountry { id: 0 })
        MERGE (newProduct)-[:HAS_SHIPPING]->(shipping)
    )

    //Only ships to certain countries
    FOREACH (shippingCountry IN product.shippingCountries |
        MERGE (shipping:ShippingCountry { id: shippingCountry.id })
        MERGE (newProduct)-[:HAS_SHIPPING { singleAmount: shippingCountry.singleAmount, extraAmount: shippingCountry.extraAmount }]->(shipping)
    )
)

RETURN campaign
`