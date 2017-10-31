export const data = `
MATCH (user:User { id: {userId} })
OPTIONAL MATCH (user)-[:SHIPPING_ADDRESS]->(shippingAddress:ShippingAddress)
OPTIONAL MATCH (shippingAddress)-[:HAS_COUNTRY]->(shippingCountry:ShippingCountry)
RETURN user,
collect(DISTINCT shippingAddress) as shippingAddress,
collect(DISTINCT shippingCountry) as shippingCountry
`