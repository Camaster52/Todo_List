const SendFeedback = async ({ problem , name }) => {
    const apiUrl = process.env.REACT_APP_API_URL
    try{
        const response = await fetch(`${apiUrl}/api/feedback` , {
            method: "POST",
            headers: {'Content-Type': 'application/json' , 'Accept': 'application/json'},
            body: JSON.stringify({problem: problem , name: name})
        })

        const result = await response.json()

        if (!response.ok) {
            throw new Error(result.message || "Server error")
        }

        console.log("Success feedback:", result)
        return result
    }catch(error){
        console.error("Error: ", error.message)
        throw error
    }
}
export default SendFeedback