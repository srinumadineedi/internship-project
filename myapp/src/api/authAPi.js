const API_URL = "http://localhost:5000/api/auth"; // ✅ Ensure this matches your backend

export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${API_URL}/login`, { // ✅ Ensure the correct endpoint
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Invalid credentials");
        }

        return await response.json(); // ✅ Get the token and user data
    } catch (error) {
        console.error("❌ Login error:", error);
        return null;
    }
};
