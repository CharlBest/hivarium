export const data = `
MATCH (user:User { id: {userId} })
OPTIONAL MATCH (user)-[:SHIPPING_ADDRESS]->(shippingAddress:ShippingAddress)
RETURN user,
collect(shippingAddress) as shippingAddress
`