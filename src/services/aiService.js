// Secure AI Service - Calls backend API (API key stays on server)
export async function sendMessageToAI(message) {
  try {
    const res = await fetch("http://localhost:3001/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
      return { success: false, error: errorData.error || `HTTP ${res.status} error` };
    }

    return await res.json();
  } catch (err) {
    console.error('Error calling backend API:', err);
    return { 
      success: false, 
      error: err.message || 'Unable to connect to backend server. Make sure the server is running on port 3001.' 
    };
  }
}
