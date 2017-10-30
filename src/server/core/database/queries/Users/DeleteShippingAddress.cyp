export const data = `
MATCH (user:User { id: {userId} })-[:SHIPPING_ADDRESS]->(shippingAddress:ShippingAddress { uId: {uId} })
DETACH DELETE shippingAddress
`