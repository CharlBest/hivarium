export const data = `
MATCH (user:User { id: {userId} })
CREATE (payment:Payment { token: {token}, amount: {amount}, dateCreated: timestamp() })
MERGE (user)-[rel:PAYED]->(payment)
`