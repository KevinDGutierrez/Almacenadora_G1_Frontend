export async function loadToken() {
    try {
      const res = await fetch('http://127.0.0.1:3000/AlmacenadoraG1/vlm/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'kevin161@gmail.com',
          password: '12345678'
        })
      });
  
      const data = await res.json();
      if (!data.userDetails || !data.userDetails.token) {
        console.warn("Token no recibido:", data);
        return;
      }
  
      const token = data.userDetails.token;
      localStorage.setItem("user", JSON.stringify({
        email: data.userDetails.email || "admin",
        token
      }));
  
      console.log("✅ Token guardado automáticamente");
    } catch (err) {
      console.error("❌ Error al obtener token:", err);
    }
  }
  