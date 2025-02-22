exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "https://food-cafe-homeoffoods.netlify.app", // Allow frontend
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    },
    body: JSON.stringify({ message: "CORS enabled!" })
  };
};
