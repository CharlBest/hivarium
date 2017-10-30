export const data = `
MATCH (user:User { id: {userId} })
CREATE (user)-[:SHIPPING_ADDRESS]->(shippingAddress:ShippingAddress { uId: {uId}, dateCreated: timestamp(), recipientName: {recipientName}, contactNumber: {contactNumber}, streetAddress: {streetAddress}, addressLine2: {addressLine2}, city: {city}, postalCode: {postalCode} })
MERGE (shippingCountry:ShippingCountry { id: {country}.id })
MERGE (shippingAddress)-[:HAS_COUNTRY]->(shippingCountry)
RETURN shippingAddress
`